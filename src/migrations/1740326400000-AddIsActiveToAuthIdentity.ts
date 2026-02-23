import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToAuthIdentity1740326400000 implements MigrationInterface {
  name = 'AddIsActiveToAuthIdentity1740326400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP COLUMN \`is_active\``,
    );
  }
}
