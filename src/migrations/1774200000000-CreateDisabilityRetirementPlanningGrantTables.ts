import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDisabilityRetirementPlanningGrantTables1774200000000
  implements MigrationInterface
{
  public readonly name =
    'CreateDisabilityRetirementPlanningGrantTables1774200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category\` varchar(100) NOT NULL, \`analysis_name\` varchar(255) NULL, \`long_prize_disability\` tinyint NOT NULL, \`disability_retirement_planning_grant_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_drpg_result\` (\`disability_retirement_planning_grant_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(100) NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` varchar(100) NOT NULL, \`is_pendency\` tinyint NOT NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` varchar(100) NULL, \`type_of_contribution\` varchar(255) NULL, \`status\` tinyint NOT NULL, \`disability_status\` varchar(50) NULL, \`period_consideration\` varchar(50) NULL, \`contribution_average\` decimal(10,2) NULL, \`bond_origin\` varchar(255) NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`disability_retirement_planning_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_disability_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_degree\` varchar(50) NOT NULL, \`disability_category\` varchar(100) NOT NULL, \`disability_description\` longtext NOT NULL, \`daily_impact\` longtext NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`cid_ten_id\` varchar(50) NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_disability_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`disability_retirement_planning_grant_disability_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_time_accelerator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(100) NOT NULL, \`recognition_inss\` varchar(50) NOT NULL, \`recognition_judicial\` varchar(50) NOT NULL, \`viability\` varchar(50) NOT NULL, \`technical_note\` longtext NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`institution\` varchar(255) NULL, \`affects_qualifying_period\` tinyint NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('CNIS') NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`disability_retirement_planning_grant_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      "ALTER TABLE `payment_plan_paid_resource` CHANGE `resource` `resource` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS') NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `analysis_tool_record` CHANGE `type` `type` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_para_deficiente') NOT NULL",
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant\` ADD CONSTRAINT \`FK_drpg_result\` FOREIGN KEY (\`disability_retirement_planning_grant_result_id\`) REFERENCES \`disability_retirement_planning_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_inss_benefit\` ADD CONSTRAINT \`FK_drpg_inss_benefit\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_legal_proceeding\` ADD CONSTRAINT \`FK_drpg_legal_proceeding\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period\` ADD CONSTRAINT \`FK_drpg_period\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_document\` ADD CONSTRAINT \`FK_drpg_period_document\` FOREIGN KEY (\`disability_retirement_planning_grant_period_id\`) REFERENCES \`disability_retirement_planning_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period\` ADD CONSTRAINT \`FK_drpg_disability_period\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period_document\` ADD CONSTRAINT \`FK_drpg_disability_period_document\` FOREIGN KEY (\`disability_retirement_planning_grant_disability_period_id\`) REFERENCES \`disability_retirement_planning_grant_disability_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_time_accelerator\` ADD CONSTRAINT \`FK_drpg_time_accelerator\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_document\` ADD CONSTRAINT \`FK_b1f48f0e2dcd945565aa0c1995b\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_drpg_analysis_tool_record\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_drpg_analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_document\` DROP FOREIGN KEY \`FK_b1f48f0e2dcd945565aa0c1995b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_time_accelerator\` DROP FOREIGN KEY \`FK_drpg_time_accelerator\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period_document\` DROP FOREIGN KEY \`FK_drpg_disability_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period\` DROP FOREIGN KEY \`FK_drpg_disability_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_document\` DROP FOREIGN KEY \`FK_drpg_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period\` DROP FOREIGN KEY \`FK_drpg_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_drpg_legal_proceeding\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_inss_benefit\` DROP FOREIGN KEY \`FK_drpg_inss_benefit\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant\` DROP FOREIGN KEY \`FK_drpg_result\``,
    );
    await queryRunner.query(
      "ALTER TABLE `analysis_tool_record` CHANGE `type` `type` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial') NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `payment_plan_paid_resource` CHANGE `resource` `resource` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS') NOT NULL",
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`disability_retirement_planning_grant_id\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_disability_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_disability_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_drpg_result\` ON \`disability_retirement_planning_grant\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_result\``,
    );
  }
}
