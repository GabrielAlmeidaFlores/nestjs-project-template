import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MedicalAndSocialReportId1769546800542 implements MigrationInterface {
  name = 'MedicalAndSocialReportId1769546800542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`medical_and_social_report_objection_generator_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_446c4320686781296fbd94b590\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_446c4320686781296fbd94b590\` ON \`analysis_tool_record\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_446c4320686781296fbd94b5903\` FOREIGN KEY (\`medical_and_social_report_objection_generator_analysis_id\`) REFERENCES \`ms_report_objection_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_446c4320686781296fbd94b5903\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_446c4320686781296fbd94b590\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_446c4320686781296fbd94b590\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`medical_and_social_report_objection_generator_analysis_id\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
  }
}
