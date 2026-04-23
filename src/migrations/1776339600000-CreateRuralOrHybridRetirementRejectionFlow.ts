import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRuralOrHybridRetirementRejectionFlow1776339600000
  implements MigrationInterface
{
  name = 'CreateRuralOrHybridRetirementRejectionFlow1776339600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_analysis\` longtext NULL, \`second_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`activity_type\` enum ('rural', 'rural_and_urban') NULL, \`application_submission_date\` date NULL, \`requested_benefit\` enum ('aposentadoria_rural_por_idade', 'aposentadoria_hibrida', 'aposentadoria_especial_rural') NULL, \`date_of_rejection\` date NULL, \`rural_or_hybrid_retirement_rejection_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_rural_hybrid_rejection_result_id\` (\`rural_or_hybrid_retirement_rejection_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum ('CNIS', 'processo_administrativo_indeferido') NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(255) NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`worker_type\` enum ('segurado_especial_rural', 'pescador_artesanal', 'seringueiro_ou_extrativista', 'empregado_rural') NULL, \`work_schedule\` enum ('individual', 'economia_familiar') NULL, \`property_name\` varchar(255) NULL, \`property_category\` varchar(255) NULL, \`property_owner\` varchar(255) NULL, \`property_cep\` varchar(20) NULL, \`property_state\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NULL, \`property_city\` varchar(255) NULL, \`property_neighbourhood\` varchar(255) NULL, \`property_street\` varchar(255) NULL, \`property_number\` varchar(50) NULL, \`production_destination\` enum ('subsistencia', 'comercializacao', 'ambos') NULL, \`employee\` tinyint NULL, \`employee_amount\` int NULL, \`agricultural_machinery\` tinyint NULL, \`agricultural_machinery_description\` longtext NULL, \`farm_vehicles\` tinyint NULL, \`farm_vehicles_description\` longtext NULL, \`income_besides_rural_production\` tinyint NULL, \`income_besides_rural_production_description\` longtext NULL, \`client_has_or_had_cnpj\` tinyint NULL, \`client_has_or_had_cnpj_description\` longtext NULL, \`client_lives_in_urban_area\` tinyint NULL, \`client_municipality\` varchar(255) NULL, \`client_state\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NULL, \`distance\` varchar(255) NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum ('ctps') NULL, \`rural_or_hybrid_retirement_rejection_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_period_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`kinship\` enum ('conjuge', 'filho', 'pai_ou_mae', 'irmao_ou_irma', 'other') NULL, \`federal_document\` varchar(20) NULL, \`has_received_rural_benefit\` tinyint NULL, \`benefit_number\` varchar(255) NULL, \`rural_or_hybrid_retirement_rejection_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_period_member_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum ('cnis') NULL, \`rural_or_hybrid_retirement_rejection_period_member_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_name\` varchar(255) NULL, \`federal_document\` varchar(20) NULL, \`insured_relationship\` enum ('conjuge', 'filho', 'pai_ou_mae', 'irmao_ou_irma', 'other') NULL, \`can_testify_start_date\` date NULL, \`can_testify_end_date\` date NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`rural_or_hybrid_retirement_rejection_testimonial_witness_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_work_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`category\` varchar(255) NULL, \`competence_below_the_minimum\` tinyint NULL, \`pendency_reason\` longtext NULL, \`period_consideration\` longtext NULL, \`contribution_average\` varchar(255) NULL, \`status\` varchar(255) NULL, \`grace_period\` varchar(255) NULL, \`job_type\` enum ('rural', 'urban') NULL, \`activity_description\` longtext NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_work_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NULL, \`type\` enum ('supporting', 'other_documentation') NULL, \`rural_or_hybrid_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_work_period_doc_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document_type\` varchar(255) NULL, \`own_name\` varchar(255) NULL, \`document_year\` int NULL, \`technical_note\` longtext NULL, \`rural_or_hybrid_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_work_period_earnings_hist\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` varchar(255) NULL, \`remuneration\` varchar(255) NULL, \`indicators\` longtext NULL, \`payment_date\` datetime NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`competence_below_minimum\` tinyint NULL, \`rural_or_hybrid_retirement_rejection_work_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_or_hybrid_retirement_rejection_time_accelerator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`time_type\` enum ('TEMPO_RURAL', 'SERVICO_MILITAR', 'SERVICO_PUBLICO', 'CTPS', 'ALUNO_APRENDIZ', 'TRABALHO_NO_EXTERIOR', 'TRABALHO_INFORMAL', 'SENTENCA_TRABALHISTA') NULL, \`institution\` varchar(255) NULL, \`recognition_inss\` enum ('provavel', 'imparcial', 'improvavel') NULL, \`affects_qualifying_period\` tinyint NULL, \`technical_note\` longtext NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`grace_period\` varchar(255) NULL, \`viability\` enum ('baixa', 'media', 'alta') NULL, \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`rural_or_hybrid_retirement_rejection_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'indeferimento_aposentadoria_rural_hibrida', 'pensao_por_morte') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD INDEX \`IDX_analysis_tool_record_rural_hybrid_rejection_id\` (\`rural_or_hybrid_retirement_rejection_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_result_id\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_result_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_document\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_inss_benefit\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_inss_benefit\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_legal_proceeding\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_legal_proceeding\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_period\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_document\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_period_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_period_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_member\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_period_member\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_period_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_member_document\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_member_document\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_period_member_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_period_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_testimonial\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness_doc\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_testimonial_doc\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_testimonial_witness_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_testimonial_witness\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_work_period\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_document\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_work_period_doc\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_doc_analysis\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_work_period_analysis\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_earnings_hist\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_work_period_earnings\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_work_period_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_time_accelerator\` ADD CONSTRAINT \`FK_rural_hybrid_rejection_time_accelerator\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_rural_hybrid\` FOREIGN KEY (\`rural_or_hybrid_retirement_rejection_id\`) REFERENCES \`rural_or_hybrid_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_rural_hybrid\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_time_accelerator\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_time_accelerator\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_earnings_hist\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_work_period_earnings\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_doc_analysis\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_work_period_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period_document\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_work_period_doc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_work_period\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_work_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness_doc\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_testimonial_doc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_testimonial\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_member_document\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_member_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_member\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_period_member\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period_document\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_period\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_legal_proceeding\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_legal_proceeding\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_inss_benefit\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_inss_benefit\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection_document\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_or_hybrid_retirement_rejection\` DROP FOREIGN KEY \`FK_rural_hybrid_rejection_result_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_analysis_tool_record_rural_hybrid_rejection_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial', 'concessao_aposentadoria_para_deficiente', 'concessao_pensao_por_morte', 'auxilio_incapacidade_temporaria', 'pensao_por_morte') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`rural_or_hybrid_retirement_rejection_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_rural_hybrid_rejection_result_id\` ON \`rural_or_hybrid_retirement_rejection\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_work_period_earnings_hist\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_work_period_doc_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_work_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_work_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_testimonial_witness\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_period_member_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_period_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_or_hybrid_retirement_rejection_result\``,
    );
  }
}