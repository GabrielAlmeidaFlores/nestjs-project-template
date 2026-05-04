import type { MigrationInterface, QueryRunner } from 'typeorm';

export class TeacherRetirementPlanningRejectionFlow1777901295345 implements MigrationInterface {
  name = 'TeacherRetirementPlanningRejectionFlow1777901295345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('CNIS', 'DENIED_ADMINISTRATIVE_PROCEDURE', 'ORIGINAL_PROCESS_DOCUMENTATION', 'OTHER_DOCUMENTS') NOT NULL, \`teacher_retirement_planning_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NOT NULL, \`teacher_retirement_planning_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_teaching_period_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`teacher_retirement_planning_rejection_teaching_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_teaching_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`institution_name\` varchar(255) NULL, \`establishment_type\` enum ('PUBLIC', 'PRIVATE') NULL, \`education_level\` enum ('EARLY_CHILDHOOD', 'ELEMENTARY', 'HIGH_SCHOOL', 'HIGHER_EDUCATION') NULL, \`function_performed\` enum ('CLASSROOM', 'MANAGEMENT', 'COORDINATION', 'PEDAGOGICAL_ADVISORY') NULL, \`rejection_reason\` longtext NULL, \`legal_basis_for_recognition\` longtext NULL, \`favorable_jurisprudence\` longtext NULL, \`proof_strategy\` longtext NULL, \`teacher_retirement_planning_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_time_accelerator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`time_type\` enum ('TEMPO_RURAL', 'SERVICO_MILITAR', 'SERVICO_PUBLICO', 'CTPS', 'ALUNO_APRENDIZ', 'TRABALHO_NO_EXTERIOR', 'TRABALHO_INFORMAL', 'SENTENCA_TRABALHISTA') NULL, \`institution\` varchar(255) NULL, \`recognition_inss\` enum ('PROVAVEL', 'IMPARCIAL', 'IMPROVAVEL') NULL, \`affects_qualifying_period\` tinyint NULL, \`technical_note\` longtext NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`grace_period\` varchar(255) NULL, \`viability\` enum ('BAIXA', 'MEDIA', 'ALTA') NULL, \`teacher_retirement_planning_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_work_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`teacher_retirement_planning_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_work_period_earnings\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` varchar(255) NULL, \`remuneration\` varchar(255) NULL, \`indicators\` varchar(255) NULL, \`payment_date\` timestamp NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`competence_below_minimum\` tinyint NULL, \`teacher_retirement_planning_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection_work_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(255) NULL, \`activity_description\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`pendency_reason\` longtext NULL, \`period_consideration\` longtext NULL, \`contribution_average\` varchar(255) NULL, \`status\` varchar(255) NULL, \`grace_period\` varchar(255) NULL, \`impact_months\` varchar(255) NULL, \`is_pendency\` tinyint NULL, \`wants_to_complement_via_meu_inss\` tinyint NULL, \`has_special_period\` tinyint NULL, \`timeline_classification\` enum ('PCD_TIME', 'COMMON_TIME', 'INACTIVITY_PERIOD', 'TEACHER_TIME', 'PENDENCY_PERIOD') NULL, \`teacher_retirement_planning_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_rejection\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`request_entry_date\` date NULL, \`denial_date\` date NULL, \`category\` enum ('urban_employee', 'rural_employee', 'domestic_employee', 'avulso_worker', 'individual_contributor_autonomous', 'individual_contributor_service_provider', 'mei', 'special_insured', 'optional_insured') NULL, \`activity_type\` enum ('classroom_teaching', 'school_management', 'pedagogical_coordination', 'pedagogical_advisory', 'other_functions') NULL, \`activity_type_description\` longtext NULL, \`denial_reason\` enum ('PERIOD_NOT_RECOGNIZED_AS_TEACHER', 'ACTIVITY_NOT_RECOGNIZED_AS_EXCLUSIVE_TEACHING', 'INSUFFICIENT_CONTRIBUTION_TIME', 'LACK_OF_SUPPORTING_DOCUMENTATION', 'FAILURE_TO_PROVE_BASIC_EDUCATION_FUNCTION', 'OTHER') NULL, \`denial_reason_description\` longtext NULL, \`teacher_retirement_planning_rejection_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_1cb9199d674b0b39f6a8113a47\` (\`teacher_retirement_planning_rejection_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`teacher_retirement_planning_rejection_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_salario_maternidade', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade', 'bpc_deficiente_cessado', 'indeferimento_aposentadoria_professor') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS','SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS','DEATH_BENEFIT_GRANT_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_GRANT_FIRST_ANALYSIS','DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS','DEATH_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS','DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS','DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS','DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS','DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS','DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS','REGULATORY_UPDATES','TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_COMPLETE_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS','RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_WORK_PERIOD_DOCUMENT_ANALYSIS','TIME_ACCELERATOR_RURAL_TIME_ANALYSIS','TIME_ACCELERATOR_MILITARY_SERVICE_ANALYSIS','TIME_ACCELERATOR_PUBLIC_SERVICE_ANALYSIS','TIME_ACCELERATOR_CTPS_OUTSIDE_CNIS_ANALYSIS','TIME_ACCELERATOR_STUDENT_APPRENTICE_ANALYSIS','TIME_ACCELERATOR_WORK_ABROAD_ANALYSIS','TIME_ACCELERATOR_INFORMAL_WORK_ANALYSIS','TIME_ACCELERATOR_LABOR_COURT_DECISION_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS','SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES','SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES','SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT','SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT','GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS','ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_COMPLETE_ANALYSIS','ACCIDENT_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS','BPC_DISABILITY_DENIAL_COMPLETE_ANALYSIS','BPC_DISABILITY_DENIAL_SIMPLIFIED_ANALYSIS','BPC_DISABILITY_DENIAL_INSS_DECISION_ANALYSIS','BPC_DISABILITY_DENIAL_FIRST_ANALYSIS','BPC_DISABILITY_TERMINATION_INSS_DECISION_ANALYSIS','BPC_DISABILITY_TERMINATION_COMPLETE_ANALYSIS','BPC_DISABILITY_TERMINATION_SIMPLIFIED_ANALYSIS','BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS','BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_FIRST_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_COMPLETE_ANALYSIS','TEMPORARY_INCAPACITY_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS','MATERNITY_PAY_GRANT_FIRST_ANALYSIS','MATERNITY_PAY_GRANT_COMPLETE_ANALYSIS','MATERNITY_PAY_GRANT_SIMPLIFIED_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_INSS_DECISION_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_FIRST_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_COMPLETE_ANALYSIS', 'TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_SIMPLIFIED_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_document\` ADD CONSTRAINT \`FK_a7103a2f2afe630df88dd62552d\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_inss_benefit\` ADD CONSTRAINT \`FK_fac9e223f25e1c7b6e537e4e381\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_teaching_period_doc\` ADD CONSTRAINT \`FK_b07e53acbeb44681b68dc5db7ff\` FOREIGN KEY (\`teacher_retirement_planning_rejection_teaching_period_id\`) REFERENCES \`teacher_retirement_planning_rejection_teaching_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_teaching_period\` ADD CONSTRAINT \`FK_43b57d27e1bbb505a21d5fe01a7\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` ADD CONSTRAINT \`FK_d5f86938dc63c1630261f7a03ab\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period_document\` ADD CONSTRAINT \`FK_169253362414980fd3bd3148b47\` FOREIGN KEY (\`teacher_retirement_planning_rejection_work_period_id\`) REFERENCES \`teacher_retirement_planning_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period_earnings\` ADD CONSTRAINT \`FK_c18ab9e2d194625be8eb7b2f206\` FOREIGN KEY (\`teacher_retirement_planning_rejection_work_period_id\`) REFERENCES \`teacher_retirement_planning_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period\` ADD CONSTRAINT \`FK_3d1cf3b8d2a3b0036f923aecaba\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection\` ADD CONSTRAINT \`FK_1cb9199d674b0b39f6a8113a473\` FOREIGN KEY (\`teacher_retirement_planning_rejection_result_id\`) REFERENCES \`teacher_retirement_planning_rejection_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_b123e2d397b2b3c9db19fdfea0e\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_b123e2d397b2b3c9db19fdfea0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection\` DROP FOREIGN KEY \`FK_1cb9199d674b0b39f6a8113a473\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period\` DROP FOREIGN KEY \`FK_3d1cf3b8d2a3b0036f923aecaba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period_earnings\` DROP FOREIGN KEY \`FK_c18ab9e2d194625be8eb7b2f206\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_work_period_document\` DROP FOREIGN KEY \`FK_169253362414980fd3bd3148b47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` DROP FOREIGN KEY \`FK_d5f86938dc63c1630261f7a03ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_teaching_period\` DROP FOREIGN KEY \`FK_43b57d27e1bbb505a21d5fe01a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_teaching_period_doc\` DROP FOREIGN KEY \`FK_b07e53acbeb44681b68dc5db7ff\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_inss_benefit\` DROP FOREIGN KEY \`FK_fac9e223f25e1c7b6e537e4e381\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_rejection_document\` DROP FOREIGN KEY \`FK_a7103a2f2afe630df88dd62552d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`teacher_retirement_planning_rejection_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1cb9199d674b0b39f6a8113a47\` ON \`teacher_retirement_planning_rejection\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_work_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_work_period_earnings\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_work_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_teaching_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_teaching_period_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_rejection_document\``,
    );
  }
}
