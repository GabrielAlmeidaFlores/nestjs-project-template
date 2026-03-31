import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMustChangePasswordToAuthIdentity1774930000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD COLUMN \`must_change_password\` tinyint(1) NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP COLUMN \`must_change_password\``,
    );
  }
}
