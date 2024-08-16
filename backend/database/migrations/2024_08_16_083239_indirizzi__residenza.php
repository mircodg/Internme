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
            "CREATE TABLE `Indirizzi_Residenza`(
                `idIndirizzoResidenza` int NOT NULL AUTO_INCREMENT,
                `Citta` varchar(255) NOT NULL,
                `Via` varchar(255) NOT NULL,
                `Civico` int NOT NULL,
                `CAP` varchar(5) NOT NULL,
                PRIMARY KEY (`idIndirizzoResidenza`)
            )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Indirizzi_Residenza`");
    }
};
