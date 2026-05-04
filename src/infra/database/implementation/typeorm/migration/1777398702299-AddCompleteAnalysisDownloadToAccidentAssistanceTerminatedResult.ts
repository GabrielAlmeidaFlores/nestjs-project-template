import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompleteAnalysisDownloadToAccidentAssistanceTerminatedResult1777398702299 implements MigrationInterface {
  name =
    'AddCompleteAnalysisDownloadToAccidentAssistanceTerminatedResult1777398702299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE accident_assistance_terminated_result
      ADD complete_analysis_download LONGTEXT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE accident_assistance_terminated_result
      DROP COLUMN complete_analysis_download
    `);
  }
}
