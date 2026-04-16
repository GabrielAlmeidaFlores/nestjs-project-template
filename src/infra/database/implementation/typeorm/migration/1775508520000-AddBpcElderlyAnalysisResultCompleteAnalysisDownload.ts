import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBpcElderlyAnalysisResultCompleteAnalysisDownload1775508520000 implements MigrationInterface {
    name = 'AddBpcElderlyAnalysisResultCompleteAnalysisDownload1775508520000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bpc_elderly_analysis_result\` ADD \`complete_analysis_download\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bpc_elderly_analysis_result\` DROP COLUMN \`complete_analysis_download\``);
    }
}
