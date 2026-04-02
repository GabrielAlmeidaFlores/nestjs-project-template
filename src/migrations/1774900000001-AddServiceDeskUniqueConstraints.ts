import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddServiceDeskUniqueConstraints1774900000001 implements MigrationInterface {
  public name = 'AddServiceDeskUniqueConstraints1774900000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` ADD UNIQUE KEY \`UQ_support_attendant_email\` (\`email\`)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD UNIQUE KEY \`UQ_auth_identity_support_attendant_id\` (\`support_attendant_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP KEY \`UQ_auth_identity_support_attendant_id\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` DROP KEY \`UQ_support_attendant_email\``,
    );
  }
}
