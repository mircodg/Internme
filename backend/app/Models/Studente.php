<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;
use PDOException;
use Illuminate\Support\Facades\DB;
use App\Models\Utente;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

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
                $sql = "SELECT Matricola, idUniversita FROM AccountStudente WHERE idUtente = :idUtente";
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
            $sql = "INSERT INTO AccountStudente (Matricola, idUniversita, idUtente, CV, CDL) VALUES (:Matricola, :idUniversita, :idUtente, :CV, :CDL)";
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
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showStudentsInfoByUni($idUniversita)
    {
        try {
            $sql = "SELECT Matricola, Nome, Cognome FROM AccountStudente RIGHT JOIN Utenti ON AccountStudente.idUtente = Utenti.idUtente WHERE idUniversita = :idUniversita";
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
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchInternsNumber($idUniversita)
    {
        try {
            $sql = "SELECT * FROM Candidature WHERE idUniversita = :idUniversita AND Stato = 'Active'";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita
            ]);
            $number = $stmnt->rowCount();
            return response()->json([
                'message' => 'Number of interns fetched successfully',
                'count' => $number,
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching interns number',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getInternships($idUniversita, $Matricola)
    {
        try {
            $sql = "SELECT * FROM Tirocini WHERE idAzienda IN (SELECT idAzienda FROM Convenzioni WHERE idUniversita = :idUniversita AND Stato = 'Active') AND idTirocinio NOT IN (SELECT idTirocinio FROM Candidature WHERE idUniversita = :idUniversita2 AND Matricola = :Matricola AND (Stato = 'Active' OR Stato = 'Pending' OR  Stato = 'Ended'))";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita,
                'idUniversita2' => $idUniversita,
                'Matricola' => $Matricola
            ]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'No internships found'
                ], Response::HTTP_NOT_FOUND);
            } else {
                $internships = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                return response()->json([
                    'message' => 'Internships fetched successfully',
                    'internships' => $internships
                ], Response::HTTP_OK);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching internships',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getStudentIDsByToken($token)
    {
        try {
            $idUtente = PersonalAccessToken::findToken($token)->tokenable_id;
            $sql = "SELECT idUniversita, Matricola FROM AccountStudente WHERE idUtente = :idUtente";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUtente' => $idUtente
            ]);
            $student = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Student fetched successfully',
                'student' => $student
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting student ID',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function downloadCV($Matricola, $idUniversita)
    {
        try {
            $sql = "SELECT CV FROM AccountStudente WHERE Matricola = :Matricola AND idUniversita = :idUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita
            ]);
            if ($stmnt->rowCount() === 0) {
                return response()->json([
                    'message' => 'CV not found'
                ], Response::HTTP_NOT_FOUND);
            } else {
                $cv_path = $stmnt->fetch(PDO::FETCH_ASSOC);
                $full_path = storage_path('app/public/' . $cv_path['CV']);
                return response()->download($full_path);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while downloading CV',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function studentEnrollment($Matricola, $idUniversita)
    {
        try {
            $sql = "SELECT * FROM AccountStudente JOIN Universita ON AccountStudente.idUniversita = Universita.idUniversita WHERE Matricola = :Matricola AND AccountStudente.idUniversita = :idUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita
            ]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'Student not found'
                ], Response::HTTP_NOT_FOUND);
            } else {
                $data = $stmnt->fetch(PDO::FETCH_ASSOC);
                return response()->json([
                    'message' => 'Student and enrollment found',
                    'data' => $data
                ], Response::HTTP_OK);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while checking student enrollment',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
