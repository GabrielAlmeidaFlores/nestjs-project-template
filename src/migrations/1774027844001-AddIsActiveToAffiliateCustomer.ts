import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToAffiliateCustomer1774027844001 implements MigrationInterface {
  name = 'AddIsActiveToAffiliateCustomer1774027844001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` DROP COLUMN \`is_active\``,
    );
  }
}
