import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SpeechGeneratorTables1769572212918 implements MigrationInterface {
  protected readonly _type = SpeechGeneratorTables1769572212918.name;

  public name = 'SpeechGeneratorTables1769572212918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `DROP INDEX \`IDX_446c4320686781296fbd94b590\` ON \`analysis_tool_record\``,
    // );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('documentos_previdenciarios') NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`speech_generator_complete_content\` longtext NULL, \`speech_generator_simplified_content\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`speech_generator_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_1fe6fe9f602f80003f509b0b59\` (\`speech_generator_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`speech_generator_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_758bff4e126cc4d6f1cce34a51\` (\`speech_generator_id\`)`,
    );
    // Convert to VARCHAR temporarily to avoid data truncation errors
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY \`resource\` VARCHAR(255) NOT NULL`,
    );
    // Convert back to ENUM with all values
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_linha_tempo_rural') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\` (\`speech_generator_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_document\` ADD CONSTRAINT \`FK_6abd6da1ed48dcf1d309b8c792b\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_758bff4e126cc4d6f1cce34a51d\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_758bff4e126cc4d6f1cce34a51d\``,
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
      `ALTER TABLE \`speech_generator_document\` DROP FOREIGN KEY \`FK_6abd6da1ed48dcf1d309b8c792b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_758bff4e126cc4d6f1cce34a51\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'analise_geradora_objeção_laudo_medico_social', 'avaliacao_deficiencia_para_bpc') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_758bff4e126cc4d6f1cce34a51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`speech_generator_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1fe6fe9f602f80003f509b0b59\` ON \`speech_generator\``,
    );
    await queryRunner.query(`DROP TABLE \`speech_generator\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_result\``);
    await queryRunner.query(`DROP TABLE \`speech_generator_document\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_446c4320686781296fbd94b590\` ON \`analysis_tool_record\` (\`medical_and_social_report_objection_generator_analysis_id\`)`,
    );
  }
}
