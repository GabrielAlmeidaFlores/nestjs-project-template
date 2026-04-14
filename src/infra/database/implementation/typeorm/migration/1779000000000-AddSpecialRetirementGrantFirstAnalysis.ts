import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpecialRetirementGrantFirstAnalysis1779000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_result\` ADD \`special_retirement_grant_first_analysis\` longtext NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_result\` DROP COLUMN \`special_retirement_grant_first_analysis\``,
    );
  }
}
