<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;


class Feedback extends Model
{
    use HasFactory;
    protected $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function createFeedback($Matricola, $idUniversita, $idTirocinio, $Descrizione, $Stelle)
    {
        # avoid duplicated feedback:
        $duplicate = $this->checkDuplicate($idTirocinio, $idUniversita, $Matricola);
        if ($duplicate->status() !== 200) {
            return $duplicate;
        }

        # create a feedback: 
        try {
            $sql = "INSERT INTO Feedback (Matricola, idUniversita, idTirocinio, Stelle, Descrizione) VALUES (:Matricola, :idUniversita, :idTirocinio, :Stelle, :Descrizione)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idTirocinio' => $idTirocinio,
                'Descrizione' => $Descrizione,
                'Stelle' => $Stelle
            ]);
            return response()->json([
                'message' => 'feedback created successfully'
            ], Response::HTTP_CREATED);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating feedback',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function checkDuplicate($idTirocinio, $idUniversita, $Matricola)
    {
        try {
            $sql = "SELECT idTirocinio FROM Feedback WHERE idTirocinio=:idTirocinio AND idUniversita=:idUniversita AND Matricola = :Matricola";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idTirocinio' => $idTirocinio,
                'idUniversita' => $idUniversita,
                'Matricola' => $Matricola
            ]);
            if ($stmnt->rowCount() > 0) {
                return response()->json([
                    'message' => 'You already left a feedback for this internship'
                ], Response::HTTP_BAD_REQUEST);
            } else {
                return response()->json([
                    'message' => 'You did not left a feedback for this internship'
                ], Response::HTTP_OK);
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching feedback',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchFeedbacks($Matricola, $idUniversita, $idAzienda)
    {

        if ($idAzienda === null) {
            try {

                $sql = "SELECT F.idTirocinio AS idTirocinio, F.Matricola AS Matricola, F.idUniversita AS idUniversita, A.Nome AS NomeAzienda, T.Titolo AS TitoloTirocinio, F.Descrizione, F.Stelle FROM Feedback AS F JOIN Tirocini AS T ON F.idTirocinio=T.idTirocinio JOIN Aziende A ON T.idAzienda=A.idAzienda WHERE F.Matricola=:Matricola AND F.idUniversita=:idUniversita";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'idUniversita' => $idUniversita,
                    'Matricola' => $Matricola
                ]);
                if ($stmnt->rowCount() === 0) {
                    return response()->json([
                        'message' => 'You have not left any feedback yet',
                    ], Response::HTTP_NOT_FOUND);
                }
                $feedbacks = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                return response()->json([
                    'message' => 'feedbacks fetched successfully',
                    'feedbacks' => $feedbacks
                ], Response::HTTP_OK);
            } catch (PDOException $e) {
                return response()->json([
                    'message' => 'Error while fetching feedbacks',
                    'error' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            try {
                # fetch feedbacks for a company
                $sql = "SELECT Tirocini.idTirocinio, AccountStudente.Matricola, Universita.idUniversita, Utenti.Nome as NomeStudente, Utenti.Cognome as CognomeStudente, Universita.Nome AS Universita, Tirocini.Titolo AS TitoloTirocinio, Feedback.Descrizione, Feedback.Stelle FROM Feedback JOIN AccountStudente ON (Feedback.idUniversita=AccountStudente.idUniversita AND Feedback.Matricola=AccountStudente.Matricola) JOIN Utenti ON AccountStudente.idUtente = Utenti.idUtente JOIN Universita ON Feedback.idUniversita=Universita.idUniversita JOIN Tirocini ON Feedback.idTirocinio=Tirocini.idTirocinio WHERE Tirocini.idAzienda=:idAzienda";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'idAzienda' => $idAzienda
                ]);
                if ($stmnt->rowCount() === 0) {
                    return response()->json([
                        'message' => 'No feedbacks found',
                    ], Response::HTTP_NOT_FOUND);
                } else {
                    $feedbacks = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                    return response()->json([
                        'message' => 'feedbacks fetched successfully',
                        'feedbacks' => $feedbacks
                    ], Response::HTTP_OK);
                }
            } catch (PDOException $e) {
                return response()->json([
                    'message' => 'Error while fetching feedbacks',
                    'error' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
}
