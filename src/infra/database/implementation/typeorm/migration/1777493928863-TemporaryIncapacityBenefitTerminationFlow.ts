import type { MigrationInterface, QueryRunner } from 'typeorm';

export class TemporaryIncapacityBenefitTerminationFlow1777493928863 implements MigrationInterface {
  name = 'TemporaryIncapacityBenefitTerminationFlow1777493928863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_disability_analysis_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid_ten_id\` varchar(50) NOT NULL, \`temporary_incapacity_benefit_termination_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_incapacity_benefit_termination_disability_analysis_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_incapacity_benefit_termination_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_disability_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estimated_disability_start_date\` date NOT NULL, \`short_disability_description\` text NULL, \`disability_from_accident\` tinyint NOT NULL, \`disabling_condition_description\` text NULL, \`disability_from_severe_disease\` tinyint NOT NULL, \`severe_disease\` varchar(100) NULL, \`disease_custom_name\` varchar(255) NULL, \`disease_start_date\` date NULL, \`needs_constant_assistance_from_another_person\` tinyint NOT NULL, \`previous_disability_benefit\` tinyint NOT NULL, \`previous_benefit_number\` varchar(100) NULL, \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NOT NULL, \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_incapacity_benefit_termination_insured_status_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_incapacity_benefit_termination_insured_status_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_insured_status\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`involuntary_unemployment\` tinyint NOT NULL, \`intention_to_prove_involuntary_unemployment\` tinyint NOT NULL, \`rural_insured_client\` tinyint NOT NULL, \`rural_period_start_date\` date NULL, \`rural_period_end_date\` date NULL, \`documents_description\` text NULL, \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_incap_benefit_term_work_periods_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` longtext NULL, \`payment_date\` date NULL, \`contribution\` longtext NULL, \`contribution_salary\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`temporary_incapacity_benefit_termination_work_periods_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination_work_periods\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`activity_description\` text NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` varchar(100) NULL, \`period_consideration\` varchar(50) NULL, \`contribution_average\` decimal(15,2) NULL, \`impact_months\` int NULL, \`grace_period\` int NULL, \`is_pendency\` tinyint NOT NULL, \`wants_to_complement_via_meu_inss\` tinyint NULL, \`status\` tinyint NOT NULL, \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_incapacity_benefit_termination\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`benefit_termination_date\` date NULL, \`category\` varchar(100) NULL, \`termination_reason\` varchar(255) NULL, \`termination_reason_description\` text NULL, \`temporary_incapacity_benefit_termination_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_2aa6487eb982db09ee51ab3598\` (\`temporary_incapacity_benefit_termination_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade', 'bpc_deficiente_cessado') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS','SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS','DEATH_BENEFIT_GRANT_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_GRANT_FIRST_ANALYSIS','DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS','DEATH_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS','DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS','REGULATORY_UPDATES','TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_COMPLETE_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_WORK_PERIOD_DOCUMENT_ANALYSIS','TIME_ACCELERATOR_RURAL_TIME_ANALYSIS','TIME_ACCELERATOR_MILITARY_SERVICE_ANALYSIS','TIME_ACCELERATOR_PUBLIC_SERVICE_ANALYSIS','TIME_ACCELERATOR_CTPS_OUTSIDE_CNIS_ANALYSIS','TIME_ACCELERATOR_STUDENT_APPRENTICE_ANALYSIS','TIME_ACCELERATOR_WORK_ABROAD_ANALYSIS','TIME_ACCELERATOR_INFORMAL_WORK_ANALYSIS','TIME_ACCELERATOR_LABOR_COURT_DECISION_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES','SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT','SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT','GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS','ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_COMPLETE_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS','BPC_DISABILITY_DENIAL_COMPLETE_ANALYSIS','BPC_DISABILITY_DENIAL_SIMPLIFIED_ANALYSIS','BPC_DISABILITY_DENIAL_INSS_DECISION_ANALYSIS','BPC_DISABILITY_DENIAL_FIRST_ANALYSIS','BPC_DISABILITY_TERMINATION_INSS_DECISION_ANALYSIS','BPC_DISABILITY_TERMINATION_COMPLETE_ANALYSIS','BPC_DISABILITY_TERMINATION_SIMPLIFIED_ANALYSIS','BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS','BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_FIRST_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_COMPLETE_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','MATERNITY_PAY_GRANT_FIRST_ANALYSIS','MATERNITY_PAY_GRANT_COMPLETE_ANALYSIS','MATERNITY_PAY_GRANT_SIMPLIFIED_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_INSS_DECISION_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_FIRST_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_COMPLETE_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_disability_analysis_cid\` ADD CONSTRAINT \`FK_e38f95f346a7f5be3a4d2953676\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_disability_analysis_id\`) REFERENCES \`temporary_incapacity_benefit_termination_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incapacity_benefit_termination_disability_analysis_doc\` ADD CONSTRAINT \`FK_1b1814bd22687b3811814192f00\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_disability_analysis_id\`) REFERENCES \`temporary_incapacity_benefit_termination_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_disability_analysis\` ADD CONSTRAINT \`FK_24045e4be93f5355120ab405dcb\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_document\` ADD CONSTRAINT \`FK_273deac9a1b9d2e90cd2344474c\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_inss_benefit\` ADD CONSTRAINT \`FK_1fbdaa0461d848898872550b981\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incapacity_benefit_termination_insured_status_document\` ADD CONSTRAINT \`FK_74b119624c0ae319556ead779a7\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_insured_status_id\`) REFERENCES \`temporary_incapacity_benefit_termination_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_insured_status\` ADD CONSTRAINT \`FK_eab65c7041541e900b981b49a06\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incap_benefit_term_work_periods_earnings_history\` ADD CONSTRAINT \`FK_a36ce6345d5fd1f98dec30ff31f\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_work_periods_id\`) REFERENCES \`temporary_incapacity_benefit_termination_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_work_periods\` ADD CONSTRAINT \`FK_4e60abfc6b9fe306f23b74bbf69\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination\` ADD CONSTRAINT \`FK_2aa6487eb982db09ee51ab35987\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_result_id\`) REFERENCES \`temporary_incapacity_benefit_termination_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_c7c16cdd5a55b0cbef6ee6b4a16\` FOREIGN KEY (\`temporary_incapacity_benefit_termination_id\`) REFERENCES \`temporary_incapacity_benefit_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_c7c16cdd5a55b0cbef6ee6b4a16\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination\` DROP FOREIGN KEY \`FK_2aa6487eb982db09ee51ab35987\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_work_periods\` DROP FOREIGN KEY \`FK_4e60abfc6b9fe306f23b74bbf69\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incap_benefit_term_work_periods_earnings_history\` DROP FOREIGN KEY \`FK_a36ce6345d5fd1f98dec30ff31f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_insured_status\` DROP FOREIGN KEY \`FK_eab65c7041541e900b981b49a06\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incapacity_benefit_termination_insured_status_document\` DROP FOREIGN KEY \`FK_74b119624c0ae319556ead779a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_inss_benefit\` DROP FOREIGN KEY \`FK_1fbdaa0461d848898872550b981\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_document\` DROP FOREIGN KEY \`FK_273deac9a1b9d2e90cd2344474c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_disability_analysis\` DROP FOREIGN KEY \`FK_24045e4be93f5355120ab405dcb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_incapacity_benefit_termination_disability_analysis_doc\` DROP FOREIGN KEY \`FK_1b1814bd22687b3811814192f00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_incapacity_benefit_termination_disability_analysis_cid\` DROP FOREIGN KEY \`FK_e38f95f346a7f5be3a4d2953676\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`temporary_incapacity_benefit_termination_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2aa6487eb982db09ee51ab3598\` ON \`temporary_incapacity_benefit_termination\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_work_periods\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_incap_benefit_term_work_periods_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_insured_status\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_incapacity_benefit_termination_insured_status_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_disability_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_incapacity_benefit_termination_disability_analysis_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_incapacity_benefit_termination_disability_analysis_cid\``,
    );
  }
}
