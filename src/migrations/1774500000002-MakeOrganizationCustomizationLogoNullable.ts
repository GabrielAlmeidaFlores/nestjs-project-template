import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeOrganizationCustomizationLogoNullable1774500000002
  implements MigrationInterface
{
  name = 'MakeOrganizationCustomizationLogoNullable1774500000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` MODIFY COLUMN \`organization_logo\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`organization_customization\` SET \`organization_logo\` = '' WHERE \`organization_logo\` IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` MODIFY COLUMN \`organization_logo\` varchar(255) NOT NULL`,
    );
  }
}
