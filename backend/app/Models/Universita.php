<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Utente;


class Universita extends Model
{
    use HasFactory;

    protected $pdo;
    protected $table = 'Università';
    protected $primaryKey = 'idUniversita';

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function insertUniversita($nomeUniversita, $Via, $NumeroCivico, $CAP, $Citta, $Provincia, $token)
    {
        try {
            $user = new Utente();
            $response = $user->getUserByToken($token);
            $data = $response->getData(true);

            if ($data['user']['TipoUtente'] != 'Direttore') {
                return response()->json([
                    'message' => 'You are not a Director'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $userID = $data['user']['idUtente'];

            $sql = "INSERT INTO Universita (Nome, Via, NumeroCivico, CAP, Citta, Provincia, idUtente) VALUES (:nomeUniversita,:Via, :NumeroCivico, :CAP, :Citta, :Provincia, :idUtente)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt = $stmnt->execute([
                'nomeUniversita' => $nomeUniversita,
                'Via' => $Via,
                'NumeroCivico' => $NumeroCivico,
                'CAP' => $CAP,
                'Citta' => $Citta,
                'Provincia' => $Provincia,
                'idUtente' => $userID
            ]);
            $sql = "SELECT * FROM Universita WHERE Nome = :nomeUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'nomeUniversita' => $nomeUniversita
            ]);
            $newUni = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'University created successfully',
                'university' => $newUni
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while creating university',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUniFromToken($token)
    {
        try {
            $user = new Utente();
            $response = $user->getUserByToken($token);
            $data = $response->getData(true);

            if ($data['user']['TipoUtente'] != 'Direttore') {
                return response()->json([
                    'message' => 'You are not a Director'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $userID = $data['user']['idUtente'];

            $sql = "SELECT * FROM Universita WHERE idUtente = :idUtente";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUtente' => $userID
            ]);
            $universita = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'university' => $universita
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while getting university',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    //TODO: Sposta questa funzione in un model Studente
    public function studentsCount($token)
    {
        try {
            $universita = new Universita();
            $response = $universita->getUniFromToken($token);
            $data = $response->getData(true);

            $sql = "SELECT * FROM AccountStudente WHERE idUniversita = :idUniversita";
            $stmnt = $this->pdo->prepare(($sql));
            $stmnt->execute([
                'idUniversita' => $data['university']['idUniversita']
            ]);
            return response()->json([
                'message' => 'Student count retrieved successfully',
                'count' => $stmnt->rowCount()
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while getting student count',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    function showAll()
    {
        try {
            $sql = "SELECT * FROM Universita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute();
            $universita = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'universities' => $universita
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting universities',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    function getUniIDByName($nomeUniversita)
    {
        try {
            $sql = "SELECT * FROM Universita WHERE Nome = :nomeUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'nomeUniversita' => $nomeUniversita
            ]);
            if ($stmnt->rowCount() == 0) {
                return response()->json([
                    'message' => 'University not found'
                ], Response::HTTP_NOT_FOUND);
            } else {
                $universita = $stmnt->fetch(PDO::FETCH_ASSOC);
                return response()->json([
                    'university' => $universita
                ], Response::HTTP_OK);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting university',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
