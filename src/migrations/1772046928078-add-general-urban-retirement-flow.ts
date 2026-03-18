import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGeneralUrbanRetirementFlow1772046928078 implements MigrationInterface {
  name = 'AddGeneralUrbanRetirementFlow1772046928078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(50) NOT NULL, \`document\` varchar(255) NOT NULL, \`general_urban_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding\` varchar(100) NOT NULL, \`general_urban_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_period_special_time\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('total', 'partial', 'none') NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`general_urban_retirement_analysis_period_id\` varchar(36) NULL, UNIQUE INDEX \`REL_96d438c2ec566de0aad0f8259f\` (\`general_urban_retirement_analysis_period_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`job_position\` varchar(255) NOT NULL, \`career\` varchar(255) NOT NULL, \`service_type\` enum ('effective', 'temporary', 'other') NOT NULL, \`department\` varchar(255) NOT NULL, \`general_urban_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_period_disability\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('total', 'parcial', 'nenhum') NOT NULL, \`degree\` enum ('leve', 'moderado', 'grave') NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`category\` enum ('mental_ou_intelectual', 'fisica', 'sensorial') NOT NULL, \`daily_impact\` text NOT NULL, \`description\` text NOT NULL, \`cid_id\` varchar(36) NULL, \`general_urban_retirement_analysis_period_id\` varchar(36) NULL, UNIQUE INDEX \`REL_a258ae7dbcec4aedd5d9e83e16\` (\`general_urban_retirement_analysis_period_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document_type\` enum ('ctc_document', 'ppp', 'cpts', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros', \`document\` varchar(255) NOT NULL, \`general_urban_retirement_analysis_period_special_time_id\` varchar(36) NULL, \`general_urban_retirement_analysis_period_disability_id\` varchar(36) NULL, \`general_urban_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_remuneration\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`remuneration_date\` date NOT NULL, \`remuneration_amount\` decimal(15,2) NOT NULL, \`general_urban_retirement_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`general_urban_retirement_complete_analysis\` longtext NULL, \`general_urban_retirement_simplified_analysis\` longtext NULL, \`general_urban_retirement_complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`career_start_date\` date NOT NULL, \`public_service_start_date\` date NOT NULL, \`general_urban_retirement_benefit_analysis\` longtext NULL, \`federative_entity\` varchar(50) NULL, \`state\` varchar(2) NULL, \`municipality\` varchar(255) NULL, \`name\` varchar(255) NULL, \`current_position\` varchar(255) NULL, \`benefit_type\` enum ('ORIGINAL_ANALYSIS', 'FEDERATIVE_ENTITY_REVIEW', 'BENEFIT_GRANTED_REVIEW') NULL, \`general_urban_retirement_analysis_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_117c4c09f147cbe28fb597f9a7\` (\`general_urban_retirement_analysis_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`general_urban_retirement_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\` (\`general_urban_retirement_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'analise_aposentadoria_urbana_geral') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\` (\`general_urban_retirement_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_document\` ADD CONSTRAINT \`FK_29a1b9d05b647fc96c56734dcf2\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_aff7883a0002c9295cdcfdafcf0\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_special_time\` ADD CONSTRAINT \`FK_96d438c2ec566de0aad0f8259f6\` FOREIGN KEY (\`general_urban_retirement_analysis_period_id\`) REFERENCES \`general_urban_retirement_analysis_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period\` ADD CONSTRAINT \`FK_d26e244d2ddce71248ef6646ee8\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_disability\` ADD CONSTRAINT \`FK_1db39d82b206944a47590d38d00\` FOREIGN KEY (\`cid_id\`) REFERENCES \`cid_ten\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_disability\` ADD CONSTRAINT \`FK_a258ae7dbcec4aedd5d9e83e16a\` FOREIGN KEY (\`general_urban_retirement_analysis_period_id\`) REFERENCES \`general_urban_retirement_analysis_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` ADD CONSTRAINT \`FK_57f785fe8ed25f9bf7deaac36a5\` FOREIGN KEY (\`general_urban_retirement_analysis_period_special_time_id\`) REFERENCES \`general_urban_retirement_analysis_period_special_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` ADD CONSTRAINT \`FK_eef0053e330500b53b59ac5796b\` FOREIGN KEY (\`general_urban_retirement_analysis_period_disability_id\`) REFERENCES \`general_urban_retirement_analysis_period_disability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` ADD CONSTRAINT \`FK_6c9682c5876b3ea0126a5007b2f\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_remuneration\` ADD CONSTRAINT \`FK_bd176d27aea6b73a8e41f4c27b4\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` ADD CONSTRAINT \`FK_117c4c09f147cbe28fb597f9a75\` FOREIGN KEY (\`general_urban_retirement_analysis_result_id\`) REFERENCES \`general_urban_retirement_analysis_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_cdb9ee6d20c2c9321c1af765fe0\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_cdb9ee6d20c2c9321c1af765fe0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` DROP FOREIGN KEY \`FK_117c4c09f147cbe28fb597f9a75\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_remuneration\` DROP FOREIGN KEY \`FK_bd176d27aea6b73a8e41f4c27b4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` DROP FOREIGN KEY \`FK_6c9682c5876b3ea0126a5007b2f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` DROP FOREIGN KEY \`FK_eef0053e330500b53b59ac5796b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` DROP FOREIGN KEY \`FK_57f785fe8ed25f9bf7deaac36a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_disability\` DROP FOREIGN KEY \`FK_a258ae7dbcec4aedd5d9e83e16a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_disability\` DROP FOREIGN KEY \`FK_1db39d82b206944a47590d38d00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period\` DROP FOREIGN KEY \`FK_d26e244d2ddce71248ef6646ee8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_special_time\` DROP FOREIGN KEY \`FK_96d438c2ec566de0aad0f8259f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_aff7883a0002c9295cdcfdafcf0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_document\` DROP FOREIGN KEY \`FK_29a1b9d05b647fc96c56734dcf2\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`general_urban_retirement_analysis_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_117c4c09f147cbe28fb597f9a7\` ON \`general_urban_retirement_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`general_urban_retirement_analysis\``);
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_remuneration\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_period_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a258ae7dbcec4aedd5d9e83e16\` ON \`general_urban_retirement_analysis_period_disability\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_period_disability\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_period\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_96d438c2ec566de0aad0f8259f\` ON \`general_urban_retirement_analysis_period_special_time\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_period_special_time\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_analysis_document\``,
    );
  }
}
