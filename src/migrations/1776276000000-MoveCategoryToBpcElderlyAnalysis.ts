import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveCategoryToBpcElderlyAnalysis1776276000000 implements MigrationInterface {
    name = 'MoveCategoryToBpcElderlyAnalysis1776276000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bpc_elderly_analysis\` ADD \`category\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bpc_elderly_analysis\` DROP COLUMN \`category\``);
    }
}
