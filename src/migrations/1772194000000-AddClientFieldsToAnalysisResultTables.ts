import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientFieldsToAnalysisResultTables1772194000000
  implements MigrationInterface
{
  name = 'AddClientFieldsToAnalysisResultTables1772194000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\`
        ADD COLUMN \`client_last_affiliation_date\` date NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_result\`
        ADD COLUMN \`client_name\` varchar(255) NULL,
        ADD COLUMN \`client_federal_document\` varchar(50) NULL,
        ADD COLUMN \`client_birth_date\` date NULL,
        ADD COLUMN \`client_last_affiliation_date\` date NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_result\`
        ADD COLUMN \`client_name\` varchar(255) NULL,
        ADD COLUMN \`client_federal_document\` varchar(50) NULL,
        ADD COLUMN \`client_birth_date\` date NULL,
        ADD COLUMN \`client_last_affiliation_date\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_result\`
        DROP COLUMN \`client_last_affiliation_date\`,
        DROP COLUMN \`client_birth_date\`,
        DROP COLUMN \`client_federal_document\`,
        DROP COLUMN \`client_name\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_result\`
        DROP COLUMN \`client_last_affiliation_date\`,
        DROP COLUMN \`client_birth_date\`,
        DROP COLUMN \`client_federal_document\`,
        DROP COLUMN \`client_name\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\`
        DROP COLUMN \`client_last_affiliation_date\``,
    );
  }
}
