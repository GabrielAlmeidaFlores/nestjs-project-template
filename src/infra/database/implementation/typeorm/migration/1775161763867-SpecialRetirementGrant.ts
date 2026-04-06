import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SpecialRetirementGrant1775158830724 implements MigrationInterface {
  name = 'SpecialRetirementGrant1775161763867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('ppp', 'ctps', 'ltcat', 'outros_laudos_ou_sentencas_trabalhistas') NOT NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` varchar(255) NULL, \`payment_date\` date NULL, \`competence_below_the_minimum\` tinyint NULL, \`special_retirement_grant_period_id\` varchar(36) NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_period_overdue_contribution\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`overdue_date\` date NOT NULL, \`payment_date\` date NULL, \`special_retirement_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_period_pending_exit_date\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`pending_date\` date NOT NULL, \`pending_amount\` decimal(10,2) NOT NULL, \`special_retirement_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_period_under_minimum\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contribution_date\` date NOT NULL, \`contribution_amount\` decimal(10,2) NOT NULL, \`special_retirement_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`sequencial\` int NULL, \`employment_relationship_source\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`status\` varchar(50) NULL, \`average_contribution_amount\` decimal(10,2) NULL, \`should_consider_period\` tinyint NOT NULL DEFAULT 1, \`should_consider_last_remuneration_as_exit_date\` tinyint NOT NULL DEFAULT 0, \`cnis_document\` varchar(255) NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`special_retirement_grant_complete_analysis\` longtext NULL, \`special_retirement_grant_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_grant\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`special_activity\` tinyint NOT NULL DEFAULT 0, \`cnis_document\` varchar(255) NOT NULL, \`special_retirement_grant_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_69c55102d01911aab0514d05cf\` (\`special_retirement_grant_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`special_retirement_grant_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_467461f25aaf1080665789dfd2\` (\`special_retirement_grant_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('MINI_ADVISOR_COMPLETE_ANALYSIS', 'MINI_ADVISOR_SIMPLIFIED_ANALYSIS', 'REGULATORY_UPDATES', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\` (\`special_retirement_grant_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_benefit\` ADD CONSTRAINT \`FK_87273f80cb3d8a533034bdbe39a\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_document\` ADD CONSTRAINT \`FK_ec6dfca9648d553ec4a627260b0\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_legal_proceeding\` ADD CONSTRAINT \`FK_44212508e53e58e4d94701eaf08\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_earnings_history\` ADD CONSTRAINT \`FK_88e865d45e3080c9758ccd8b5b3\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_earnings_history\` ADD CONSTRAINT \`FK_4546b5aa86528007d73f4b27a00\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_overdue_contribution\` ADD CONSTRAINT \`FK_446002bfd1872a7b1711b507bc9\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_pending_exit_date\` ADD CONSTRAINT \`FK_c2b1ad6c01749f8d813a194ecc1\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_under_minimum\` ADD CONSTRAINT \`FK_09170fc28c9332b01240fae5a9f\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period\` ADD CONSTRAINT \`FK_ad83a1caadac0a4282ba0661326\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` ADD CONSTRAINT \`FK_69c55102d01911aab0514d05cf8\` FOREIGN KEY (\`special_retirement_grant_result_id\`) REFERENCES \`special_retirement_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` ADD CONSTRAINT \`FK_8ecdc7efa4f70d22d93db2f7f23\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` ADD CONSTRAINT \`FK_0e6818d3c98421a72e41dad2b4f\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_467461f25aaf1080665789dfd26\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_467461f25aaf1080665789dfd26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` DROP FOREIGN KEY \`FK_0e6818d3c98421a72e41dad2b4f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` DROP FOREIGN KEY \`FK_8ecdc7efa4f70d22d93db2f7f23\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` DROP FOREIGN KEY \`FK_69c55102d01911aab0514d05cf8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period\` DROP FOREIGN KEY \`FK_ad83a1caadac0a4282ba0661326\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_under_minimum\` DROP FOREIGN KEY \`FK_09170fc28c9332b01240fae5a9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_pending_exit_date\` DROP FOREIGN KEY \`FK_c2b1ad6c01749f8d813a194ecc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_period_overdue_contribution\` DROP FOREIGN KEY \`FK_446002bfd1872a7b1711b507bc9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_earnings_history\` DROP FOREIGN KEY \`FK_4546b5aa86528007d73f4b27a00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_earnings_history\` DROP FOREIGN KEY \`FK_88e865d45e3080c9758ccd8b5b3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_44212508e53e58e4d94701eaf08\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_document\` DROP FOREIGN KEY \`FK_ec6dfca9648d553ec4a627260b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant_benefit\` DROP FOREIGN KEY \`FK_87273f80cb3d8a533034bdbe39a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_467461f25aaf1080665789dfd2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`special_retirement_grant_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_69c55102d01911aab0514d05cf\` ON \`special_retirement_grant\``,
    );
    await queryRunner.query(`DROP TABLE \`special_retirement_grant\``);
    await queryRunner.query(`DROP TABLE \`special_retirement_grant_result\``);
    await queryRunner.query(`DROP TABLE \`special_retirement_grant_period\``);
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_period_under_minimum\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_period_pending_exit_date\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_period_overdue_contribution\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_legal_proceeding\``,
    );
    await queryRunner.query(`DROP TABLE \`special_retirement_grant_document\``);
    await queryRunner.query(`DROP TABLE \`special_retirement_grant_benefit\``);
  }
}
