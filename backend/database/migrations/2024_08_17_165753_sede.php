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
            "CREATE TABLE `Sedi` (
                `Via` varchar(255) NOT NULL,
                `NumeroCivico` int NOT NULL,
                `CAP` int NOT NULL,
                `Citta` varchar(255) NOT NULL,
                `Provincia` varchar(255) NOT NULL,
                `idAzienda` int NOT NULL,
                UNIQUE (`Via`, `NumeroCivico`, `CAP`, `Citta`, `Provincia`),
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende` (`idAzienda`) ON DELETE CASCADE ON UPDATE CASCADE
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPDO();
        $pdo->exec("DROP TABLE `Sedi`");
    }
};
