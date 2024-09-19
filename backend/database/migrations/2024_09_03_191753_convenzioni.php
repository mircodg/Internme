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
            "CREATE TABLE `Convenzioni` (
                `idAzienda` int NOT NULL,
                `idUniversita` int NOT NULL, 
                `Stato` enum('Pending', 'Active', 'Rejected', 'Expired') NOT NULL DEFAULT 'Pending',
                `DataStipulazione` date DEFAULT NULL,
                PRIMARY KEY (`idAzienda`, `idUniversita`),  
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende` (`idAzienda`) ON DELETE CASCADE ON UPDATE CASCADE,
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
        $pdo->exec("DROP TABLE `Convenzioni`");
    }
};
