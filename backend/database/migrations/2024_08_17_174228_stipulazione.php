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
            "CREATE TABLE `Stipulazioni` (
                `idConvenzione` int NOT NULL,
                `idUniversita` int NOT NULL,
                `DataStipulazione` date NOT NULL,
                PRIMARY KEY (`idConvenzione`, `idUniversita`),
                FOREIGN KEY (`idConvenzione`) REFERENCES `Convenzioni` (`idConvenzione`),
                FOREIGN KEY (`idUniversita`) REFERENCES `Università` (`idUniversita`)
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Stipulazioni`");
    }
};
