import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CorporateEmailClient1768507386894 implements MigrationInterface {
  name = 'CorporateEmailClient1768507386894';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_client\` ADD \`corporate_email\` varchar(100) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_client\` DROP COLUMN \`corporate_email\``,
    );
  }
}
