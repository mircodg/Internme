<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO; 
use PDOException; 
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class IndirizziUniversita extends Model
{
    use HasFactory;

    protected $table = 'IndirizziUni';
    protected $pdo; 

    public function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }
    
    public function insertUniAddress($Via, $NumeroCivico, $CAP, $Citta, $Provincia, $idUniversità){
        try{
            $sql = "INSERT INTO IndirizziUni (Via, NumeroCivico, CAP, Citta, Provincia, idUniversita) VALUES (:Via, :NumeroCivico, :CAP, :Citta, :Provincia, :idUniversita)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Via' => $Via,
                'NumeroCivico' => $NumeroCivico,
                'CAP' => $CAP,
                'Citta' => $Citta,
                'Provincia' => $Provincia,
                'idUniversita' => $idUniversità
            ]);
            return response()->json([
                'message' => 'University address created successfully'
            ], Response::HTTP_OK); 
        } catch (PDOException $e){
            return response()->json([
                'message' => 'Error while creating university address', 
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
