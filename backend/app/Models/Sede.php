<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDOException;
use PDO;
use Symfony\Component\HttpFoundation\Response;

class Sede extends Model
{
    use HasFactory;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function addSede($idAzienda, $Via, $NumeroCivico, $CAP, $Citta, $Provincia)
    {
        try {
            $sql = "INSERT INTO Sedi (Via, NumeroCivico, CAP, Citta, Provincia, idAzienda) VALUES (:Via, :NumeroCivico, :CAP, :Citta, :Provincia, :idAzienda)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Via' => $Via,
                'NumeroCivico' => $NumeroCivico,
                'CAP' => $CAP,
                'Citta' => $Citta,
                'Provincia' => $Provincia,
                'idAzienda' => $idAzienda
            ]);
            return response()->json([
                'message' => 'Company site added successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while adding company office location, check if this site already exists',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeSede($idAzienda, $Via, $NumeroCivico, $CAP, $Citta, $Provincia)
    {
        try {
            $sql = "DELETE FROM Sedi WHERE idAzienda=:idAzienda AND Via=:Via AND NumeroCivico=:NumeroCivico AND CAP=:CAP AND Citta=:Citta AND Provincia=:Provincia";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda,
                'Via' => $Via,
                'NumeroCivico' => $NumeroCivico,
                'CAP' => $CAP,
                'Citta' => $Citta,
                'Provincia' => $Provincia
            ]);
            return response()->json([
                'message' => 'Site deleted successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while removing site',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function editSede($idAzienda, $Via, $NumeroCivico, $CAP, $Citta, $Provincia, $OldVia, $OldNumeroCivico, $OldCAP, $OldCitta, $OldProvincia)
    {
        try {
            $sql = "UPDATE Sedi SET Via=:Via, NumeroCivico=:NumeroCivico, CAP=:CAP, Citta=:Citta, Provincia=:Provincia WHERE idAzienda=:idAzienda AND Via=:OldVia AND NumeroCivico=:OldNumeroCivico AND CAP=:OldCAP AND Citta=:OldCitta AND Provincia=:OldProvincia";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idAzienda' => $idAzienda,
                'Via' => $Via,
                'NumeroCivico' => $NumeroCivico,
                'CAP' => $CAP,
                'Citta' => $Citta,
                'Provincia' => $Provincia,
                'OldVia' => $OldVia,
                'OldNumeroCivico' => $OldNumeroCivico,
                'OldCAP' => $OldCAP,
                'OldCitta' => $OldCitta,
                'OldProvincia' => $OldProvincia
            ]);
            return response()->json([
                'message' => 'Site edited successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while editing site',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
