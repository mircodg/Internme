<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Studente;
use App\Models\Utente;
use App\Models\Universita;

class StudentController extends Controller
{
    public function checkStudentInfo(Request $request)
    {
        $student = new Studente();
        return $student->checkStudentInfo($request->cookie('jwt'));
    }

    public function createStudent(Request $request)
    {
        $validateData = $request->validate([
            'Matricola' => 'required|integer|digits:6', // convert back to number 
            'Universita' => 'required|string',
            'CorsoDiLaurea' => 'required|string',
            'CV' => 'required|file|mimes:pdf|max:2048' // max file size 2MB
        ]);
        $student = new Studente();
        $path = $request->file('CV')->store('cvs', 'public');
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        if ($data['user']['TipoUtente'] != 'Studente') {
            return response()->json([
                'message' => 'You are not authorized to create a student'
            ], 401);
        }
        $idUtente = $data['user']['idUtente'];
        $universita = new Universita();
        $responseUni = $universita->getUniIDByName($validateData['Universita']);
        $dataUni = $responseUni->getData(true);
        if ($dataUni['university'] == null) {
            return response()->json([
                'message' => 'University not found'
            ], 404);
        }
        $idUniversita = $dataUni['university']['idUniversita'];
        return $student->createStudent($validateData['Matricola'], $idUniversita, $idUtente, $path, $validateData['CorsoDiLaurea']);
    }
}
