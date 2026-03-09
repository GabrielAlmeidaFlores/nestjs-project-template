import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSequencialToRuralTimelineCnisContributionPeriod1772629000001
  implements MigrationInterface
{
  name = 'AddSequencialToRuralTimelineCnisContributionPeriod1772629000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\`
        ADD COLUMN \`sequencial\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\`
        DROP COLUMN \`sequencial\``,
    );
  }
}
