<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utente;
class AuthController extends Controller
{
    function register(Request $req){

        $utente = new Utente();

        if($req->TipoUtente == 'Ceo'){
            return $utente->createCEO($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
        }
        else if ($req->TipoUtente === 'Studente'){
            return $utente->createDataStudente($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
        }

        else if ($req->TipoUtente === 'Direttore') {
            return $utente->createDirettore($req->Nome, $req->Cognome, $req->Email, $req->Password, $req->DataNascita);
        }
    }

    public function login (Request $request){
        $utente = new Utente();
        return $utente->Login($request->Email, $request->Password, $request->cookie('jwt'));
    }
    
    public function logout(Request $request){
        $utente = new Utente();
        return $utente->Logout($request);
    }

}
