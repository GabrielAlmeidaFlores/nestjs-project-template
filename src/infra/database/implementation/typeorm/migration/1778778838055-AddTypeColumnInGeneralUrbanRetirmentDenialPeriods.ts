import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeColumnInGeneralUrbanRetirmentDenialPeriods1778778838055 implements MigrationInterface {
  name = 'AddTypeColumnInGeneralUrbanRetirmentDenialPeriods1778778838055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_denial_period\` ADD \`type\` enum ('COMMON_PERIOD', 'TIME_ACCELERATOR_PERIOD') NOT NULL DEFAULT 'COMMON_PERIOD'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_denial_period\` DROP COLUMN \`type\``,
    );
  }
}
