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
            "CREATE TABLE `Utenti` (
                `idUtente` int NOT NULL AUTO_INCREMENT,
                `Nome` varchar(255) NOT NULL,
                `Cognome` varchar(255) NOT NULL,
                `Email` varchar(255) NOT NULL,
                `Password` varchar(255) NOT NULL,
                `DataNascita` date NOT NULL,
                `TipoUtente` enum('Direttore', 'Ceo', 'Studente') NOT NULL,
                PRIMARY KEY (`idUtente`),
                UNIQUE (`Email`)
            )
        ");
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
