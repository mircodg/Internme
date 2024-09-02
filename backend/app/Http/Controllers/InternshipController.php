<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tirocinio;
use App\Models\Azienda;

class InternshipController extends Controller
{
    function createInternship(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->createTirocinio(
            $request->input('title'),
            $request->input('description'),
            $request->input('type'),
            $request->input('mode'),
            $request->input('maxInterns'),
            $request->input('cdl'),
            $request->input('pay'),
            $idAzienda
        );
    }

    function getInternships(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->getTirocini($idAzienda);
    }
}
