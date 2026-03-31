import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOrganizationIdFromSupportAttendant1774920000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` DROP COLUMN \`organization_id\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` ADD COLUMN \`organization_id\` varchar(36) NOT NULL`,
    );
  }
}
