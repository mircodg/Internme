<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Universita;
use App\Models\IndirizziUniversita; 

class UniversitaController extends Controller
{
    function addUniversita(Request $req){
        $universita = new Universita();
        $indirizzoUni = new IndirizziUniversita();
        $response = $universita->insertUniversita($req->NomeUniversita, $req->cookie('jwt'));
        $newUni = $response->getData(true);
        return $indirizzoUni->insertUniAddress($req->Via, $req->NumeroCivico, $req->CAP, $req->Citta, $req->Provincia, $newUni['university']['idUniversita']);
    }

    function getUni(Request $req){
        $universita = new Universita();
        return $universita->getUniFromToken($req->cookie('jwt'));
    }

    function getStudentsCount(Request $req){
        $universita = new Universita();
        return $universita->studentsCount($req->cookie('jwt'));
    }
}
