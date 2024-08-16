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
            "CREATE TABLE `Date_Stipulazione`(
                `idDataStipulazione` int NOT NULL AUTO_INCREMENT,
                `idConvenzione` int NOT NULL,
                `idUniversita` int NOT NULL,
                `Data` date NOT NULL,
                PRIMARY KEY (`idDataStipulazione`), 
                FOREIGN KEY (`idConvenzione`) REFERENCES `Convenzioni`(`idConvenzione`),
                FOREIGN KEY (`idUniversita`) REFERENCES `Universita`(`idUniversita`)
            )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Date_Stipulazione`");
    }
};
