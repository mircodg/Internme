<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utente;

class UserController extends Controller
{
    function register(Request $req){

        if($req->TipoUtente == 'Ceo'){
            $utente = new Utente();
            $response = $utente->createCEO($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
            if($response == 1){
                return response()->json([
                    'message' => 'Utente creato con successo'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Errore nella creazione dell\'utente'
                ], 500);
            }
        }
        else if ($req->TipoUtente === 'Studente'){
            $utente = new Utente(); 
            $response = $utente->createDataStudente($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
            if ($response == 1){
                return response()->json([
                    'message' => 'Utente creato con successo'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Errore nella creazione dell\'utente' 
                ], 500);
            }
        }

        else if ($req->TipoUtente === 'Direttore') {
            $utente = new Utente(); 
            $response = $utente->createDirettore($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
            if ($response == 1){
                return response()->json([
                    'message' => 'Utente creato con successo: '
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Errore nella creazione dell\'utente: ' 
                ], 500);
            }
        }
    }

    public function getUserByEmail($email){
        $utente = new Utente(); 
        $userFetched = $utente->getUser($email); 
        if ($userFetched){
            return response()->json([
                'message' => 'Utente trovato',
                'user' => $userFetched
            ], 200);
        } else {
            return response()->json([
                'message' => 'Utente non trovato'
            ], 404);
        }
    }
}
