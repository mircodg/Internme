<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $pdo = DB::connection()->getPdo(); 
        $pdo->exec(
            "CREATE TABLE `Utenti`(
                `idUtente` int NOT NULL AUTO_INCREMENT,
                `Nome` varchar(255) NOT NULL,
                `Cognome` varchar(255) NOT NULL,
                `Email` varchar(255) NOT NULL,
                `Password` varchar(255) NOT NULL,
                `idNascita` int NOT NULL,
                `idUniversita` int NULL, 
                `idIndirizzoResidenza` int NOT NULL,
                `idTirocinio` int NULL,
                `Tipo` enum('Studente', 'Ceo', 'Direttore') NOT NULL DEFAULT 'Studente',
                `Matricola` int NULL,
                `CV` blob NULL,
                `CDL` varchar(255) NULL,
                PRIMARY KEY (`idUtente`),
                UNIQUE (`Email`),
                FOREIGN KEY (`idNascita`) REFERENCES `Date_Nascita`(`idNascita`),  
                FOREIGN KEY (`idIndirizzoResidenza`) REFERENCES `Indirizzi_Residenza`(`idIndirizzoResidenza`)
            )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Utenti`");
    }
};
