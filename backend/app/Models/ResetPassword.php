<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PDOEcxeption;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;
use PDO; 

class ResetPassword extends Model
{
    use HasFactory;

    private $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function addToken($Email, $Token)
    {
        try {
            $stmnt = $this->pdo->prepare('INSERT INTO ResetPassword (Email, Token, Utilizzato, Timestamp) VALUES (:Email, :Token, :Utilizzato, :Timestamp)');
            $stmnt->execute([
                'Email' => $Email,
                'Token' => $Token,
                'Utilizzato' => 0, // this means false. 
                'Timestamp' => Carbon::now()
            ]); 
            return response()->json(['message' => 'Token created successfully'], Response::HTTP_CREATED);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error creating token',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }

    public function invalidToken($Token){
        try{
            $stmnt = $this->pdo->prepare('UPDATE ResetPassword SET Utilizzato=1 WHERE Token=:Token'); 
            $stmnt->execute([
                'Token' => $Token
            ]); 
            return response()->json([
                'message' => 'Token unvalidated successfully'
            ], Response::HTTP_OK); 
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error invalidating token',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function resetPassword($Token, $Password){
        try{
            $sql = "UPDATE Utenti JOIN ResetPassword ON Utenti.Email = ResetPassword.Email SET Password=:Password WHERE ResetPassword.Token=:Token"; 
            $stmnt = $this->pdo->prepare($sql); 
            $stmnt->execute([
                'Password' => Hash::make($Password),
                'Token' => $Token 
            ]);
            $invalidToken = $this->invalidToken($Token); 
            if($invalidToken->status() !== 200){
                return $invalidToken; 
            }
            else{
                return response()->json([
                    'message' => 'Succesfully updated password',
                ], Response::HTTP_OK); 
            }
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error while updating password',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }

    public function checkToken($Token){
        try{
            $stmnt = $this->pdo->prepare('SELECT COUNT(Token) as count FROM ResetPassword WHERE Token=:Token AND Utilizzato=0'); 
            $stmnt->execute([
                'Token' => $Token
            ]); 
            $result = $stmnt->fetch(PDO::FETCH_ASSOC); 
            $count = $result['count']; 
            if($count > 0){
                return response()->json([
                    'message' => 'Token exists',
                    'isValid' => true
                ], Response::HTTP_OK); 
            }
            else{
                return response()->json([
                    'message' => 'Token does not exist or invalid',
                    'isValid' => false
                ], Response::HTTP_NOT_FOUND); 
            }
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error while checking token', 
                'error' => $e->getMessage(),
                'isValid' => false
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }


    public function checkEmail($Email){
        try{
            $sql = "SELECT COUNT(Email) as count FROM Utenti WHERE Email=:Email"; 
            $stmnt = $this->pdo->prepare($sql); 
            $stmnt->execute([
                'Email' => $Email, 
            ]);
            $result = $stmnt->fetch(PDO::FETCH_ASSOC);
            $count = $result['count']; 
            if($count > 0){
                return response()->json([
                    'message' => 'Email exists'
                ], Response::HTTP_OK); 
            }
            else{
                return response()->json([
                    'message' => 'Email does not exist'
                ], Response::HTTP_NOT_FOUND); 
            }
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error while checking email', 
                'error' => $e->getMessage(), 
            ], Response::HTTP_INTERNAL_SERVER_ERROR); 
        }
    }

    // check if the user already requested a password reset and if the token is still valid
    public function checkRequest($Email){
        $isValid = $this->checkEmail($Email);
        if($isValid->status() !== 200){
            return $isValid;
        }
        try{
            $stmnt = $this->pdo->prepare("SELECT * FROM ResetPassword WHERE Email=:Email AND Utilizzato=0");
            $stmnt->execute([
                'Email' => $Email
            ]);
            if($stmnt->rowCount() > 0){
                return response()->json([
                    'message' => 'You already requested a reset password link. Please check your email'
                ], Response::HTTP_BAD_REQUEST); 
            }
            else{
                return response()->json([
                    'message' => 'You can request a reset password link'
                ], Response::HTTP_OK);
            }
        }catch(PDOException $e){
            return response()->json([
                'message' => 'Error checking token',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


}
