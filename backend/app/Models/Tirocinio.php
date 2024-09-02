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
}
