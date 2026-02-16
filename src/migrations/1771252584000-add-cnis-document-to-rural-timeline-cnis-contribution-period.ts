import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCnisDocumentToRuralTimelineCnisContributionPeriod1771252584000 implements MigrationInterface {
  name = 'AddCnisDocumentToRuralTimelineCnisContributionPeriod1771252584000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD \`cnis_document\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP COLUMN \`cnis_document\``,
    );
  }
}
