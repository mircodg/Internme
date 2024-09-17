<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sede;
use App\Models\Azienda;

class SiteController extends Controller
{
    function addSede(Request $request)
    {
        $sede = new Sede();
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() !== 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        return $sede->addSede(
            $idAzienda,
            $request->input('Via'),
            $request->input('NumeroCivico'),
            $request->input('CAP'),
            $request->input('Citta'),
            $request->input('Provincia')
        );
    }

    function removeSede(Request $request)
    {
        $sede = new Sede();
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() !== 200) {
            return $response;
        } else {
            $data = $response->getData(true);
            $idAzienda = $data['azienda']['idAzienda'];
            return $sede->removeSede($idAzienda, $request->input('Via'), $request->input('NumeroCivico'), $request->input('CAP'), $request->input('Citta'), $request->input('Provincia'));
        }
    }

    function editSede(Request $request)
    {
        $sede = new Sede();
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() !== 200) {
            return $response;
        } else {
            $data = $response->getData(true);
            $idAzienda = $data['azienda']['idAzienda'];
            return $sede->editSede($idAzienda, $request->input('Via'), $request->input('NumeroCivico'), $request->input('CAP'), $request->input('Citta'), $request->input('Provincia'));
        }
    }
}
