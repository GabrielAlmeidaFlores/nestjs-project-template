import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImpactGracePeriodComplementViaMyInssToPeriod1776180728758
  implements MigrationInterface
{
  name = 'AddImpactGracePeriodComplementViaMyInssToPeriod1776180728758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` ADD \`impact\` varchar(500) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` ADD \`grace_period\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` ADD \`complement_via_my_inss\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` DROP COLUMN \`complement_via_my_inss\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` DROP COLUMN \`grace_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_grant_period\` DROP COLUMN \`impact\``,
    );
  }
}