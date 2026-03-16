import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTimeGainedFromRgpsTimeAccelerator1772629000002
  implements MigrationInterface
{
  name = 'RemoveTimeGainedFromRgpsTimeAccelerator1772629000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_time_accelerator\`
        DROP COLUMN \`time_gained\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_time_accelerator\`
        ADD COLUMN \`time_gained\` varchar(100) NULL`,
    );
  }
}
