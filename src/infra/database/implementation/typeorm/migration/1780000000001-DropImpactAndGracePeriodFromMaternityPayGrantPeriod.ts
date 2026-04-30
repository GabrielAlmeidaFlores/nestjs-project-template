import type { MigrationInterface, QueryRunner } from 'typeorm';

export class DropImpactAndGracePeriodFromMaternityPayGrantPeriod1780000000001 implements MigrationInterface {
  public readonly name =
    'DropImpactAndGracePeriodFromMaternityPayGrantPeriod1780000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_grant_period\` DROP COLUMN \`impact\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_grant_period\` DROP COLUMN \`grace_period\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_grant_period\` ADD \`grace_period\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_grant_period\` ADD \`impact\` text NULL`,
    );
  }
}
