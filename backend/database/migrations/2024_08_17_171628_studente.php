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
            "CREATE TABLE `AccountStudente` (
                `Matricola` int NOT NULL,
                `idUniversita` int NOT NULL,
                `idUtente` int NOT NULL,
                `CV` varchar(255) NOT NULL,
                `CDL` varchar(255) NOT NULL,
                PRIMARY KEY (`Matricola`, `idUniversita`),
                FOREIGN KEY (`idUtente`) REFERENCES `Utenti` (`idUtente`) ON DELETE CASCADE ON UPDATE CASCADE, 
                FOREIGN KEY (`idUniversita`) REFERENCES `Universita` (`idUniversita`) ON DELETE CASCADE ON UPDATE CASCADE
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Studenti`");
    }
};
