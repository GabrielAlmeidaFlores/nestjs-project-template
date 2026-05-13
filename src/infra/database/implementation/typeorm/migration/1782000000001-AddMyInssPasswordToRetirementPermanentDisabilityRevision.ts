import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMyInssPasswordToRetirementPermanentDisabilityRevision1782000000001 implements MigrationInterface {
  name =
    'AddMyInssPasswordToRetirementPermanentDisabilityRevision1782000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision\` ADD \`my_inss_password\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision\` DROP COLUMN \`my_inss_password\``,
    );
  }
}
