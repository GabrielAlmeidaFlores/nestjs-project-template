import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTemporaryDisabilityBenefitsGrantTables1775800000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category\` enum('EMPREGADO_URBANO','EMPREGADO_RURAL','EMPREGO_DOMESTICO','TRABALHADOR_AVULSO','CONTRIBUINTE_INDIVIDUAL_AUTONOMO','CONTRIBUINTE_INDIVIDUAL_PRESTADOR','MEI','SEGURADO_ESPECIAL','SEGURADO_FACULTATIVO') NOT NULL, \`analysis_name\` varchar(255) NULL, \`temporary_disability_benefits_grant_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_tdbg_to_result\` (\`temporary_disability_benefits_grant_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` enum('CNIS') NOT NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_insured_status\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`involuntary_unemployment\` tinyint NOT NULL, \`intention_to_prove_involuntary_unemployment\` tinyint NOT NULL, \`rural_insured_client\` tinyint NOT NULL, \`rural_period_start_date\` date NULL, \`rural_period_end_date\` date NULL, \`documents_description\` text NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_insured_status_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` enum('COMPROVANTE') NOT NULL, \`temporary_disability_benefits_grant_insured_status_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`cid_ten_id\` varchar(255) NULL, \`description\` varchar(255) NULL, \`job_derivated_disability\` tinyint NOT NULL, \`disabling_condition_description\` text NULL, \`disability_from_severe_disease\` tinyint NOT NULL, \`severe_disease\` enum('ALIENACAO_MENTAL','CARDIOPATIA_GRAVE','CEGUEIRA','CONTAMINACAO_POR_RADIACAO','DOENCA_DE_PARKINSON','ESCLEROSE_MULTIPLA','ESPONDILOARTROSE_ANQUILOSANTE','ESTADO_AVANCADO_DA_DOENCA_DE_PAGET','HANSENIASE','HEPATOPATIA_GRAVE','NEFROPATIA_GRAVE','NEOPLASIA_MALIGNA','PARALISIA_IRREVERSIVEL_E_INCAPACITANTE','SINDROME_DA_DEFICIENCIA_IMUNOLOGICA_ADQUIRIDA_AIDS','TUBERCULOSE_ATIVA','OUTROS') NULL, \`disease_start_date\` date NULL, \`needs_constant_assistance_from_another_person\` tinyint NOT NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` enum('MEDICAL','PREVIOUS_MEDICAL') NOT NULL, \`temporary_disability_benefits_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_previous_benefits\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`benefit_number\` varchar(100) NOT NULL, \`temporary_disability_benefits_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_previous_benefits_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` enum('BENEFIT_DECLARATION') NOT NULL, \`temporary_disability_benefits_grant_previous_benefits_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_work_periods\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` enum('EMPREGADO_URBANO','EMPREGADO_RURAL','EMPREGO_DOMESTICO','TRABALHADOR_AVULSO','CONTRIBUINTE_INDIVIDUAL_AUTONOMO','CONTRIBUINTE_INDIVIDUAL_PRESTADOR','MEI','SEGURADO_ESPECIAL','SEGURADO_FACULTATIVO') NOT NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` enum('LEAVE_DATE','COMPETENCE_BELOW_MINIMUM','INCONSISTENT_COMPETENCE') NULL, \`period_consideration\` enum('SIM','NAO','PROVISORIO') NULL, \`contribution_average\` decimal(10,2) NULL, \`status\` tinyint NOT NULL, \`grace_period\` int NOT NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temp_disability_benefits_grant_work_periods_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` varchar(255) NULL, \`payment_date\` date NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`competence_below_the_minimum\` tinyint NULL, \`temporary_disability_benefits_grant_work_periods_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    const hasGrantIdColumn = await queryRunner.hasColumn(
      'analysis_tool_record',
      'temporary_disability_benefits_grant_id',
    );

    if (!hasGrantIdColumn) {
      await queryRunner.query(
        `ALTER TABLE \`analysis_tool_record\` ADD \`temporary_disability_benefits_grant_id\` varchar(36) NULL`,
      );
    }

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente','auxilio_incapacidade_temporaria') NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','REGULATORY_UPDATES','TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS','TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );

    const tdbgTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant',
    );

    if (!tdbgTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_to_result_fk')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant\` ADD CONSTRAINT \`FK_tdbg_to_result_fk\` FOREIGN KEY (\`temporary_disability_benefits_grant_result_id\`) REFERENCES \`temporary_disability_benefits_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_document',
    );

    if (!tdbgDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_document_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_document\` ADD CONSTRAINT \`FK_tdbg_document_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgInsuredStatusTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_insured_status',
    );

    if (!tdbgInsuredStatusTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_insured_status_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` ADD CONSTRAINT \`FK_tdbg_insured_status_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgInsuredStatusDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_insured_status_document',
    );

    if (!tdbgInsuredStatusDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_insured_status_doc_to_insured_status')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` ADD CONSTRAINT \`FK_tdbg_insured_status_doc_to_insured_status\` FOREIGN KEY (\`temporary_disability_benefits_grant_insured_status_id\`) REFERENCES \`temporary_disability_benefits_grant_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgPeriodTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_period',
    );

    if (!tdbgPeriodTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_period_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_period\` ADD CONSTRAINT \`FK_tdbg_period_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgPeriodDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_period_document',
    );

    if (!tdbgPeriodDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_period_doc_to_period')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` ADD CONSTRAINT \`FK_tdbg_period_doc_to_period\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgPreviousBenefitsTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_previous_benefits',
    );

    if (!tdbgPreviousBenefitsTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_prev_benefits_to_period')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` ADD CONSTRAINT \`FK_tdbg_prev_benefits_to_period\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgPreviousBenefitsDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_previous_benefits_document',
    );

    if (!tdbgPreviousBenefitsDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_prev_benefits_doc_to_prev_benefits')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` ADD CONSTRAINT \`FK_tdbg_prev_benefits_doc_to_prev_benefits\` FOREIGN KEY (\`temporary_disability_benefits_grant_previous_benefits_id\`) REFERENCES \`temporary_disability_benefits_grant_previous_benefits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const tdbgWorkPeriodsTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_work_periods',
    );

    if (!tdbgWorkPeriodsTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_work_periods_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` ADD CONSTRAINT \`FK_tdbg_work_periods_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const earningsHistoryTable = await queryRunner.getTable(
      'temp_disability_benefits_grant_work_periods_earnings_history',
    );

    if (!earningsHistoryTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_earnings_history_to_work_periods')) {
      await queryRunner.query(
        `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` ADD CONSTRAINT \`FK_tdbg_earnings_history_to_work_periods\` FOREIGN KEY (\`temporary_disability_benefits_grant_work_periods_id\`) REFERENCES \`temporary_disability_benefits_grant_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const analysisToolRecordTable = await queryRunner.getTable(
      'analysis_tool_record',
    );

    if (!analysisToolRecordTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_atr_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_tdbg_atr_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const analysisToolRecordTable = await queryRunner.getTable(
      'analysis_tool_record',
    );

    if (analysisToolRecordTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_atr_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_tdbg_atr_to_tdbg\``,
      );
    }

    const earningsHistoryTable = await queryRunner.getTable(
      'temp_disability_benefits_grant_work_periods_earnings_history',
    );

    if (earningsHistoryTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_earnings_history_to_work_periods')) {
      await queryRunner.query(
        `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` DROP FOREIGN KEY \`FK_tdbg_earnings_history_to_work_periods\``,
      );
    }

    const tdbgWorkPeriodsTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_work_periods',
    );

    if (tdbgWorkPeriodsTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_work_periods_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` DROP FOREIGN KEY \`FK_tdbg_work_periods_to_tdbg\``,
      );
    }

    const tdbgPreviousBenefitsDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_previous_benefits_document',
    );

    if (tdbgPreviousBenefitsDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_prev_benefits_doc_to_prev_benefits')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` DROP FOREIGN KEY \`FK_tdbg_prev_benefits_doc_to_prev_benefits\``,
      );
    }

    const tdbgPreviousBenefitsTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_previous_benefits',
    );

    if (tdbgPreviousBenefitsTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_prev_benefits_to_period')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` DROP FOREIGN KEY \`FK_tdbg_prev_benefits_to_period\``,
      );
    }

    const tdbgPeriodDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_period_document',
    );

    if (tdbgPeriodDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_period_doc_to_period')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` DROP FOREIGN KEY \`FK_tdbg_period_doc_to_period\``,
      );
    }

    const tdbgPeriodTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_period',
    );

    if (tdbgPeriodTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_period_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_period\` DROP FOREIGN KEY \`FK_tdbg_period_to_tdbg\``,
      );
    }

    const tdbgInsuredStatusDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_insured_status_document',
    );

    if (tdbgInsuredStatusDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_insured_status_doc_to_insured_status')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` DROP FOREIGN KEY \`FK_tdbg_insured_status_doc_to_insured_status\``,
      );
    }

    const tdbgInsuredStatusTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_insured_status',
    );

    if (tdbgInsuredStatusTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_insured_status_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` DROP FOREIGN KEY \`FK_tdbg_insured_status_to_tdbg\``,
      );
    }

    const tdbgDocumentTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_document',
    );

    if (tdbgDocumentTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_document_to_tdbg')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_document\` DROP FOREIGN KEY \`FK_tdbg_document_to_tdbg\``,
      );
    }

    const tdbgTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant',
    );

    if (tdbgTable?.foreignKeys.find((fk) => fk.name === 'FK_tdbg_to_result_fk')) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant\` DROP FOREIGN KEY \`FK_tdbg_to_result_fk\``,
      );
    }

    const hasGrantIdColumn = await queryRunner.hasColumn(
      'analysis_tool_record',
      'temporary_disability_benefits_grant_id',
    );

    if (hasGrantIdColumn) {
      await queryRunner.query(
        `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`temporary_disability_benefits_grant_id\``,
      );
    }

    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum('LEGAL_PLEADING_COMPLETE_ANALYSIS','LEGAL_PLEADING_SIMPLIFIED_ANALYSIS','LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS','RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS','CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS','LEGAL_PROCEEDING_MONITORING','ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS','ELOY_CHAT_LEGISLATION_QUESTIONS','ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH','ELOY_CHAT_ANALYSIS','RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS','RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS','RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS','RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS','RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS','RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS','RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS','RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS','RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS','RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS','SPECIAL_ACTIVITY_COMPLETE_ANALYSIS','SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS','ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS','JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS','JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS','MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS','MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS','SPEECH_GENERATOR_COMPLETE_ANALYSIS','SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS','PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS','INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS','INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS','INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS','ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS','FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS','FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_COMPLETE_ANALYSIS','RURAL_TIMELINE_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS','RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS','AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS','RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS','GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS','GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS','GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS','RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION','TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS','SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS','MINI_ADVISOR_COMPLETE_ANALYSIS','MINI_ADVISOR_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS','DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS','REGULATORY_UPDATES') NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente') NOT NULL`,
    );

    if (tdbgTable?.indices.find((idx) => idx.name === 'REL_tdbg_to_result')) {
      await queryRunner.query(
        `DROP INDEX \`REL_tdbg_to_result\` ON \`temporary_disability_benefits_grant\``,
      );
    }

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temp_disability_benefits_grant_work_periods_earnings_history\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_work_periods\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_previous_benefits_document\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_previous_benefits\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_period_document\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_period\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_insured_status_document\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_insured_status\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_document\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_result\``,
    );
  }
}
