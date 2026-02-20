import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRuralTimelineInssBenefitAndLegalProceeding1771590619935 implements MigrationInterface {
  name = 'AddRuralTimelineInssBenefitAndLegalProceeding1771590619935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_0dd171702bf603c4268d9bf448\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_12aa4b798687851f9549e56223\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2e5d341498df30d2cd9f5c4aee\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_446c4320686781296fbd94b590\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4ba541bcae67039f6ab5a38b00\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_53ee6746aad7493e01b7bc57d1\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f9233c34771a7680583b773983\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`rural_timeline_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`rural_timeline_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_inss_benefit\` ADD CONSTRAINT \`FK_3759b977dddd21cf0bab37cd436\` FOREIGN KEY (\`rural_timeline_analysis_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_legal_proceeding\` ADD CONSTRAINT \`FK_dd1f44ac5fb9a6d924a40009ee6\` FOREIGN KEY (\`rural_timeline_analysis_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_legal_proceeding\` DROP FOREIGN KEY \`FK_dd1f44ac5fb9a6d924a40009ee6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_inss_benefit\` DROP FOREIGN KEY \`FK_3759b977dddd21cf0bab37cd436\``,
    );
    await queryRunner.query(`DROP TABLE \`rural_timeline_legal_proceeding\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline_inss_benefit\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_f9233c34771a7680583b773983\` ON \`analysis_tool_record\` (\`insurance_quality_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\` (\`speech_generator_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_53ee6746aad7493e01b7bc57d1\` ON \`analysis_tool_record\` (\`audience_question_generator_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_4ba541bcae67039f6ab5a38b00\` ON \`analysis_tool_record\` (\`rural_timeline_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_446c4320686781296fbd94b590\` ON \`analysis_tool_record\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_2e5d341498df30d2cd9f5c4aee\` ON \`analysis_tool_record\` (\`per_capita_income_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_12aa4b798687851f9549e56223\` ON \`analysis_tool_record\` (\`special_activity_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_0dd171702bf603c4268d9bf448\` ON \`analysis_tool_record\` (\`medical_question_generator_id\`)`,
    );
  }
}
