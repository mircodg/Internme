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
            "CREATE TABLE `Candidature`(
            `idTirocinio` int NOT NULL,
            `idUtente` int NOT NULL,
            `Stato` enum('In Attesa', 'Accettata', 'Rifiutata') NOT NULL DEFAULT 'In Attesa',
            FOREIGN KEY (`idTirocinio`) REFERENCES `Tirocini`(`idTirocinio`),
            FOREIGN KEY (`idUtente`) REFERENCES `Utenti`(`idUtente`)
        )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Candidature`");
    }
};
