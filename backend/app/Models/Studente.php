<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Utente;

class Studente extends Model
{
    use HasFactory;

    protected $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    // MOVE THE LOGIC RELATIVE TO USER MODEL TO THE CONTROLLER AND CALL THE METHOD FROM THE CONTROLLER
    public function checkStudentInfo($token)
    {
        try {
            $user = new Utente();
            $response = $user->getUserByToken($token);
            $data = $response->getData(true);
            $userType = $data['user']['TipoUtente'];
            if ($userType != 'Studente') {
                return response()->json()([
                    'message' => 'You are not authorized to check student info',
                ], Response::HTTP_UNAUTHORIZED);
            } else {
                $userID = $data['user']['idUtente'];
                $sql = "SELECT Matricola FROM Studenti WHERE idUtente = :idUtente";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'idUtente' => $userID,
                ]);
                $count = $stmnt->rowCount();
                if ($count == 0) {
                    return response()->json([
                        'message' => 'Student not found'
                    ], Response::HTTP_NOT_FOUND);
                } else {
                    $student = $stmnt->fetch(PDO::FETCH_ASSOC);
                    return response()->json([
                        'message' => 'Student found',
                        'student' => $student
                    ], Response::HTTP_OK);
                }
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while checking student info',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createStudent($Matricola, $idUniversita, $idUtente, $CV, $CDL)
    {
        try {
            $sql = "INSERT INTO Studenti (Matricola, idUniversita, idUtente, CV, CDL) VALUES (:Matricola, :idUniversita, :idUtente, :CV, :CDL)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt = $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idUtente' => $idUtente,
                'CV' => $CV,
                'CDL' => $CDL
            ]);
            return response()->json([
                'message' => 'Student created successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating student',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function showStudentsByUni($idUniversita)
    {
        try {
            $sql = "SELECT * FROM Studenti WHERE idUniversita = :idUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita
            ]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'No students found'
                ], Response::HTTP_NOT_FOUND);
            } else {
                $students = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                return response()->json([
                    'message' => 'Students retrieved successfully',
                    'students' => $students
                ], Response::HTTP_OK);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting students by university',
                'error' => $e->getMessage()
            ]);
        }
    }
}
