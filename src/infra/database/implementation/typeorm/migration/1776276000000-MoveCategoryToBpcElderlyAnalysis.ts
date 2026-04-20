import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveCategoryToBpcElderlyAnalysis1776276000000 implements MigrationInterface {
  name = 'MoveCategoryToBpcElderlyAnalysis1776276000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` ADD \`category\` ENUM('urban_employee','rural_employee','domestic_employee','avulso_worker','individual_contributor_autonomous','individual_contributor_service_provider','mei','special_insured','optional_insured') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` DROP COLUMN \`category\``,
    );
  }
}
