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

    public function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }

    public function addSede($idAzienda, $Via, $NumeroCivico, $CAP, $Citta, $Provincia){
        try{
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
                'message' => 'Company office location added successfully'
            ], Response::HTTP_OK); 
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error while adding company office location',
                'error' => $e->getMessage(), 
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }
}
