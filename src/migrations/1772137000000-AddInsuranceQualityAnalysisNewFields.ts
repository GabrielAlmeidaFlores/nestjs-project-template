import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInsuranceQualityAnalysisNewFields1772137000000
  implements MigrationInterface
{
  name = 'AddInsuranceQualityAnalysisNewFields1772137000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis\`
        ADD COLUMN \`analysis_is_work_accident_or_serious_illness\` tinyint NULL,
        ADD COLUMN \`analysis_is_serious_illness_art151\` tinyint NULL,
        ADD COLUMN \`analysis_serious_illnesses\` varchar(255) NULL,
        ADD COLUMN \`analysis_other_serious_illness\` varchar(500) NULL,
        ADD COLUMN \`analysis_disease_start_date\` date NULL,
        ADD COLUMN \`analysis_rural_start_date\` date NULL,
        ADD COLUMN \`analysis_rural_end_date\` date NULL,
        ADD COLUMN \`analysis_had_involuntary_unemployment\` tinyint NULL,
        ADD COLUMN \`analysis_intends_to_prove_by_testimony\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis\`
        DROP COLUMN \`analysis_is_work_accident_or_serious_illness\`,
        DROP COLUMN \`analysis_is_serious_illness_art151\`,
        DROP COLUMN \`analysis_serious_illnesses\`,
        DROP COLUMN \`analysis_other_serious_illness\`,
        DROP COLUMN \`analysis_disease_start_date\`,
        DROP COLUMN \`analysis_rural_start_date\`,
        DROP COLUMN \`analysis_rural_end_date\`,
        DROP COLUMN \`analysis_had_involuntary_unemployment\`,
        DROP COLUMN \`analysis_intends_to_prove_by_testimony\``,
    );
  }
}
