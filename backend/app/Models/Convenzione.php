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
}
