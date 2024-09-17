<?php

namespace App\Http\Controllers;

use App\Models\Candidatura;
use App\Models\Universita;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{

    function rejectApplication(Request $request)
    {
        $idTirocinio = $request->idTirocinio;
        $Matricola = $request->Matricola;
        $NomeUniversita = $request->NomeUniversita;
        $universita = new Universita();
        $response = $universita->getUniIDByName($NomeUniversita);
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idUniversita = $response->getData()->university->idUniversita;
        $candidatura = new Candidatura();
        return $candidatura->rejectApplication($Matricola, $idUniversita, $idTirocinio);
    }
}
