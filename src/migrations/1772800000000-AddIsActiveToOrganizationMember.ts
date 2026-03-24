import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToOrganizationMember1772800000000 implements MigrationInterface {
  name = 'AddIsActiveToOrganizationMember1772800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_member\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_member\` DROP COLUMN \`is_active\``,
    );
  }
}
