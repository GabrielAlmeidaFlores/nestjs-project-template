import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropOrganizationLogoColumn1774500000001
  implements MigrationInterface
{
  name = 'DropOrganizationLogoColumn1774500000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organization_logo\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD COLUMN \`organization_logo\` varchar(255) NULL`,
    );
  }
}
