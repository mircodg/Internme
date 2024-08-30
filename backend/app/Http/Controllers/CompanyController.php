<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Azienda;
use App\Models\Convenzione;


class CompanyController extends Controller
{

    function addCompany(Request $req)
    {
        $azienda = new Azienda();
        return $azienda->insertAzienda($req->cookie('jwt'), $req->Nome, $req->SettoreLavoro, $req->PartitaIva, $req->Via, $req->NumeroCivico, $req->CAP, $req->Citta, $req->Provincia);
    }

    function getCompanies(Request $req)
    {
        $azienda = new Azienda();
        return $azienda->getAziendaByToken($req->cookie('jwt'));
    }

    function getConventionsFromCompany(Request $req)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($req->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $azienda = $response->getData()->azienda;
        $convenzione = new Convenzione();
        return $convenzione->showCompanyConventions($req->idAzienda);
    }
}
