import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSequencialToRetirementPlanningRgpsPeriod1772629000000
  implements MigrationInterface
{
  name = 'AddSequencialToRetirementPlanningRgpsPeriod1772629000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\`
        ADD COLUMN \`sequencial\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\`
        DROP COLUMN \`sequencial\``,
    );
  }
}
