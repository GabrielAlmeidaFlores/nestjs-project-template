import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Phase2NewModuleTables1771521794450 implements MigrationInterface {
  name = 'Phase2NewModuleTables1771521794450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`administrative_procedure_inss_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`administrative_procedure_inss_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`administrative_procedure_inss_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('procedimento_administrativo', 'recurso_administrativo') NOT NULL, \`administrative_procedure_inss_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`administrative_procedure_inss_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`administrative_procedure_inss_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`administrative_procedure_inss_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`administrative_procedure_inss_complete_analysis\` longtext NULL, \`administrative_procedure_inss_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audience_question_generator_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`audience_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audience_question_generator_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`audience_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audience_question_generator_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`audience_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audience_question_generator_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`audience_question_generator_complete_analysis\` longtext NULL, \`audience_question_generator_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audience_question_generator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`audience_question_generator_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_8d7c2779f7255f63e3a7a7734e\` (\`audience_question_generator_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
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
      `CREATE TABLE \`insurance_quality_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis', 'rural', 'complementary') NOT NULL, \`insurance_quality_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`insurance_quality_analysis_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`insurance_quality_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`insurance_quality_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`insurance_quality_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`insurance_quality_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`client_name\` varchar(255) NULL, \`client_federal_document\` varchar(50) NULL, \`client_birth_date\` date NULL, \`insurance_quality_conclusion\` text NULL, \`grace_period_conclusion\` text NULL, \`final_recommendation\` text NULL, \`analysis_summary\` text NULL, \`insurance_quality_analysis_id\` varchar(36) NULL, UNIQUE INDEX \`REL_810c02e36aa6bafcd0ac848d9a\` (\`insurance_quality_analysis_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`insurance_quality_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_benefit_number\` varchar(100) NULL, \`analysis_benefit_type\` varchar(255) NULL, \`analysis_benefit_concession_date\` date NULL, \`analysis_benefit_cessation_date\` date NULL, \`analysis_has_previous_benefit\` tinyint NULL, \`analysis_previous_benefit_details\` text NULL, \`analysis_contribution_situation\` text NULL, \`analysis_has_rural_activity\` tinyint NULL, \`analysis_rural_activity_details\` text NULL, \`insurance_quality_analysis_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_672c4bcd5b043e33bb724677ba\` (\`insurance_quality_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`judicial_case_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`judicial_case_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`judicial_case_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('caso_judicial', 'outro_documento') NOT NULL, \`judicial_case_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`judicial_case_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`judicial_case_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`judicial_case_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`judicial_case_complete_analysis\` longtext NULL, \`judicial_case_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`judicial_case_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`judicial_case_analysis_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_083c9a69d021368115ff6b3e24\` (\`judicial_case_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ms_report_objection_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`ms_report_objection_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ms_report_objection_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('laudo_medico_pericial', 'processo_judicial') NOT NULL, \`ms_report_objection_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ms_report_objection_analysis_legal_proc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`ms_report_objection_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ms_report_objection_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`ms_report_objection_complete_analysis\` longtext NULL, \`ms_report_objection_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ms_report_objection_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`ms_report_objection_analysis_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_aa6fcc2b5efdb4266072a7fa91\` (\`ms_report_objection_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medical_question_generator_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('medical', 'cnis') NOT NULL, \`medical_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medical_question_generator_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`medical_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medical_question_generator_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`medical_question_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medical_question_generator_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`medical_question_generator_complete_analysis\` text NULL, \`medical_question_generator_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medical_question_generator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_date\` date NULL, \`medical_question_generator_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_212db98bd49fa4ff84c7bd5b6e\` (\`medical_question_generator_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis', 'cad_unico') NOT NULL, \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_family_member_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis', 'disposable_diapers_receipt', 'special_food_receipt', 'medical_receipt') NOT NULL, \`per_capita_income_for_bpc_analysis_family_member_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_family_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_name\` varchar(255) NOT NULL, \`birth_date\` date NOT NULL, \`kinship\` enum ('spouse', 'child', 'parent', 'sibling', 'other') NOT NULL, \`lives_in_same_residence\` tinyint NOT NULL, \`has_income\` tinyint NOT NULL, \`monthly_income_amount\` decimal(10,2) NULL, \`income_type\` enum ('retirement', 'death_pension', 'bpc', 'bolsa_familia', 'other_inss_benefits', 'salaries', 'others') NULL, \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`complete_analysis\` text NULL, \`simplified_analysis\` text NULL, \`per_capita_income_for_bpc_analysis_id\` varchar(36) NULL, UNIQUE INDEX \`REL_263b5df6ed83ee05aaa68da80f\` (\`per_capita_income_for_bpc_analysis_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`per_capita_income_for_bpc_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_cnis_contribution_period_under_minimum\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contribution_date\` date NOT NULL, \`contribution_amount\` decimal(10,2) NOT NULL, \`rural_timeline_cnis_contribution_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_cnis_contribution_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`employment_relationship_source\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`qualifying_period\` int NULL, \`status\` varchar(50) NULL, \`average_contribution_amount\` decimal(10,2) NULL, \`contribution_adjustment_intent\` varchar(50) NOT NULL, \`external_supplementation_intent\` tinyint NOT NULL, \`cnis_document\` varchar(255) NULL, \`rural_timeline_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(50) NOT NULL, \`document\` text NOT NULL, \`rural_timeline_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document_year\` int NULL, \`document_holder_type\` varchar(100) NULL, \`self_owned\` tinyint NULL, \`probatory_purpose\` text NULL, \`analyzed_at\` timestamp NULL, \`document\` text NOT NULL, \`type\` varchar(100) NOT NULL, \`rural_timeline_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_economic_aspects\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(100) NOT NULL, \`content\` text NULL, \`rural_timeline_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_family_group_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`federal_document\` varchar(20) NOT NULL, \`kinship\` varchar(50) NOT NULL, \`receives_rural_benefit\` tinyint NOT NULL, \`benefit_number\` varchar(100) NULL, \`cnis_document\` text NULL, \`rural_timeline_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_property\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`property_name\` varchar(255) NULL, \`owner_name\` varchar(255) NULL, \`postal_code\` varchar(8) NULL, \`state_code\` varchar(2) NULL, \`city\` varchar(255) NULL, \`neighborhood\` varchar(255) NULL, \`street\` varchar(255) NULL, \`street_number\` varchar(50) NULL, \`land_ownership_type\` varchar(50) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_residence\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`city\` varchar(255) NOT NULL, \`state_code\` varchar(2) NOT NULL, \`distance_to_property_km\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`worker_type\` varchar(50) NULL, \`work_regime_type\` varchar(50) NULL, \`production_destination\` varchar(50) NULL, \`document_analysis\` text NULL, \`rural_timeline_id\` varchar(36) NULL, \`rural_timeline_period_property_id\` varchar(36) NULL, \`rural_timeline_period_residence_id\` varchar(36) NULL, UNIQUE INDEX \`REL_c33c5fc4eaa38db6bbc7f95de5\` (\`rural_timeline_period_property_id\`), UNIQUE INDEX \`REL_3fb1bd6e7fbe8ed00ff89ca441\` (\`rural_timeline_period_residence_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`rural_timeline_complete_analysis\` text NULL, \`rural_timeline_simplified_analysis\` text NULL, \`rural_timeline_period_document_analysis\` text NULL, \`work_regime\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_activity_documents\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('ctps', 'ppp') NOT NULL, \`special_activity_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_activity_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`special_activity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_activity_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`special_activity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_activity_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`special_activity_simplified_analysis\` text NULL, \`special_activity_complete_analysis\` longtext NULL, \`special_activity_complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_activity\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`special_activity_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_9b13d3daaffd10aba1efffc584\` (\`special_activity_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('documentos_previdenciarios') NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`speech_generator_complete_content\` longtext NULL, \`speech_generator_simplified_content\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`speech_generator_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_1fe6fe9f602f80003f509b0b59\` (\`speech_generator_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`administrative_procedure_inss_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`administrative_procedure_inss_analysis_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_42237b1f660e35c82905a31d98\` (\`administrative_procedure_inss_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`administrative_request_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`administrative_request_generator_complete_analysis\` text NULL, \`administrative_request_generator_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`full_opinion_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_opinion_generator_complete_analysis\` text NULL, \`full_opinion_generator_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`initial_petition_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`initial_petition_generator_complete_analysis\` text NULL, \`initial_petition_generator_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `ALTER TABLE \`administrative_procedure_inss_analysis_benefit\` ADD CONSTRAINT \`FK_32e4c6d7b98790690d68fea7db6\` FOREIGN KEY (\`administrative_procedure_inss_analysis_id\`) REFERENCES \`administrative_procedure_inss_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_document\` ADD CONSTRAINT \`FK_c4b1fac27ef19ee06704b1f89e3\` FOREIGN KEY (\`administrative_procedure_inss_analysis_id\`) REFERENCES \`administrative_procedure_inss_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_074cc34d7779bb0aac7527fc5a6\` FOREIGN KEY (\`administrative_procedure_inss_analysis_id\`) REFERENCES \`administrative_procedure_inss_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_benefit\` ADD CONSTRAINT \`FK_af9dc4b30860754f40754a75e9b\` FOREIGN KEY (\`audience_question_generator_id\`) REFERENCES \`audience_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_document\` ADD CONSTRAINT \`FK_e6666746497621059c772a0cc88\` FOREIGN KEY (\`audience_question_generator_id\`) REFERENCES \`audience_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_legal_proceeding\` ADD CONSTRAINT \`FK_1338a56875301b8c9daa0e24393\` FOREIGN KEY (\`audience_question_generator_id\`) REFERENCES \`audience_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator\` ADD CONSTRAINT \`FK_8d7c2779f7255f63e3a7a7734e4\` FOREIGN KEY (\`audience_question_generator_result_id\`) REFERENCES \`audience_question_generator_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator\` ADD CONSTRAINT \`FK_5da8ff856aac8a527a6506e25bf\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator\` ADD CONSTRAINT \`FK_cd10ae4c81ce3c90302eb4c1b57\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`insurance_quality_analysis_document\` ADD CONSTRAINT \`FK_2d6fd9997fd2019a22e20b25fd3\` FOREIGN KEY (\`insurance_quality_analysis_id\`) REFERENCES \`insurance_quality_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_inss_benefit\` ADD CONSTRAINT \`FK_905977fcb0df847a728913bb996\` FOREIGN KEY (\`insurance_quality_analysis_id\`) REFERENCES \`insurance_quality_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_36777cd5af4a98df472ad45e1f9\` FOREIGN KEY (\`insurance_quality_analysis_id\`) REFERENCES \`insurance_quality_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` ADD CONSTRAINT \`FK_810c02e36aa6bafcd0ac848d9aa\` FOREIGN KEY (\`insurance_quality_analysis_id\`) REFERENCES \`insurance_quality_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis\` ADD CONSTRAINT \`FK_672c4bcd5b043e33bb724677bae\` FOREIGN KEY (\`insurance_quality_analysis_result_id\`) REFERENCES \`insurance_quality_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_benefit\` ADD CONSTRAINT \`FK_e5f61a198a810ce611ff9b848d3\` FOREIGN KEY (\`judicial_case_analysis_id\`) REFERENCES \`judicial_case_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_document\` ADD CONSTRAINT \`FK_5f8a4ad0e4b849ed183966a6c63\` FOREIGN KEY (\`judicial_case_analysis_id\`) REFERENCES \`judicial_case_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_5594eeda23123bd4b0a3877babe\` FOREIGN KEY (\`judicial_case_analysis_id\`) REFERENCES \`judicial_case_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` ADD CONSTRAINT \`FK_083c9a69d021368115ff6b3e248\` FOREIGN KEY (\`judicial_case_analysis_result_id\`) REFERENCES \`judicial_case_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` ADD CONSTRAINT \`FK_f38f8d01bb36e016c6c38607b26\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` ADD CONSTRAINT \`FK_c65a8aff9bae8470fb2e4624d13\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_benefit\` ADD CONSTRAINT \`FK_f09fd241439be98598dfc86e94f\` FOREIGN KEY (\`ms_report_objection_analysis_id\`) REFERENCES \`ms_report_objection_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_document\` ADD CONSTRAINT \`FK_d1f4deb7b08eab6de3703cb3e9c\` FOREIGN KEY (\`ms_report_objection_analysis_id\`) REFERENCES \`ms_report_objection_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_legal_proc\` ADD CONSTRAINT \`FK_fe992596dd0942eed8f83f5867e\` FOREIGN KEY (\`ms_report_objection_analysis_id\`) REFERENCES \`ms_report_objection_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` ADD CONSTRAINT \`FK_aa6fcc2b5efdb4266072a7fa915\` FOREIGN KEY (\`ms_report_objection_analysis_result_id\`) REFERENCES \`ms_report_objection_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` ADD CONSTRAINT \`FK_f67cbe44d09e381cce002ac6e24\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` ADD CONSTRAINT \`FK_7d69d4e3d869b8b50088df8b244\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_document\` ADD CONSTRAINT \`FK_c0ec90f026f69e10aeaac35c758\` FOREIGN KEY (\`medical_question_generator_id\`) REFERENCES \`medical_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_inss_benefit\` ADD CONSTRAINT \`FK_a6f485a704c2f88e5352161a5ef\` FOREIGN KEY (\`medical_question_generator_id\`) REFERENCES \`medical_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_legal_proceeding\` ADD CONSTRAINT \`FK_91047c75f207a6deead4674937c\` FOREIGN KEY (\`medical_question_generator_id\`) REFERENCES \`medical_question_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator\` ADD CONSTRAINT \`FK_212db98bd49fa4ff84c7bd5b6e8\` FOREIGN KEY (\`medical_question_generator_result_id\`) REFERENCES \`medical_question_generator_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_benefit\` ADD CONSTRAINT \`FK_3f79d2d25040aa3e422f6f7fd44\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_document\` ADD CONSTRAINT \`FK_d9a29875ea841ff5fb466fd87a4\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_family_member_document\` ADD CONSTRAINT \`FK_8f373688c3229b73bc9ed35b03f\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_family_member_id\`) REFERENCES \`per_capita_income_for_bpc_analysis_family_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_family_member\` ADD CONSTRAINT \`FK_0c253c4098f36845e5dc795ddd9\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_8a3bf1fe1df19c394ab038bc21b\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_result\` ADD CONSTRAINT \`FK_263b5df6ed83ee05aaa68da80fa\` FOREIGN KEY (\`per_capita_income_for_bpc_analysis_id\`) REFERENCES \`per_capita_income_for_bpc_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis\` ADD CONSTRAINT \`FK_40f19bccc2be9f9bd179a2c7633\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis\` ADD CONSTRAINT \`FK_ab2727adbbafa7e2a5e2e070a01\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_under_minimum\` ADD CONSTRAINT \`FK_8206b21a3620c0d426f4b6caf62\` FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`) REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD CONSTRAINT \`FK_743a1034cc2718afe8459bea538\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_document\` ADD CONSTRAINT \`FK_6105ff758530a40846d40c70843\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_document\` ADD CONSTRAINT \`FK_4309602ddaf01ca9478fc4abdf2\` FOREIGN KEY (\`rural_timeline_period_id\`) REFERENCES \`rural_timeline_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_economic_aspects\` ADD CONSTRAINT \`FK_37a2f2295b1a6789be5f29deb51\` FOREIGN KEY (\`rural_timeline_period_id\`) REFERENCES \`rural_timeline_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_family_group_member\` ADD CONSTRAINT \`FK_4b21b098547a77b2047e6e2bea8\` FOREIGN KEY (\`rural_timeline_period_id\`) REFERENCES \`rural_timeline_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` ADD CONSTRAINT \`FK_121018e62eaadc25846b4f1ad41\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` ADD CONSTRAINT \`FK_c33c5fc4eaa38db6bbc7f95de5f\` FOREIGN KEY (\`rural_timeline_period_property_id\`) REFERENCES \`rural_timeline_period_property\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` ADD CONSTRAINT \`FK_3fb1bd6e7fbe8ed00ff89ca4418\` FOREIGN KEY (\`rural_timeline_period_residence_id\`) REFERENCES \`rural_timeline_period_residence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_documents\` ADD CONSTRAINT \`FK_6b4427c9167528983350281eb22\` FOREIGN KEY (\`special_activity_id\`) REFERENCES \`special_activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_inss_benefit\` ADD CONSTRAINT \`FK_cb615aa9e37843f51278d703491\` FOREIGN KEY (\`special_activity_id\`) REFERENCES \`special_activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_legal_proceeding\` ADD CONSTRAINT \`FK_9103542d20b1f5387966cc1338e\` FOREIGN KEY (\`special_activity_id\`) REFERENCES \`special_activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity\` ADD CONSTRAINT \`FK_9b13d3daaffd10aba1efffc5844\` FOREIGN KEY (\`special_activity_result_id\`) REFERENCES \`special_activity_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_benefit\` ADD CONSTRAINT \`FK_7f106578006140592f4d420aa64\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_document\` ADD CONSTRAINT \`FK_6abd6da1ed48dcf1d309b8c792b\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_legal_proceeding\` ADD CONSTRAINT \`FK_39a1d8b45340b0e6c1828d5d645\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator\` ADD CONSTRAINT \`FK_1fe6fe9f602f80003f509b0b59f\` FOREIGN KEY (\`speech_generator_result_id\`) REFERENCES \`speech_generator_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator\` ADD CONSTRAINT \`FK_7c7ff870f172493adbb4945459f\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator\` ADD CONSTRAINT \`FK_f6146d6c29cbeb281d07832a546\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` ADD CONSTRAINT \`FK_42237b1f660e35c82905a31d981\` FOREIGN KEY (\`administrative_procedure_inss_analysis_result_id\`) REFERENCES \`administrative_procedure_inss_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` ADD CONSTRAINT \`FK_c304582309e4e2b9559b353d64f\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` ADD CONSTRAINT \`FK_891028baa0d6de4d22fe90936a2\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` DROP FOREIGN KEY \`FK_891028baa0d6de4d22fe90936a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` DROP FOREIGN KEY \`FK_c304582309e4e2b9559b353d64f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis\` DROP FOREIGN KEY \`FK_42237b1f660e35c82905a31d981\``,
    );
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
      `ALTER TABLE \`speech_generator\` DROP FOREIGN KEY \`FK_f6146d6c29cbeb281d07832a546\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator\` DROP FOREIGN KEY \`FK_7c7ff870f172493adbb4945459f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator\` DROP FOREIGN KEY \`FK_1fe6fe9f602f80003f509b0b59f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_legal_proceeding\` DROP FOREIGN KEY \`FK_39a1d8b45340b0e6c1828d5d645\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_document\` DROP FOREIGN KEY \`FK_6abd6da1ed48dcf1d309b8c792b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_benefit\` DROP FOREIGN KEY \`FK_7f106578006140592f4d420aa64\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity\` DROP FOREIGN KEY \`FK_9b13d3daaffd10aba1efffc5844\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_legal_proceeding\` DROP FOREIGN KEY \`FK_9103542d20b1f5387966cc1338e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_inss_benefit\` DROP FOREIGN KEY \`FK_cb615aa9e37843f51278d703491\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_activity_documents\` DROP FOREIGN KEY \`FK_6b4427c9167528983350281eb22\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` DROP FOREIGN KEY \`FK_3fb1bd6e7fbe8ed00ff89ca4418\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` DROP FOREIGN KEY \`FK_c33c5fc4eaa38db6bbc7f95de5f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period\` DROP FOREIGN KEY \`FK_121018e62eaadc25846b4f1ad41\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_family_group_member\` DROP FOREIGN KEY \`FK_4b21b098547a77b2047e6e2bea8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_economic_aspects\` DROP FOREIGN KEY \`FK_37a2f2295b1a6789be5f29deb51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_document\` DROP FOREIGN KEY \`FK_4309602ddaf01ca9478fc4abdf2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_document\` DROP FOREIGN KEY \`FK_6105ff758530a40846d40c70843\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP FOREIGN KEY \`FK_743a1034cc2718afe8459bea538\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_under_minimum\` DROP FOREIGN KEY \`FK_8206b21a3620c0d426f4b6caf62\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis\` DROP FOREIGN KEY \`FK_ab2727adbbafa7e2a5e2e070a01\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis\` DROP FOREIGN KEY \`FK_40f19bccc2be9f9bd179a2c7633\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_result\` DROP FOREIGN KEY \`FK_263b5df6ed83ee05aaa68da80fa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_8a3bf1fe1df19c394ab038bc21b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_family_member\` DROP FOREIGN KEY \`FK_0c253c4098f36845e5dc795ddd9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_family_member_document\` DROP FOREIGN KEY \`FK_8f373688c3229b73bc9ed35b03f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_document\` DROP FOREIGN KEY \`FK_d9a29875ea841ff5fb466fd87a4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`per_capita_income_for_bpc_analysis_benefit\` DROP FOREIGN KEY \`FK_3f79d2d25040aa3e422f6f7fd44\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator\` DROP FOREIGN KEY \`FK_212db98bd49fa4ff84c7bd5b6e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_legal_proceeding\` DROP FOREIGN KEY \`FK_91047c75f207a6deead4674937c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_inss_benefit\` DROP FOREIGN KEY \`FK_a6f485a704c2f88e5352161a5ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_document\` DROP FOREIGN KEY \`FK_c0ec90f026f69e10aeaac35c758\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` DROP FOREIGN KEY \`FK_7d69d4e3d869b8b50088df8b244\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` DROP FOREIGN KEY \`FK_f67cbe44d09e381cce002ac6e24\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis\` DROP FOREIGN KEY \`FK_aa6fcc2b5efdb4266072a7fa915\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_legal_proc\` DROP FOREIGN KEY \`FK_fe992596dd0942eed8f83f5867e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_document\` DROP FOREIGN KEY \`FK_d1f4deb7b08eab6de3703cb3e9c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ms_report_objection_analysis_benefit\` DROP FOREIGN KEY \`FK_f09fd241439be98598dfc86e94f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` DROP FOREIGN KEY \`FK_c65a8aff9bae8470fb2e4624d13\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` DROP FOREIGN KEY \`FK_f38f8d01bb36e016c6c38607b26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis\` DROP FOREIGN KEY \`FK_083c9a69d021368115ff6b3e248\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_5594eeda23123bd4b0a3877babe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_document\` DROP FOREIGN KEY \`FK_5f8a4ad0e4b849ed183966a6c63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`judicial_case_analysis_benefit\` DROP FOREIGN KEY \`FK_e5f61a198a810ce611ff9b848d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis\` DROP FOREIGN KEY \`FK_672c4bcd5b043e33bb724677bae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_result\` DROP FOREIGN KEY \`FK_810c02e36aa6bafcd0ac848d9aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_36777cd5af4a98df472ad45e1f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_inss_benefit\` DROP FOREIGN KEY \`FK_905977fcb0df847a728913bb996\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`insurance_quality_analysis_document\` DROP FOREIGN KEY \`FK_2d6fd9997fd2019a22e20b25fd3\``,
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
      `ALTER TABLE \`audience_question_generator\` DROP FOREIGN KEY \`FK_cd10ae4c81ce3c90302eb4c1b57\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator\` DROP FOREIGN KEY \`FK_5da8ff856aac8a527a6506e25bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator\` DROP FOREIGN KEY \`FK_8d7c2779f7255f63e3a7a7734e4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_legal_proceeding\` DROP FOREIGN KEY \`FK_1338a56875301b8c9daa0e24393\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_document\` DROP FOREIGN KEY \`FK_e6666746497621059c772a0cc88\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audience_question_generator_benefit\` DROP FOREIGN KEY \`FK_af9dc4b30860754f40754a75e9b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_074cc34d7779bb0aac7527fc5a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_document\` DROP FOREIGN KEY \`FK_c4b1fac27ef19ee06704b1f89e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`administrative_procedure_inss_analysis_benefit\` DROP FOREIGN KEY \`FK_32e4c6d7b98790690d68fea7db6\``,
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
      `DROP TABLE \`initial_petition_generator_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`full_opinion_generator_analysis\``);
    await queryRunner.query(
      `DROP TABLE \`administrative_request_generator_analysis\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_42237b1f660e35c82905a31d98\` ON \`administrative_procedure_inss_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`administrative_procedure_inss_analysis\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1fe6fe9f602f80003f509b0b59\` ON \`speech_generator\``,
    );
    await queryRunner.query(`DROP TABLE \`speech_generator\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_result\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_legal_proceeding\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_document\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_benefit\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9b13d3daaffd10aba1efffc584\` ON \`special_activity\``,
    );
    await queryRunner.query(`DROP TABLE \`special_activity\``);
    await queryRunner.query(`DROP TABLE \`special_activity_result\``);
    await queryRunner.query(`DROP TABLE \`special_activity_legal_proceeding\``);
    await queryRunner.query(`DROP TABLE \`special_activity_inss_benefit\``);
    await queryRunner.query(`DROP TABLE \`special_activity_documents\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline\``);
    await queryRunner.query(
      `DROP INDEX \`REL_3fb1bd6e7fbe8ed00ff89ca441\` ON \`rural_timeline_period\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c33c5fc4eaa38db6bbc7f95de5\` ON \`rural_timeline_period\``,
    );
    await queryRunner.query(`DROP TABLE \`rural_timeline_period\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline_period_residence\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline_period_property\``);
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_period_family_group_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_period_economic_aspects\``,
    );
    await queryRunner.query(`DROP TABLE \`rural_timeline_period_document\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline_document\``);
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_cnis_contribution_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_cnis_contribution_period_under_minimum\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_263b5df6ed83ee05aaa68da80f\` ON \`per_capita_income_for_bpc_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_family_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_family_member_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`per_capita_income_for_bpc_analysis_benefit\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_212db98bd49fa4ff84c7bd5b6e\` ON \`medical_question_generator\``,
    );
    await queryRunner.query(`DROP TABLE \`medical_question_generator\``);
    await queryRunner.query(`DROP TABLE \`medical_question_generator_result\``);
    await queryRunner.query(
      `DROP TABLE \`medical_question_generator_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`medical_question_generator_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`medical_question_generator_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_aa6fcc2b5efdb4266072a7fa91\` ON \`ms_report_objection_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`ms_report_objection_analysis\``);
    await queryRunner.query(
      `DROP TABLE \`ms_report_objection_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`ms_report_objection_analysis_legal_proc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`ms_report_objection_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`ms_report_objection_analysis_benefit\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_083c9a69d021368115ff6b3e24\` ON \`judicial_case_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`judicial_case_analysis\``);
    await queryRunner.query(`DROP TABLE \`judicial_case_analysis_result\``);
    await queryRunner.query(
      `DROP TABLE \`judicial_case_analysis_legal_proceeding\``,
    );
    await queryRunner.query(`DROP TABLE \`judicial_case_analysis_document\``);
    await queryRunner.query(`DROP TABLE \`judicial_case_analysis_benefit\``);
    await queryRunner.query(
      `DROP INDEX \`REL_672c4bcd5b043e33bb724677ba\` ON \`insurance_quality_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`insurance_quality_analysis\``);
    await queryRunner.query(
      `DROP INDEX \`REL_810c02e36aa6bafcd0ac848d9a\` ON \`insurance_quality_analysis_result\``,
    );
    await queryRunner.query(`DROP TABLE \`insurance_quality_analysis_result\``);
    await queryRunner.query(
      `DROP TABLE \`insurance_quality_analysis_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`insurance_quality_analysis_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`insurance_quality_analysis_document\``,
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
    await queryRunner.query(
      `DROP INDEX \`REL_8d7c2779f7255f63e3a7a7734e\` ON \`audience_question_generator\``,
    );
    await queryRunner.query(`DROP TABLE \`audience_question_generator\``);
    await queryRunner.query(
      `DROP TABLE \`audience_question_generator_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`audience_question_generator_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`audience_question_generator_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`audience_question_generator_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`administrative_procedure_inss_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`administrative_procedure_inss_analysis_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`administrative_procedure_inss_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`administrative_procedure_inss_analysis_benefit\``,
    );
  }
}
