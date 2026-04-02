import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLegalIdentifierToRegulatoryUpdate1774600000001
  implements MigrationInterface
{
  name = 'AddLegalIdentifierToRegulatoryUpdate1774600000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update\` ADD \`legal_identifier\` varchar(100) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update\` DROP COLUMN \`legal_identifier\``,
    );
  }
}
