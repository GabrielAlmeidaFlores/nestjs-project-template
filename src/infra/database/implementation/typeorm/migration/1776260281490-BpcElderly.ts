import type { MigrationInterface, QueryRunner } from 'typeorm';

export class BpcElderly1776260281490 implements MigrationInterface {
  name = 'BpcElderly1776260281490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis', 'cad_unico') NOT NULL, \`bpc_elderly_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_family_member_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis_individual', 'consulta_medica', 'medicamento', 'alimentacao_especial', 'fraldas_descartaveis') NOT NULL, \`bpc_elderly_analysis_family_member_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_family_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_name\` varchar(255) NOT NULL, \`birth_date\` date NOT NULL, \`kinship\` enum ('spouse', 'child', 'parent', 'sibling', 'other') NOT NULL, \`lives_in_same_residence\` tinyint NOT NULL, \`has_income\` tinyint NOT NULL, \`monthly_income_amount\` decimal(10,2) NULL, \`income_type\` enum ('retirement', 'death_pension', 'bpc', 'bolsa_familia', 'other_inss_benefits', 'salaries', 'others') NULL, \`bpc_elderly_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`bpc_elderly_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`bpc_elderly_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` text NULL, \`bpc_elderly_analysis_id\` varchar(36) NULL, UNIQUE INDEX \`REL_0f54dce31c1e56cdfc296ed257\` (\`bpc_elderly_analysis_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`bpc_elderly_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_2e2cb32e1168368c156782d993\` (\`bpc_elderly_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'concessao_auxilio_doenca', 'auxilio_incapacidade_temporaria', 'pensao_por_morte', 'bpc_ao_idoso') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'pensao_por_morte', 'bpc_ao_idoso') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_2e2cb32e1168368c156782d993\` ON \`analysis_tool_record\` (\`bpc_elderly_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_document\` ADD CONSTRAINT \`FK_b37565be761bf9aa80842750f51\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_family_member_document\` ADD CONSTRAINT \`FK_d9963b0ce5438fc3a3287ffa182\` FOREIGN KEY (\`bpc_elderly_analysis_family_member_id\`) REFERENCES \`bpc_elderly_analysis_family_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_family_member\` ADD CONSTRAINT \`FK_27369b3cb82780f4df1a2501913\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_inss_benefit\` ADD CONSTRAINT \`FK_5db665d5c40e6079fb30757bf9c\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_legal_proceeding\` ADD CONSTRAINT \`FK_acce40871000afb632bd1e9d545\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_result\` ADD CONSTRAINT \`FK_0f54dce31c1e56cdfc296ed2577\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` ADD CONSTRAINT \`FK_6496c92e737cac2764daa99b314\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` ADD CONSTRAINT \`FK_4f8837a5934e96eb2bf137ead1a\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_2e2cb32e1168368c156782d993d\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_2e2cb32e1168368c156782d993d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` DROP FOREIGN KEY \`FK_4f8837a5934e96eb2bf137ead1a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis\` DROP FOREIGN KEY \`FK_6496c92e737cac2764daa99b314\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_result\` DROP FOREIGN KEY \`FK_0f54dce31c1e56cdfc296ed2577\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_legal_proceeding\` DROP FOREIGN KEY \`FK_acce40871000afb632bd1e9d545\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_inss_benefit\` DROP FOREIGN KEY \`FK_5db665d5c40e6079fb30757bf9c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_family_member\` DROP FOREIGN KEY \`FK_27369b3cb82780f4df1a2501913\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_family_member_document\` DROP FOREIGN KEY \`FK_d9963b0ce5438fc3a3287ffa182\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_analysis_document\` DROP FOREIGN KEY \`FK_b37565be761bf9aa80842750f51\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2e2cb32e1168368c156782d993\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_2e2cb32e1168368c156782d993\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_aposentadoria_especial', 'auxilio_incapacidade_temporaria', 'pensao_por_morte') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`bpc_elderly_analysis_id\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_analysis\``);
    await queryRunner.query(
      `DROP INDEX \`REL_0f54dce31c1e56cdfc296ed257\` ON \`bpc_elderly_analysis_result\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_analysis_result\``);
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_analysis_legal_proceeding\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_analysis_inss_benefit\``);
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_analysis_family_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_analysis_family_member_document\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_analysis_document\``);
  }
}
