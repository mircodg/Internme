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
            "CREATE TABLE `Candidature` (
                `Matricola` int NOT NULL,
                `idUniversita` int NOT NULL,
                `idTirocinio` int NOT NULL,
                `Stato` enum('Pending', 'Active', 'Rejected', 'Ended') NOT NULL DEFAULT 'Pending',
                PRIMARY KEY (`Matricola`, `idUniversita`, `idTirocinio`),
                FOREIGN KEY (`Matricola`, `idUniversita`) REFERENCES `AccountStudente` (`Matricola`, `idUniversita`) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (`idTirocinio`) REFERENCES `Tirocini` (`idTirocinio`) ON DELETE CASCADE ON UPDATE CASCADE
            )"
        );
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
