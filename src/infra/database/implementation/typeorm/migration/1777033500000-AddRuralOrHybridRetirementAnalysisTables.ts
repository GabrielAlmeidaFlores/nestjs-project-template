import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRuralOrHybridRetirementAnalysisTables1777033500000
  implements MigrationInterface
{
  public name =
    'AddRuralOrHybridRetirementAnalysisTables1777033500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Result table (referenced by root via OneToOne)
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_analysis\` longtext NULL, \`second_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Root analysis table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`activity_type\` enum('rural','rural_and_urban') NULL, \`requested_benefit\` enum('aposentadoria_rural_por_idade','aposentadoria_hibrida','aposentadoria_especial_rural') NULL, \`rural_or_hybrid_retirement_analysis_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_rural_or_hybrid_retirement_analysis_result\` (\`rural_or_hybrid_retirement_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Document table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum('CNIS','processo_administrativo_indeferido') NULL, \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Period table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`worker_type\` enum('segurado_especial_rural','pescador_artesanal','seringueiro_ou_extrativista','empregado_rural') NULL, \`work_schedule\` enum('individual','economia_familiar') NULL, \`property_name\` varchar(255) NULL, \`property_category\` varchar(255) NULL, \`property_owner\` varchar(255) NULL, \`property_cep\` varchar(20) NULL, \`property_state\` enum('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO') NULL, \`property_city\` varchar(255) NULL, \`property_neighbourhood\` varchar(255) NULL, \`property_street\` varchar(255) NULL, \`property_number\` varchar(50) NULL, \`production_destination\` enum('subsistencia','comercializacao','ambos') NULL, \`employee\` tinyint NULL, \`employee_amount\` int NULL, \`agricultural_machinery\` tinyint NULL, \`agricultural_machinery_description\` longtext NULL, \`farm_vehicles\` tinyint NULL, \`farm_vehicles_description\` longtext NULL, \`income_besides_rural_production\` tinyint NULL, \`income_besides_rural_production_description\` longtext NULL, \`client_has_or_had_cnpj\` tinyint NULL, \`client_has_or_had_cnpj_description\` longtext NULL, \`client_lives_in_urban_area\` tinyint NULL, \`client_municipality\` varchar(255) NULL, \`client_state\` enum('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO') NULL, \`distance\` varchar(255) NULL, \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Period document table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum('ctps') NULL, \`rural_or_hybrid_retirement_analysis_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Period member table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_period_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`kinship\` enum('conjuge','filho','pai_ou_mae','irmao_ou_irma','other') NULL, \`federal_document\` varchar(20) NULL, \`has_received_rural_benefit\` tinyint NULL, \`benefit_number\` varchar(255) NULL, \`rural_or_hybrid_retirement_analysis_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Period member document table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_period_member_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum('cnis') NULL, \`rural_or_hybrid_retirement_analysis_period_member_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Testimonial witness table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_name\` varchar(255) NULL, \`federal_document\` varchar(20) NULL, \`insured_relationship\` enum('conjuge','filho','pai_ou_mae','irmao_ou_irma','other') NULL, \`can_testify_start_date\` date NULL, \`can_testify_end_date\` date NULL, \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Testimonial witness document table (shortened table name for MySQL 64-char limit)
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`rural_or_hybrid_retirement_analysis_testimonial_witness_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Work period table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_work_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(255) NULL, \`competence_below_the_minimum\` tinyint NULL, \`pendency_reason\` longtext NULL, \`period_consideration\` longtext NULL, \`contribution_average\` varchar(255) NULL, \`status\` varchar(255) NULL, \`grace_period\` varchar(255) NULL, \`job_type\` enum('rural','urban') NULL, \`activity_description\` longtext NULL, \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Work period document table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_work_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum('supporting','other_documentation') NULL, \`rural_or_hybrid_retirement_analysis_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Work period document analysis table (shortened table name)
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_work_period_doc_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document_type\` varchar(255) NULL, \`own_name\` varchar(255) NULL, \`document_year\` int NULL, \`technical_note\` longtext NULL, \`rural_or_hybrid_retirement_analysis_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Work period earnings history table (shortened table name)
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_work_period_earnings_hist\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` varchar(255) NULL, \`remuneration\` varchar(255) NULL, \`indicators\` longtext NULL, \`payment_date\` timestamp NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`competence_below_minimum\` tinyint NULL, \`rural_or_hybrid_retirement_analysis_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Time accelerator table
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_analysis_time_accelerator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`time_type\` enum('TEMPO_RURAL','SERVICO_MILITAR','SERVICO_PUBLICO','CTPS','ALUNO_APRENDIZ','TRABALHO_NO_EXTERIOR','TRABALHO_INFORMAL','SENTENCA_TRABALHISTA') NULL, \`institution\` varchar(255) NULL, \`recognition_inss\` enum('provavel','imparcial','improvavel') NULL, \`affects_qualifying_period\` tinyint NULL, \`technical_note\` longtext NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`grace_period\` varchar(255) NULL, \`viability\` enum('baixa','media','alta') NULL, \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    // Add FK column to analysis_tool_record
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`rural_or_hybrid_retirement_analysis_id\` varchar(36) NULL`,
    );

    // Update analysis_tool_record.type enum
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_especial','concessao_aposentadoria_para_deficiente','concessao_pensao_por_morte','indeferimento_pensao_por_morte','auxilio_incapacidade_temporaria','pensao_por_morte','indeferimento_aposentadoria_urbana_geral','indeferimento_acidente','indeferimento_aposentadoria_para_deficiente','bpc_ao_idoso','indeferimento_aposentadoria_rural_hibrida','analise_aposentadoria_rural_hibrida') NOT NULL`,
    );

    // Update payment_plan_paid_resource.resource enum
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS','SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS','DEATH_BENEFIT_GRANT_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_GRANT_FIRST_ANALYSIS','DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS','DEATH_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS','DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS','REGULATORY_UPDATES','TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES','SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT','SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT','GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS','ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_COMPLETE_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS','BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS','BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_WORK_PERIOD_DOCUMENT_ANALYSIS') NOT NULL`,
    );

    // Foreign key constraints
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_result\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_result_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_document\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_period\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_document\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_period_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_period_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_member\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_period_member\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_period_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_member_document\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_period_member_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_period_member_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_period_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_testimonial_witness\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness_doc\` ADD CONSTRAINT \`FK_rural_analysis_testimonial_witness_doc\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_testimonial_witness_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_testimonial_witness\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_work_period\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_document\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_work_period_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_doc_analysis\` ADD CONSTRAINT \`FK_rural_analysis_work_period_doc_analysis\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_earnings_hist\` ADD CONSTRAINT \`FK_rural_analysis_work_period_earnings_hist\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_time_accelerator\` ADD CONSTRAINT \`FK_rural_or_hybrid_retirement_analysis_time_accelerator\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_rural_or_hybrid_retirement_analysis\` FOREIGN KEY (\`rural_or_hybrid_retirement_analysis_id\`) REFERENCES \`rural_or_hybrid_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_rural_or_hybrid_retirement_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_time_accelerator\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_time_accelerator\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_earnings_hist\` DROP FOREIGN KEY \`FK_rural_analysis_work_period_earnings_hist\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_doc_analysis\` DROP FOREIGN KEY \`FK_rural_analysis_work_period_doc_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period_document\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_work_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_work_period\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_work_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness_doc\` DROP FOREIGN KEY \`FK_rural_analysis_testimonial_witness_doc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_testimonial_witness\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_member_document\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_period_member_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_member\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_period_member\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period_document\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_period\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis_document\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_analysis\` DROP FOREIGN KEY \`FK_rural_or_hybrid_retirement_analysis_result\``,
    );

    // Revert analysis_tool_record type enum
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_especial','concessao_aposentadoria_para_deficiente','concessao_pensao_por_morte','indeferimento_pensao_por_morte','auxilio_incapacidade_temporaria','pensao_por_morte','indeferimento_aposentadoria_urbana_geral','indeferimento_acidente','indeferimento_aposentadoria_para_deficiente','bpc_ao_idoso') NOT NULL`,
    );

    // Revert payment_plan_paid_resource.resource enum
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS','SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS','DEATH_BENEFIT_GRANT_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_GRANT_FIRST_ANALYSIS','DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS','DEATH_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS','DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS','REGULATORY_UPDATES','TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES','SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT','SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT','GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS','ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_COMPLETE_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS','BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS','BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`rural_or_hybrid_retirement_analysis_id\``,
    );

    await queryRunner.query(
      `DROP INDEX \`REL_rural_or_hybrid_retirement_analysis_result\` ON \`rural_or_hybrid_retirement_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_work_period_earnings_hist\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_work_period_doc_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_work_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_work_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_testimonial_witness\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_period_member_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_period_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_analysis_result\``,
    );
  }
}
