import type { MigrationInterface, QueryRunner } from 'typeorm';

export class DisabilityAssessmentForBpc1769542774768 implements MigrationInterface {
  name = 'DisabilityAssessmentForBpc1769542774768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`disability_assessment_for_bpc_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`disability_assessment_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_assessment_for_bpc_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('documentos_medicos_e_sociais') NOT NULL, \`disability_assessment_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_assessment_for_bpc_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`disability_assessment_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_assessment_for_bpc_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_assessment_for_bpc_complete_analysis\` longtext NULL, \`disability_assessment_for_bpc_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_assessment_for_bpc_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estimated_disability_start_date\` date NULL, \`attends_school_or_technical_course\` tinyint NULL, \`performs_labor_activity\` tinyint NULL, \`needs_third_party_help\` tinyint NULL, \`has_access_to_basic_services\` tinyint NULL, \`other_barriers_description\` text NULL, \`disability_assessment_for_bpc_analysis_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_30422619be5f1fe83da7f07d3a\` (\`disability_assessment_for_bpc_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`disability_assessment_for_bpc_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_13ab58fce797eeaf682691ee11\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'analise_geradora_objeção_laudo_medico_social', 'avaliacao_deficiencia_para_bpc') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\` (\`disability_assessment_for_bpc_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_benefit\` ADD CONSTRAINT \`FK_58af15d997d47bd30ca6227ed91\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_id\`) REFERENCES \`disability_assessment_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_document\` ADD CONSTRAINT \`FK_071dbdfb80b565f4541d4ff190f\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_id\`) REFERENCES \`disability_assessment_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_35c5bb5c962679d43754992f9f8\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_id\`) REFERENCES \`disability_assessment_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` ADD CONSTRAINT \`FK_30422619be5f1fe83da7f07d3aa\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_result_id\`) REFERENCES \`disability_assessment_for_bpc_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` ADD CONSTRAINT \`FK_44a5de3e709f0990d1dc415c14d\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` ADD CONSTRAINT \`FK_6cbbfd5f21f78fdc1f17b007d30\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_13ab58fce797eeaf682691ee11d\` FOREIGN KEY (\`disability_assessment_for_bpc_analysis_id\`) REFERENCES \`disability_assessment_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_13ab58fce797eeaf682691ee11d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` DROP FOREIGN KEY \`FK_6cbbfd5f21f78fdc1f17b007d30\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` DROP FOREIGN KEY \`FK_44a5de3e709f0990d1dc415c14d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis\` DROP FOREIGN KEY \`FK_30422619be5f1fe83da7f07d3aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_35c5bb5c962679d43754992f9f8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_document\` DROP FOREIGN KEY \`FK_071dbdfb80b565f4541d4ff190f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_assessment_for_bpc_analysis_benefit\` DROP FOREIGN KEY \`FK_58af15d997d47bd30ca6227ed91\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_13ab58fce797eeaf682691ee11\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'analise_geradora_objeção_laudo_medico_social') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_13ab58fce797eeaf682691ee11\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`disability_assessment_for_bpc_analysis_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_30422619be5f1fe83da7f07d3a\` ON \`disability_assessment_for_bpc_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_assessment_for_bpc_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_assessment_for_bpc_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_assessment_for_bpc_analysis_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_assessment_for_bpc_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_assessment_for_bpc_analysis_benefit\``,
    );
  }
}
