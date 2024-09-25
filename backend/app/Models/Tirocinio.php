<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;


class Tirocinio extends Model
{
    use HasFactory;

    protected $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function createTirocinio($Titolo, $Descrizione, $TipoTirocinio, $TipoSvolgimento, $MaxTirocinanti, $CDL_Richiesto, $Retribuzione, $idAzienda)
    {
        try {
            $sql = "INSERT INTO Tirocini (Titolo, Descrizione, TipoTirocinio, TipoSvolgimento, MaxTirocinanti, CDL_Richiesto, Retribuzione, idAzienda) VALUES (:Titolo, :Descrizione, :TipoTirocinio, :TipoSvolgimento, :MaxTirocinanti, :CDL_Richiesto, :Retribuzione, :idAzienda)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Titolo' => $Titolo,
                'Descrizione' => $Descrizione,
                'TipoTirocinio' => $TipoTirocinio,
                'TipoSvolgimento' => $TipoSvolgimento,
                'MaxTirocinanti' => $MaxTirocinanti,
                'CDL_Richiesto' => $CDL_Richiesto,
                'Retribuzione' => $Retribuzione,
                'idAzienda' => $idAzienda
            ]);
            return response()->json([
                'message' => 'Internship created successfully'
            ], Response::HTTP_CREATED);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating internship',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTirocini($idAzienda)
    {
        try {
            $sql = "SELECT * FROM Tirocini WHERE idAzienda = :idAzienda";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda
            ]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'No internships found'
                ], Response::HTTP_NOT_FOUND);
            }
            $tirocini = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Internships fetched successfully',
                'tirocini' => $tirocini
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching internships',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getActiveInterns($idTirocinio)
    {
        try {

            // # making sure the internship belongs to the company
            // $sql = "SELECT * FROM Tirocini WHERE idTirocinio = :idTirocinio AND idAzienda = :idAzienda";
            // $stmnt = $this->pdo->prepare($sql);
            // $stmnt->execute([
            //     'idTirocinio' => $idTirocinio,
            //     'idAzienda' => $idAzienda
            // ]);
            // if ($stmnt->rowCount() == 0) {
            //     return response()->json([
            //         'message' => 'you are not authorized to fetch active interns for this internship'
            //     ], Response::HTTP_UNAUTHORIZED);
            // }

            # fetching active interns 
            $sql = "SELECT COUNT(*) as count FROM Candidature WHERE idTirocinio=:idTirocinio AND Stato='Active'";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idTirocinio' => $idTirocinio
            ]);
            $count = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Active interns fetched successfully',
                'count' => $count
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching active interns',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function endInternship($idTirocinio, $Matricola, $idUniversita)
    {
        try {
            $sql = "UPDATE Candidature SET Stato='Ended' WHERE idTirocinio = :idTirocinio AND Matricola = :Matricola AND idUniversita=:idUniversita";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idTirocinio' => $idTirocinio,
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
            ]);
            return response()->json([
                'message' => 'Internship ended succesfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while ending Internship',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getFullCompanyInternship($idAzienda)
    {
        try {
            $sql = "SELECT * FROM Tirocini WHERE MaxTirocinanti = (SELECT COUNT(*) FROM Candidature WHERE idTirocinio = Tirocini.idTirocinio AND Stato = 'Active') AND idAzienda = :idAzienda";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda
            ]);
            return response()->json([
                'message' => 'Full internships fetched successfully',
                'internships' => $stmnt->fetchAll(PDO::FETCH_ASSOC)
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching full internships',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getActiveCompanyInternship($idAzienda)
    {
        try {
            $sql = "SELECT * FROM Tirocini WHERE MaxTirocinanti > (SELECT COUNT(*) FROM Candidature WHERE idTirocinio = Tirocini.idTirocinio AND Stato = 'Active') AND idAzienda = :idAzienda";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda
            ]);
            return response()->json([
                'message' => 'Active internships fetched successfully',
                'internships' => $stmnt->fetchAll(PDO::FETCH_ASSOC)
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching active internships',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeInternship($idTirocinio, $idAzienda)
    {
        try {
            $sql = "DELETE FROM Tirocini WHERE idTirocinio = :idTirocinio AND idAzienda = :idAzienda";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idTirocinio' => $idTirocinio,
                'idAzienda' => $idAzienda
            ]);
            return response()->json([
                'message' => 'Internship removed successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while removing internship',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function internshipNotificationEmails($idAzienda){
        try{
            $sql = "SELECT U.Email FROM Utenti U JOIN AccountStudente AST ON U.idUtente = AST.idUtente WHERE AST.idUniversita IN (SELECT Universita.idUniversita FROM Universita JOIN Convenzioni ON Universita.idUniversita=Convenzioni.idUniversita WHERE Convenzioni.idAzienda=:idAzienda AND Stato='Active')"; 
            $stmnt = $this->pdo->prepare($sql); 
            $stmnt->execute([
                'idAzienda' => $idAzienda
            ]);
            $emails = $stmnt->fetchAll(PDO::FETCH_ASSOC); 
            return response()->json([
                'message' => "Emails for internship notification successfully fetched",
                'emails' => $emails
            ], Response::HTTP_OK); 
        }catch(PDOExcpetion $e){
            return response()->json([
                'message' => 'Error while fetching emails', 
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }
}
