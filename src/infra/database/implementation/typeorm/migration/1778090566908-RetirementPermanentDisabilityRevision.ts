import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RetirementPermanentDisabilityRevision1778090566908 implements MigrationInterface {
  name = 'RetirementPermanentDisabilityRevision1778090566908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE \`retirement_permanent_disability_revision_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('procedimento_administrativo', 'recurso_administrativo', 'laudo_medico', 'decisao_judicial', 'outro', 'cnis', 'carta_concessao_beneficio') NOT NULL, \`retirement_permanent_disability_revision_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`retirement_permanent_disability_revision_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`retirement_permanent_disability_revision_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`retirement_permanent_disability_revision_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`retirement_permanent_disability_revision_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`retirement_permanent_disability_revision_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`retirement_permanent_disability_revision_complete_analysis\` longtext NULL, \`retirement_permanent_disability_revision_simplified_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    // await queryRunner.query(
    //   `CREATE TABLE \`retirement_per_dis_rev_dis_analysis_associated_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid\` varchar(20) NOT NULL, \`retirement_permanent_disability_revision_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    // );
    await queryRunner.query(
      `CREATE TABLE \`retirement_perm_dis_rev_dis_analysis_benefit_associated_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid\` varchar(20) NOT NULL, \`retirement_per_dis_rev_dis_analysis_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`retirement_per_dis_rev_dis_analysis_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`has_previous_benefit\` tinyint NOT NULL, \`benefit_number\` varchar(50) NULL, \`benefit_start_date\` date NULL, \`benefit_end_date\` date NULL, \`retirement_permanent_disability_revision_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`retirement_per_dis_rev_dis_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(500) NOT NULL, \`type\` enum ('medical_document', 'previous_medical_report', 'benefit_declaration') NOT NULL, \`retirement_permanent_disability_revision_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`retirement_per_dis_rev_dis_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estimated_incapacity_start_date\` date NULL, \`medical_description\` text NULL, \`is_accident_related\` tinyint NULL, \`accident_description\` text NULL, \`is_severe_disease\` tinyint NULL, \`severe_disease_type\` varchar(255) NULL, \`severe_disease_name\` varchar(255) NULL, \`disease_start_date\` date NULL, \`needs_permanent_assistance\` tinyint NULL, \`retirement_permanent_disability_revision_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`retirement_permanent_disability_revision\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`category\` enum ('EMPREGADO_URBANO', 'EMPREGADO_RURAL', 'EMPREGO_DOMESTICO', 'TRABALHADOR_AVULSO', 'CONTRIBUINTE_INDIVIDUAL_AUTONOMO', 'CONTRIBUINTE_INDIVIDUAL_PRESTADOR', 'MEI', 'SEGURADO_ESPECIAL', 'SEGURADO_FACULTATIVO') NULL, \`retirement_permanent_disability_revision_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_70e43f55cb81744b456573a635\` (\`retirement_permanent_disability_revision_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`retirement_permanent_disability_revision_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'revisao_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_salario_maternidade', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'cessacao_bpc_idoso', 'concessao_salario_maternidade', 'bpc_deficiente_cessado', 'auxilio_acidente_cessado', 'revisao_aposentadoria_invalidez') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_document\` ADD CONSTRAINT \`FK_4db3f409164d229acc5e8075f21\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_inss_benefit\` ADD CONSTRAINT \`FK_e6901bff5f78411b29de272c936\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_legal_proceeding\` ADD CONSTRAINT \`FK_6aef0af5dad7ebf506cfc31e560\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_associated_cid\` ADD CONSTRAINT \`FK_ca8193e78ec643fa0b8cd176d9e\` FOREIGN KEY (\`retirement_permanent_disability_revision_disability_analysis_id\`) REFERENCES \`retirement_per_dis_rev_dis_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_perm_dis_rev_dis_analysis_benefit_associated_cid\` ADD CONSTRAINT \`FK_498d473acdef98d733e89e1d5db\` FOREIGN KEY (\`retirement_per_dis_rev_dis_analysis_benefit_id\`) REFERENCES \`retirement_per_dis_rev_dis_analysis_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_benefit\` ADD CONSTRAINT \`FK_6bab7ebb8ef1980420edb395bc5\` FOREIGN KEY (\`retirement_permanent_disability_revision_disability_analysis_id\`) REFERENCES \`retirement_per_dis_rev_dis_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_document\` ADD CONSTRAINT \`FK_9fb3c796a57e829a1db87479c9a\` FOREIGN KEY (\`retirement_permanent_disability_revision_disability_analysis_id\`) REFERENCES \`retirement_per_dis_rev_dis_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis\` ADD CONSTRAINT \`FK_5c4853b013fdb234be12ee3a752\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision\` ADD CONSTRAINT \`FK_70e43f55cb81744b456573a635f\` FOREIGN KEY (\`retirement_permanent_disability_revision_result_id\`) REFERENCES \`retirement_permanent_disability_revision_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_2cae792050fd684546a36a3ef8e\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_2cae792050fd684546a36a3ef8e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision\` DROP FOREIGN KEY \`FK_70e43f55cb81744b456573a635f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis\` DROP FOREIGN KEY \`FK_5c4853b013fdb234be12ee3a752\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_document\` DROP FOREIGN KEY \`FK_9fb3c796a57e829a1db87479c9a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_benefit\` DROP FOREIGN KEY \`FK_6bab7ebb8ef1980420edb395bc5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_perm_dis_rev_dis_analysis_benefit_associated_cid\` DROP FOREIGN KEY \`FK_498d473acdef98d733e89e1d5db\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_associated_cid\` DROP FOREIGN KEY \`FK_ca8193e78ec643fa0b8cd176d9e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_legal_proceeding\` DROP FOREIGN KEY \`FK_6aef0af5dad7ebf506cfc31e560\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_inss_benefit\` DROP FOREIGN KEY \`FK_e6901bff5f78411b29de272c936\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_document\` DROP FOREIGN KEY \`FK_4db3f409164d229acc5e8075f21\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_salario_maternidade', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade', 'bpc_deficiente_cessado', 'indeferimento_aposentadoria_professor') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`retirement_permanent_disability_revision_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`teacher_retirement_planning_rejection_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`special_retirement_rejection_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_70e43f55cb81744b456573a635\` ON \`retirement_permanent_disability_revision\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_dis_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_dis_analysis_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_dis_analysis_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_perm_dis_rev_dis_analysis_benefit_associated_cid\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_dis_analysis_associated_cid\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision_document\``,
    );
  }
}
