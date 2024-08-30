<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDOException;
use PDO;
use App\Models\Utente;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Sede;

class Azienda extends Model
{
    use HasFactory;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function insertAzienda($token, $nomeAzienda, $settoreLavoro, $PartitaIVA, $Via, $NumeroCivico, $CAP, $Citta, $Provincia)
    {
        try {
            $user = new Utente();
            $response = $user->getUserByToken($token);
            $data = $response->getData(true);
            $userType = $data['user']['TipoUtente'];
            if ($userType != 'Ceo') {
                return response()->json([
                    'message' => 'You are not authorized to create a company'
                ], Response::HTTP_UNAUTHORIZED);
            } else {
                $userID = $data['user']['idUtente'];
                $sql = "INSERT INTO Aziende (Nome, SettoreLavoro, PartitaIva, idUtente) VALUES (:nomeAzienda, :settoreLavoro, :PartitaIVA, :idUtente)";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'nomeAzienda' => $nomeAzienda,
                    'settoreLavoro' => $settoreLavoro,
                    'PartitaIVA' => $PartitaIVA,
                    'idUtente' => $userID
                ]);
                $sql = "SELECT * FROM Aziende WHERE Nome = :nomeAzienda";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'nomeAzienda' => $nomeAzienda
                ]);
                $newCompany = $stmnt->fetch(PDO::FETCH_ASSOC);
                $sede = new Sede();
                $response = $sede->addSede($newCompany['idAzienda'], $Via, $NumeroCivico, $CAP, $Citta, $Provincia);
                $sedeData = $response->getData(true);
                if ($response->getStatusCode() == 200) {
                    return response()->json([
                        'message' => 'Company created successfully',
                        'company' => $newCompany,
                        'office' => $sedeData
                    ], Response::HTTP_OK);
                } else {
                    return $response;
                }
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating company',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAziendaByToken($token)
    {
        try {
            $user = new Utente();
            $response = $user->getUserByToken($token);
            $data = $response->getData(true);
            $userID = $data['user']['idUtente'];
            $sql = "SELECT * FROM Aziende WHERE idUtente = :idUtente";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUtente' => $userID
            ]);
            $count = $stmnt->rowCount();
            $azienda = $stmnt->fetch(PDO::FETCH_ASSOC);
            if ($count == 0) {
                return response()->json([
                    'message' => 'No company found'
                ], Response::HTTP_NOT_FOUND);
            }
            return response()->json([
                'message' => 'Company found',
                'azienda' => $azienda
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting company',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
