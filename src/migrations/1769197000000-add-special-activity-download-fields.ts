import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpecialActivityDownloadFields1769197000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "special_activity_result_tb"
      ADD COLUMN "special_activity_complete_analysis_download" TEXT NULL,
      ADD COLUMN "special_activity_simplified_analysis_download" TEXT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "special_activity_result_tb"
      DROP COLUMN "special_activity_complete_analysis_download",
      DROP COLUMN "special_activity_simplified_analysis_download"
    `);
  }
}
