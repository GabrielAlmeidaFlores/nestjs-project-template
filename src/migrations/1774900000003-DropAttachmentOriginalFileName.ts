import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropAttachmentOriginalFileName1774900000003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP COLUMN \`original_file_name\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD COLUMN \`original_file_name\` varchar(255) NOT NULL DEFAULT ''`,
    );
  }
}
