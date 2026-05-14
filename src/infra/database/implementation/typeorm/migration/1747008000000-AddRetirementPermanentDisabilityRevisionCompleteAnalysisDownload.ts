import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRetirementPermanentDisabilityRevisionCompleteAnalysisDownload1747008000000 implements MigrationInterface {
  name =
    'AddRetirementPermanentDisabilityRevisionCompleteAnalysisDownload1747008000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_result\`
       ADD COLUMN \`complete_analysis_download\` LONGTEXT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_result\`
       DROP COLUMN \`complete_analysis_download\``,
    );
  }
}
