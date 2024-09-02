<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;
use PDOException;
use PDO;
use Illuminate\Support\Facades\DB;


class Convenzione extends Model
{
    use HasFactory;

    protected $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function showCompanyConventions($idAzienda)
    {
        try {
            $sql = "SELECT * FROM Convenzioni WHERE idAzienda = :idAzienda";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['idAzienda' => $idAzienda]);
            if ($stmt->rowCount() == 0) {
                return response()->json([
                    'message' => 'No conventions found for this company'
                ], Response::HTTP_NOT_FOUND);
            }
            $conventions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Conventions fetched successfully',
                'conventions' => $conventions
            ]);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching conventions',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showUniversityConventions($idUniversita)
    {
        try {
            $sql = "SELECT Nome, PartitaIva, Stato FROM Convenzioni JOIN Aziende ON Convenzioni.idAzienda = Aziende.idAzienda WHERE idUniversita = :idUniversita";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['idUniversita' => $idUniversita]);
            if ($stmt->rowCount() == 0) {
                return response()->json([
                    'message' => 'No conventions found for this university'
                ], Response::HTTP_NOT_FOUND);
            }
            $conventions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Conventions fetched successfully',
                'conventions' => $conventions
            ]);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching conventions',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getActiveConventionUniversityNumber($idUniversita)
    {
        try {
            $sql = "SELECT * FROM Convenzioni WHERE idUniversita = :idUniversita AND Stato = 'Active'";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['idUniversita' => $idUniversita]);
            $number = $stmt->rowCount();
            return response()->json([
                'message' => 'Number of conventions fetched successfully',
                'count' => $number
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching conventions',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function acceptConvention($PartitaIva, $idUniversita)
    {
        try {
            $sql = "UPDATE Convenzioni SET Stato = 'Active' WHERE idUniversita = :idUniversita AND idAzienda = (SELECT idAzienda FROM Aziende WHERE PartitaIva = :PartitaIva)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita,
                'PartitaIva' => $PartitaIva,
            ]);
            $currentDate = date('Y-m-d');
            $sql = "UPDATE Convenzioni SET DataStipulazione = :currentDate WHERE idUniversita = :idUniversita AND idAzienda = (SELECT idAzienda FROM Aziende WHERE PartitaIva = :PartitaIva)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita,
                'PartitaIva' => $PartitaIva,
                'currentDate' => $currentDate
            ]);
            return response()->json([
                'message' => 'Convention accepted successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while accepting convention',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function declineConvention($PartitaIva, $idUniversita)
    {
        try {
            $sql = "UPDATE Convenzioni SET Stato = 'Rejected' WHERE idUniversita = :idUniversita AND idAzienda = (SELECT idAzienda FROM Aziende WHERE PartitaIva = :PartitaIva)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUniversita' => $idUniversita,
                'PartitaIva' => $PartitaIva,
            ]);
            return response()->json([
                'message' => 'Convention rejected successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while rejecting convention',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function showCompanyConventionListData($idAzienda)
    {
        try {
            $sql = "SELECT Nome, Stato, DataStipulazione, C.idUniversita, C.idAzienda FROM Convenzioni as C JOIN Universita as U ON C.idUniversita = U.idUniversita WHERE C.idAzienda = :idAzienda";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['idAzienda' => $idAzienda]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'No conventions found for this company'
                ], Response::HTTP_NOT_FOUND);
            }
            $conventions = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            # i want to set state = 'Expired' if the convention is older than 1 year
            $currentDate = date('Y-m-d');
            foreach ($conventions as $convention) {
                $date = $convention['DataStipulazione'];
                $date = strtotime($date);
                $now = strtotime($currentDate);
                $diff = $now - $date;
                $days = $diff / (60 * 60 * 24);
                if ($days > 365) {
                    $sql2 = "UPDATE Convenzioni SET Stato = 'Expired', DataStipulazione=NULL WHERE idAzienda = :idAzienda AND idUniversita = :idUniversita AND DataStipulazione = :date";
                    $stmnt2 = $this->pdo->prepare($sql2);
                    $stmnt2->execute([
                        'idAzienda' => $convention['idAzienda'],
                        'idUniversita' => $convention['idUniversita'],
                        'date' => $convention['DataStipulazione']
                    ]);
                }
            }
            $stmnt->execute(['idAzienda' => $idAzienda]);
            $updatedConventions = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Conventions fetched successfully',
                'conventions' => $updatedConventions
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching conventions',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function renewConvention($nomeUniversita, $idAzienda)
    {
        try {
            $sql = "UPDATE Convenzioni SET Stato='Pending' WHERE idAzienda = :idAzienda AND idUniversita = (SELECT idUniversita FROM Universita WHERE Nome = :nomeUniversita)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda,
                'nomeUniversita' => $nomeUniversita
            ]);
            return response()->json([
                'message' => 'Convention renewed successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while renewing convention',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchAvailableUniversities($idAzienda)
    {
        try {
            # i want to fetch universities that don't already have a convention with the company
            $sql = "SELECT Nome, idUniversita FROM Universita WHERE idUniversita NOT IN (SELECT idUniversita FROM Convenzioni WHERE idAzienda = :idAzienda)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['idAzienda' => $idAzienda]);
            $count = $stmnt->rowCount();
            if ($count == 0) {
                return response()->json([
                    'message' => 'Yuo already have a convention with all universities'
                ], Response::HTTP_NOT_FOUND);
            }
            $universities = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            return response()->json([
                'message' => 'Universities fetched successfully',
                'universities' => $universities
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching universities',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createConvention($idAzienda, $nomeUniversita)
    {
        try {
            $sql = "INSERT INTO Convenzioni (idAzienda, idUniversita, Stato) VALUES (:idAzienda, (SELECT idUniversita FROM Universita WHERE Nome = :nomeUniversita), 'Pending')";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda,
                'nomeUniversita' => $nomeUniversita
            ]);
            return response()->json([
                'message' => 'Convention created successfully'
            ], Response::HTTP_CREATED);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating convention',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteConvention($idAzienda, $nomeUniversita)
    {
        try {
            $sql = "DELETE FROM Convenzioni WHERE idAzienda = :idAzienda AND idUniversita = (SELECT idUniversita FROM Universita WHERE Nome = :nomeUniversita)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda,
                'nomeUniversita' => $nomeUniversita
            ]);
            return response()->json([
                'message' => 'Convention deleted successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while deleting convention',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
