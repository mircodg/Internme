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
                `idConvenzione` int NOT NULL AUTO_INCREMENT,
                `Stato` enum('Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Pending',
                `idAzienda` int NOT NULL,
                PRIMARY KEY (`idConvenzione`),
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende` (`idAzienda`)
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
