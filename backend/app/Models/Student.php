<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    # return all students in json format
    public function showAll() {
        return response()->json([
            'students' => 'succesfully checked all students'
        ]);
    }
}
