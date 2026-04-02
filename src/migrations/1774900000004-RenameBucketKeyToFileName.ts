import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameBucketKeyToFileName1774900000004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` RENAME COLUMN \`bucket_key\` TO \`file_name\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` RENAME COLUMN \`file_name\` TO \`bucket_key\``,
    );
  }
}
