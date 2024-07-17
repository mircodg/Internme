<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student as Student;

class StudentsController extends Controller
{
   # return all students in json format using model
    public function index() {
         $student = new Student();
         return $student->showAll();
    }
}
