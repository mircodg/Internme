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
            $sql = "SELECT * FROM Convenzioni WHERE idUniversita = :idUniversita";
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
    
}
