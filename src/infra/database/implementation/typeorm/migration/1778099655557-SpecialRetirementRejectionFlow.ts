import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SpecialRetirementRejectionFlow1778099655557 implements MigrationInterface {
  name = 'SpecialRetirementRejectionFlow1778099655557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NULL, \`type\` varchar(100) NULL, \`special_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`benefit_number\` varchar(255) NULL, \`special_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`number\` varchar(255) NULL, \`special_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_work_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NULL, \`type\` varchar(100) NULL, \`special_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_work_period_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` decimal(10,2) NULL, \`indicators\` longtext NULL, \`payment_date\` date NULL, \`contribution\` decimal(10,2) NULL, \`contribution_salary\` decimal(10,2) NULL, \`competence_below_the_minimum\` tinyint NULL, \`special_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_work_special_period_legal_framework\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`code\` varchar(255) NULL, \`description\` longtext NULL, \`special_retirement_rejection_work_special_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_work_special_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`recognized_special_time\` tinyint NULL, \`company_name\` varchar(255) NULL, \`cnpj\` varchar(20) NULL, \`position\` varchar(255) NULL, \`comprobatory_document\` varchar(255) NULL, \`linked_to_cniss\` tinyint NULL, \`contains_cnis_remuneration_in_period\` tinyint NULL, \`technical_justification\` text NULL, \`additional_observation\` text NULL, \`lawyer_observation\` text NULL, \`exposure_frequency\` text NULL, \`information_source\` varchar(255) NULL, \`identified_agents\` varchar(255) NULL, \`efficient_epi\` tinyint NULL, \`special_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection_work_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`pendency_reason\` json NULL, \`period_consideration\` varchar(50) NULL, \`contribution_average\` varchar(255) NULL, \`status\` varchar(50) NULL, \`grace_period\` varchar(255) NULL, \`activity_type\` varchar(100) NULL, \`special_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`special_retirement_rejection\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`category\` varchar(100) NULL, \`requirement_start_date\` date NULL, \`rejection_date\` date NULL, \`harmful_agents\` text NULL, \`other_agents\` longtext NULL, \`rejection_reason\` varchar(100) NULL, \`other_rejection_reason\` longtext NULL, \`special_retirement_rejection_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_51583932d0535b4fdd915f7421\` (\`special_retirement_rejection_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'indeferimento_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'revisao_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_salario_maternidade', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'cessacao_bpc_idoso', 'concessao_salario_maternidade', 'indeferimento_aposentadoria_professor', 'bpc_deficiente_cessado', 'auxilio_acidente_cessado') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_document\` ADD CONSTRAINT \`FK_6587e1b5e89b354a10e3197e49d\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_inss_benefit\` ADD CONSTRAINT \`FK_e0501f74a82c0315cec249bab98\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_legal_proceeding\` ADD CONSTRAINT \`FK_4bc0123a20584406739104f9ac4\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period_document\` ADD CONSTRAINT \`FK_a842795234b42bfefcfaa9abb04\` FOREIGN KEY (\`special_retirement_rejection_work_period_id\`) REFERENCES \`special_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period_earnings_history\` ADD CONSTRAINT \`FK_f4062dc05470397a560e346d5a0\` FOREIGN KEY (\`special_retirement_rejection_work_period_id\`) REFERENCES \`special_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_special_period_legal_framework\` ADD CONSTRAINT \`FK_3d53d5be12b3521014bc27e18bf\` FOREIGN KEY (\`special_retirement_rejection_work_special_period_id\`) REFERENCES \`special_retirement_rejection_work_special_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_special_period\` ADD CONSTRAINT \`FK_a1677f5cc0fc5c1109f0b794167\` FOREIGN KEY (\`special_retirement_rejection_work_period_id\`) REFERENCES \`special_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period\` ADD CONSTRAINT \`FK_dd1d7f8d318d4b18ab9ea9404e8\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection\` ADD CONSTRAINT \`FK_51583932d0535b4fdd915f74210\` FOREIGN KEY (\`special_retirement_rejection_result_id\`) REFERENCES \`special_retirement_rejection_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_93bdb64f535796b12676befef3b\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_93bdb64f535796b12676befef3b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection\` DROP FOREIGN KEY \`FK_51583932d0535b4fdd915f74210\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period\` DROP FOREIGN KEY \`FK_dd1d7f8d318d4b18ab9ea9404e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_special_period\` DROP FOREIGN KEY \`FK_a1677f5cc0fc5c1109f0b794167\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_special_period_legal_framework\` DROP FOREIGN KEY \`FK_3d53d5be12b3521014bc27e18bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period_earnings_history\` DROP FOREIGN KEY \`FK_f4062dc05470397a560e346d5a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_work_period_document\` DROP FOREIGN KEY \`FK_a842795234b42bfefcfaa9abb04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_legal_proceeding\` DROP FOREIGN KEY \`FK_4bc0123a20584406739104f9ac4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_inss_benefit\` DROP FOREIGN KEY \`FK_e0501f74a82c0315cec249bab98\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_rejection_document\` DROP FOREIGN KEY \`FK_6587e1b5e89b354a10e3197e49d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'indeferimento_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'analise_aposentadoria_rural_hibrida', 'pensao_por_morte', 'indeferimento_aposentadoria_urbana_geral', 'indeferimento_acidente', 'indeferimento_aposentadoria_para_deficiente', 'indeferimento_bpc_deficiente', 'bpc_ao_idoso', 'indeferimento_salario_maternidade', 'indeferimento_auxilio_incapacidade_temporaria', 'cessacao_auxilio_incapacidade_temporaria', 'concessao_salario_maternidade', 'bpc_deficiente_cessado', 'indeferimento_aposentadoria_professor') NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_51583932d0535b4fdd915f7421\` ON \`special_retirement_rejection\``,
    );
    await queryRunner.query(`DROP TABLE \`special_retirement_rejection\``);
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_work_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_work_special_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_work_special_period_legal_framework\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_work_period_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_work_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`special_retirement_rejection_document\``,
    );
  }
}
