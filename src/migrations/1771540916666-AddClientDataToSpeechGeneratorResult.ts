import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientDataToSpeechGeneratorResult1771540916666 implements MigrationInterface {
  name = 'AddClientDataToSpeechGeneratorResult1771540916666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` ADD \`client_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` ADD \`client_federal_document\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` ADD \`client_birth_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_federal_document\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_birth_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`administrative_procedure_inss_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_29b868778be09b98fc6df81c10\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`special_activity_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_12aa4b798687851f9549e56223\` (\`special_activity_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`judicial_case_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_965494fcf176d3c874f0f89c65\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`medical_question_generator_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_0dd171702bf603c4268d9bf448\` (\`medical_question_generator_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`medical_and_social_report_objection_generator_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_446c4320686781296fbd94b590\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`speech_generator_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_758bff4e126cc4d6f1cce34a51\` (\`speech_generator_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`disability_assessment_for_bpc_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_13ab58fce797eeaf682691ee11\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`audience_question_generator_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_53ee6746aad7493e01b7bc57d1\` (\`audience_question_generator_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`rural_timeline_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_4ba541bcae67039f6ab5a38b00\` (\`rural_timeline_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`insurance_quality_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_f9233c34771a7680583b773983\` (\`insurance_quality_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_2e5d341498df30d2cd9f5c4aee\` (\`per_capita_income_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_12aa4b798687851f9549e56223\` ON \`analysis_tool_record\` (\`special_activity_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_0dd171702bf603c4268d9bf448\` ON \`analysis_tool_record\` (\`medical_question_generator_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_446c4320686781296fbd94b590\` ON \`analysis_tool_record\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\` (\`speech_generator_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_53ee6746aad7493e01b7bc57d1\` ON \`analysis_tool_record\` (\`audience_question_generator_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_4ba541bcae67039f6ab5a38b00\` ON \`analysis_tool_record\` (\`rural_timeline_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f9233c34771a7680583b773983\` ON \`analysis_tool_record\` (\`insurance_quality_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_2e5d341498df30d2cd9f5c4aee\` ON \`analysis_tool_record\` (\`per_capita_income_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_29b868778be09b98fc6df81c10c\` FOREIGN KEY (\`administrative_procedure_inss_analysis_id\`) REFERENCES \`administrative_procedure_inss_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_12aa4b798687851f9549e56223a\` FOREIGN KEY (\`special_activity_id\`) REFERENCES \`special_activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_965494fcf176d3c874f0f89c658\` FOREIGN KEY (\`judicial_case_analysis_id\`) REFERENCES \`judicial_case_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_0dd171702bf603c4268d9bf448c\` FOREIGN KEY (\`medical_question_generator_id\`) REFERENCES \`medical_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_446c4320686781296fbd94b5903\` FOREIGN KEY (\`medical_and_social_report_objection_generator_analysis_id\`) REFERENCES \`ms_report_objection_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_758bff4e126cc4d6f1cce34a51d\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_13ab58fce797eeaf682691ee11d\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_id\`) REFERENCES \`disability_assessment_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_53ee6746aad7493e01b7bc57d1b\` FOREIGN KEY (\`audience_question_generator_id\`) REFERENCES \`audience_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_4ba541bcae67039f6ab5a38b009\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_f9233c34771a7680583b7739839\` FOREIGN KEY (\`insurance_quality_analysis_id\`) REFERENCES \`insurance_quality_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_2e5d341498df30d2cd9f5c4aeea\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_2e5d341498df30d2cd9f5c4aeea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_f9233c34771a7680583b7739839\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_4ba541bcae67039f6ab5a38b009\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_53ee6746aad7493e01b7bc57d1b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_13ab58fce797eeaf682691ee11d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_758bff4e126cc4d6f1cce34a51d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_446c4320686781296fbd94b5903\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_0dd171702bf603c4268d9bf448c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_965494fcf176d3c874f0f89c658\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_12aa4b798687851f9549e56223a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_29b868778be09b98fc6df81c10c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2e5d341498df30d2cd9f5c4aee\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f9233c34771a7680583b773983\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4ba541bcae67039f6ab5a38b00\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_53ee6746aad7493e01b7bc57d1\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_446c4320686781296fbd94b590\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_0dd171702bf603c4268d9bf448\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_12aa4b798687851f9549e56223\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_2e5d341498df30d2cd9f5c4aee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`per_capita_income_for_bpc_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_f9233c34771a7680583b773983\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`insurance_quality_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_4ba541bcae67039f6ab5a38b00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`rural_timeline_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_53ee6746aad7493e01b7bc57d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`audience_question_generator_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_13ab58fce797eeaf682691ee11\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`disability_assessment_for_bpc_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_758bff4e126cc4d6f1cce34a51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`speech_generator_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_446c4320686781296fbd94b590\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`medical_and_social_report_objection_generator_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_0dd171702bf603c4268d9bf448\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`medical_question_generator_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_965494fcf176d3c874f0f89c65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`judicial_case_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_12aa4b798687851f9549e56223\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`special_activity_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_29b868778be09b98fc6df81c10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`administrative_procedure_inss_analysis_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_birth_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_federal_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` DROP COLUMN \`client_birth_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` DROP COLUMN \`client_federal_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` DROP COLUMN \`client_name\``,
    );
  }
}
