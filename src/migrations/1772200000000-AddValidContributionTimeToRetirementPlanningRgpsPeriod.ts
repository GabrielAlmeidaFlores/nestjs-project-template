import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValidContributionTimeToRetirementPlanningRgpsPeriod1772200000000 implements MigrationInterface {
  name = 'AddValidContributionTimeToRetirementPlanningRgpsPeriod1772200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` ADD \`valid_contribution_time\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` DROP COLUMN \`valid_contribution_time\``,
    );
  }
}
