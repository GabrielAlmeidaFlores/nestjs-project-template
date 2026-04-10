import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeathBenefitGrant1775767812173 implements MigrationInterface {
  name = 'CreateDeathBenefitGrant1775767812173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP FOREIGN KEY \`FK_support_ticket_attachment_ticket\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` DROP FOREIGN KEY \`FK_support_ticket_message_sender_auth_identity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` DROP FOREIGN KEY \`FK_support_ticket_message_ticket\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_support_ticket_assigned_attendant\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_support_ticket_organization\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_support_ticket_requester_auth_identity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP FOREIGN KEY \`FK_auth_identity_support_attendant\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_467461f25aaf1080665789dfd26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_affiliate_customer_payment_plan_affiliate_customer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_affiliate_customer_payment_plan_payment_plan_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` DROP FOREIGN KEY \`FK_affiliate_customer_customer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_opp_affiliate_commission_affiliate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_opp_affiliate_commission_plan\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_bank_payment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_bank_transfer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_commission\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_footer_template\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_header_template\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_organization\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_analysis_tool_client\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_organization_member\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` DROP FOREIGN KEY \`FK_364942f94d78d35288f43ece6d7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_customer_email_sent_attachment_analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_customer_email_sent_attachment_customer_email_sent\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_template\` DROP FOREIGN KEY \`FK_email_template_owner\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_support_attendant_email\` ON \`support_attendant\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_auth_identity_support_attendant_id\` ON \`auth_identity\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_pending_exit_date_cnis_contribution_period\` ON \`rural_timeline_period_pending_exit_date\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_cnis_contribution_period_document_period\` ON \`rural_timeline_cnis_contribution_period_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_overdue_contribution_cnis_contribution_period\` ON \`rural_timeline_cnis_contribution_period_overdue_contribution\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_d1ca0140d8785f268c506bd8f84\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`bank_external_id\` ON \`bank_transfer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_opp_affiliate_commission_plan\` ON \`organization_payment_plan_affiliate_commission\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_abt_bank_payment\` ON \`affiliate_bank_transfer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_rtccp_adjustment_period\` ON \`rural_timeline_cnis_contribution_period_adjustment\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_acc_config\` ON \`affiliate_customer_config\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_benefit_institutor\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`cpf\` varchar(255) NULL, \`birth_date\` date NULL, \`sex\` enum ('male', 'female') NULL, \`death_date\` date NULL, \`was_retired\` tinyint NULL, \`retirement_benefit_number\` varchar(255) NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_dependent\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`dependent_class\` enum ('PRIMEIRA_CLASSE', 'SEGUNDA_CLASSE', 'TERCEIRA_CLASSE') NOT NULL, \`dependent_type\` enum ('CONJUGE', 'COMPANHEIRO', 'SEPARADO_DE_FATO_COM_ALIMENTOS', 'DIVORCIADO_COM_ALIMENTOS', 'FILHO_MENOR_21_NAO_EMANCIPADO', 'FILHO_INVALIDO', 'FILHO_COM_DEFICIENCIA_GRAVE', 'MENOR_18_SOB_GUARDA', 'ENTEADO', 'MENOR_18_TUTELADO', 'PAI_DO_FALECIDO', 'MAE_DO_FALECIDO', 'IRMAO_MENOR_21_NAO_EMANCIPADO', 'IRMAO_INVALIDO', 'IRMAO_COM_DEFICIENCIA_INTELECTUAL_OU_MENTAL_OU_GRAVE') NOT NULL, \`sex\` enum ('male', 'female') NOT NULL, \`birth_date\` date NOT NULL, \`has_disability_or_invalidism\` tinyint NOT NULL, \`is_minor_under_16\` tinyint NOT NULL, \`stable_union_or_marriage_start_date\` date NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_dependent_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`death_benefit_dependent_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('CNIS', 'DEATH_CERTIFICATE', 'EMPLOYMENT_BOND_DOCUMENTS', 'RURAL_DOCUMENTS', 'MEDICAL_DOCUMENTS', 'INVOLUNTARY_UNEMPLOYMENT_EVIDENCE') NOT NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NOT NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(255) NOT NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_legal_representative\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`cpf\` varchar(255) NULL, \`birth_date\` date NULL, \`legal_representative_relationship\` varchar(255) NULL, \`is_minor_under_guardianship\` tinyint NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_period_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` varchar(255) NULL, \`payment_date\` date NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`analysis\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`death_benefit_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` enum ('EMPREGADO_URBANO', 'EMPREGADO_RURAL', 'EMPREGO_DOMESTICO', 'TRABALHADOR_AVULSO', 'CONTRIBUINTE_INDIVIDUAL_AUTONOMO', 'CONTRIBUINTE_INDIVIDUAL_PRESTADOR', 'MEI', 'SEGURADO_ESPECIAL', 'SEGURADO_FACULTATIVO') NOT NULL, \`is_pendency\` tinyint NOT NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` enum ('LEAVE_DATE', 'COMPETENCE_BELOW_MINIMUM', 'INCONSISTENT_COMPETENCE') NULL, \`type_of_contribution\` varchar(255) NULL, \`status\` tinyint NOT NULL, \`period_consideration\` enum ('SIM', 'NAO', 'PROVISORIO') NULL, \`contribution_average\` decimal(10,2) NULL, \`bond_origin\` varchar(255) NULL, \`death_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`death_benefit_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`death_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`death_benefit_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_af919fd213b359b34087b62a78\` (\`death_benefit_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_disability_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('MEDICAL_REPORT', 'COMPLEMENTARY_EXAMS', 'PREVIOUS_BENEFITS', 'VOCATIONAL_REHABILITATION') NOT NULL, \`disability_retirement_planning_grant_disability_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_disability_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_degree\` enum ('LEVE', 'MODERADO', 'GRAVE') NOT NULL, \`disability_category\` enum ('SENSORIAL', 'FISICO', 'MENTAL_OU_INTELECTUAL') NOT NULL, \`disability_description\` longtext NOT NULL, \`daily_impact\` longtext NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`cid_ten_id\` varchar(50) NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('CNIS') NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(100) NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`disability_retirement_planning_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` varchar(255) NULL, \`payment_date\` date NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`analysis\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`disability_retirement_planning_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` enum ('EMPREGADO_URBANO', 'EMPREGADO_RURAL', 'EMPREGO_DOMESTICO', 'TRABALHADOR_AVULSO', 'CONTRIBUINTE_INDIVIDUAL_AUTONOMO', 'CONTRIBUINTE_INDIVIDUAL_PRESTADOR', 'MEI', 'SEGURADO_ESPECIAL', 'SEGURADO_FACULTATIVO') NOT NULL, \`is_pendency\` tinyint NOT NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` enum ('LEAVE_DATE', 'COMPETENCE_BELOW_MINIMUM', 'INCONSISTENT_COMPETENCE') NULL, \`type_of_contribution\` varchar(255) NULL, \`status\` tinyint NOT NULL, \`disability_status\` enum ('LEVE', 'MODERADO', 'GRAVE') NULL, \`period_consideration\` enum ('SIM', 'NAO', 'PROVISORIO') NULL, \`contribution_average\` decimal(10,2) NULL, \`bond_origin\` varchar(255) NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`complete_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_time_accelerator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('TEMPO_RURAL', 'SERVICO_MILITAR', 'SERVICO_PUBLICO', 'CTPS', 'ALUNO_APRENDIZ', 'TRABALHO_NO_EXTERIOR', 'TRABALHO_INFORMAL', 'SENTENCA_TRABALHISTA') NOT NULL, \`recognition_inss\` enum ('PROVAVEL', 'IMPROVAVEL') NOT NULL, \`recognition_judicial\` enum ('FAVORAVEL', 'DESFAVORAVEL', 'NAO') NOT NULL, \`viability\` enum ('ALTA', 'MEDIA', 'BAIXA') NOT NULL, \`technical_note\` longtext NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`institution\` varchar(255) NULL, \`affects_qualifying_period\` tinyint NOT NULL, \`disability_retirement_planning_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category\` enum ('EMPREGADO_URBANO', 'EMPREGADO_RURAL', 'EMPREGO_DOMESTICO', 'TRABALHADOR_AVULSO', 'CONTRIBUINTE_INDIVIDUAL_AUTONOMO', 'CONTRIBUINTE_INDIVIDUAL_PRESTADOR', 'MEI', 'SEGURADO_ESPECIAL', 'SEGURADO_FACULTATIVO') NOT NULL, \`analysis_name\` varchar(255) NULL, \`long_prize_disability\` tinyint NOT NULL, \`disability_retirement_planning_grant_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_e01eb46945d56b38e24ab445a0\` (\`disability_retirement_planning_grant_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(500) NOT NULL, \`type\` enum ('ctc_document', 'administrative_process') NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`benefit_number\` varchar(100) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_disability_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(500) NOT NULL, \`type\` varchar(50) NOT NULL, \`disability_retirement_planning_period_disability_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_disability\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`disability_degree\` enum ('leve', 'moderado', 'grave') NOT NULL, \`disability_category\` enum ('mental_ou_intelectual', 'fisica', 'sensorial') NOT NULL, \`disability_type\` enum ('total', 'parcial', 'nenhum') NOT NULL, \`disability_description\` text NOT NULL, \`activity_impact\` text NOT NULL, \`disability_retirement_planning_period_id\` varchar(36) NULL, \`cid_ten_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_special_time_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(500) NOT NULL, \`type\` varchar(50) NOT NULL, \`disability_retirement_planning_period_special_time_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_special_time\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`special_period_type\` enum ('total', 'parcial', 'nenhum') NOT NULL, \`disability_retirement_planning_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`job_position\` varchar(255) NOT NULL, \`career_name\` varchar(255) NOT NULL, \`service_type\` enum ('comum', 'especial', 'tempo_de_pcd', 'averbacao_tempo_comum_rgps', 'averbacao_tempo_especial_rgps', 'averbacao_tempo_de_pcd_rgps', 'outros') NOT NULL, \`department\` varchar(255) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_remuneration\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`remuneration_date\` date NOT NULL, \`remuneration_amount\` decimal(15,2) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_retirement_planning_complete_analysis\` longtext NULL, \`disability_retirement_planning_simplified_analysis\` longtext NULL, \`disability_retirement_planning_complete_analysis_download\` longtext NULL, \`disability_retirement_planning_id\` varchar(36) NULL, UNIQUE INDEX \`REL_e2a966ef33036855d12187034c\` (\`disability_retirement_planning_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`current_position\` varchar(255) NOT NULL, \`federative_entity\` enum ('state', 'municipality', 'union', 'federal_district') NOT NULL, \`state\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NULL, \`municipality\` varchar(255) NULL, \`public_service_start_date\` date NULL, \`career_start_date\` date NULL, \`analysis_name\` varchar(255) NULL, \`long_time_disability\` tinyint NOT NULL, \`administrative_process_analysis\` longtext NULL, \`disability_retirement_planning_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_b111c1afd93ea457abc5f7b851\` (\`disability_retirement_planning_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period_item_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` longtext NOT NULL, \`teacher_retirement_planning_period_item_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period_item\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`institution_name\` varchar(255) NOT NULL, \`institution_type\` enum ('private', 'public') NOT NULL, \`education_level\` enum ('early_childhood', 'elementary', 'high_school') NOT NULL, \`role_performed\` enum ('classroom', 'principal', 'coordinator') NOT NULL, \`teacher_retirement_planning_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`position_name\` varchar(255) NOT NULL, \`career_name\` varchar(255) NOT NULL, \`service_type\` enum ('common', 'special', 'disability', 'teacher', 'rgps_ctc') NOT NULL, \`department\` varchar(255) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_remuneration\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contribution_date\` date NOT NULL, \`amount\` decimal(15,2) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`teacher_retirement_planning_complete_analysis\` longtext NULL, \`teacher_retirement_planning_simplified_analysis\` longtext NULL, \`teacher_retirement_planning_complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`federative_entity\` enum ('state', 'municipality', 'union', 'federal_district') NOT NULL, \`state\` varchar(2) NULL, \`municipality\` varchar(255) NULL, \`analysis_name\` varchar(255) NULL, \`current_position\` varchar(255) NULL, \`activity_type\` enum ('classroom_only', 'classroom_and_pedagogical_function', 'no_teaching_activity') NOT NULL, \`public_service_start_date\` date NOT NULL, \`career_start_date\` date NOT NULL, \`administrative_process_analysis\` longtext NULL, \`teacher_retirement_planning_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_5490dafb2d15ebb5d70278f690\` (\`teacher_retirement_planning_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`mini_advisor\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`client_situation\` enum ('is_working', 'have_worked', 'never_worked', 'is_sick_or_disabled', 'is_disabled_person', 'is_dependent_of_deceased_person', 'other') NOT NULL, \`client_age\` int NOT NULL, \`client_gender\` enum ('male', 'female') NOT NULL, \`client_work_history\` text NOT NULL, \`has_contributed_with_inss\` tinyint NOT NULL, \`client_has_disability_or_limitations\` tinyint NOT NULL, \`mini_advisor_result_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, UNIQUE INDEX \`REL_fea0a11952be84335fd11f985e\` (\`mini_advisor_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`mini_advisor_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`chosen_analysis\` enum ('concessao_aposentadoria_urbana_geral', 'planejamento_aposentadoria_para_deficiente', 'planejamento_previdenciario_professor', 'aposentadoria_categoria_especial', 'RURAL_OR_HYBRID_RETIREMENT', 'PERMANENT_DISABILITY_RETIREMENT_PLANNING', 'TEMPORARY_DISABILITY_RETIREMENT_PLANNING', 'ACCIDENT_RETIREMENT_PLANNING', 'DEATH_PENSION_RETIREMENT_PLANNING', 'MATERNITY_PAY_RETIREMENT_PLANNING', 'ELDERLY_BPC_RETIREMENT_PLANNING', 'DISABILITY_BPC_RETIREMENT_PLANNING') NOT NULL, \`benefit_description\` text NULL, \`attention_note\` text NULL, \`mini_advisor_id\` varchar(36) NULL, UNIQUE INDEX \`REL_7f01efa1a258c732ceaea0411e\` (\`mini_advisor_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`regulatory_update_email_preference\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email_enabled\` tinyint NOT NULL DEFAULT 0, \`customer_id\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_regulatory_update_email_preference_customer_id\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`regulatory_update_main_change\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`description\` text NOT NULL, \`order\` int NOT NULL DEFAULT '0', \`regulatory_update_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organization_logo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP COLUMN \`bucket_key\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP COLUMN \`original_file_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_category_retirement_analysis\` DROP COLUMN \`current_workflow_step_index\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`special_retirement_grant_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD \`file_name\` varchar(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` ADD \`sequencial\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` ADD \`valid_contribution_time\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD \`sequencial\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`death_benefit_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS', 'MINI_ADVISOR_COMPLETE_ANALYSIS', 'MINI_ADVISOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS', 'REGULATORY_UPDATES') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` ADD UNIQUE INDEX \`IDX_577aff594ba31e473b56b7acb9\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD UNIQUE INDEX \`IDX_cfbbaafae7a8df980f0f21a2a3\` (\`support_attendant_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rpps_period_document\` CHANGE \`document_type\` \`document_type\` enum ('ctc_document', 'ppp', 'ctps', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` CHANGE \`document_type\` \`document_type\` enum ('ctc_document', 'ppp', 'ctps', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` CHANGE \`career_start_date\` \`career_start_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` CHANGE \`public_service_start_date\` \`public_service_start_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'planejamento_previdenciario_professor', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_para_deficiente', 'beneficio_morte') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_de48ccd1c2a2087b6f247f298d\` (\`teacher_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_a11ef687a9c70fdd9d958e2942\` (\`disability_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD UNIQUE INDEX \`IDX_bbac27ff0cadcd7095f36ce711\` (\`bank_external_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`status\` enum ('PENDING', 'BANK_PROCESSING', 'DONE', 'CANCELLED', 'FAILED') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`pix_address_key_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`pix_address_key_type\` enum ('cpf', 'cnpj', 'email', 'phone', 'random') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` CHANGE \`organization_customization_document_header_template_id\` \`organization_customization_document_header_template_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` CHANGE \`organization_customization_document_footer_template_id\` \`organization_customization_document_footer_template_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD UNIQUE INDEX \`IDX_978e4a75b0628fcaa0bfc4cb5b\` (\`config\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_cfbbaafae7a8df980f0f21a2a3\` ON \`auth_identity\` (\`support_attendant_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_de48ccd1c2a2087b6f247f298d\` ON \`analysis_tool_record\` (\`teacher_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_a11ef687a9c70fdd9d958e2942\` ON \`analysis_tool_record\` (\`disability_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD CONSTRAINT \`FK_4074eb5df41d29d371cea803dbc\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` ADD CONSTRAINT \`FK_113b18d754bd72377193f6b1c17\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` ADD CONSTRAINT \`FK_1df3cf4511525993df0b77f8b79\` FOREIGN KEY (\`sender_auth_identity_id\`) REFERENCES \`auth_identity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_39fc5f2a0361478d67bbbd5a7ea\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_d1f904355ae45745907e1ad5564\` FOREIGN KEY (\`requester_auth_identity_id\`) REFERENCES \`auth_identity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_212190f336811c90d27f245a9a2\` FOREIGN KEY (\`assigned_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD CONSTRAINT \`FK_cfbbaafae7a8df980f0f21a2a35\` FOREIGN KEY (\`support_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_benefit_institutor\` ADD CONSTRAINT \`FK_3c5281b0bce9795577dd4dd15ab\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_dependent\` ADD CONSTRAINT \`FK_fdd64eeec05d40c671003ac8279\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_dependent_document\` ADD CONSTRAINT \`FK_08287d82a763d1d9c61fb5050bd\` FOREIGN KEY (\`death_benefit_dependent_id\`) REFERENCES \`death_benefit_dependent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_document\` ADD CONSTRAINT \`FK_f17e5b74381044b36a7619167b8\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_inss_benefit\` ADD CONSTRAINT \`FK_0389fafe1ecfba45912cf30bcf2\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_legal_proceeding\` ADD CONSTRAINT \`FK_77a97c86805f1ffc6481669bd7d\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_legal_representative\` ADD CONSTRAINT \`FK_3184400afeea1a608f7661c2c85\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period_earnings_history\` ADD CONSTRAINT \`FK_c59a83ed7d44db8d58997464ebe\` FOREIGN KEY (\`death_benefit_period_id\`) REFERENCES \`death_benefit_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period\` ADD CONSTRAINT \`FK_4f4f680f2046f13308de51d6091\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period_document\` ADD CONSTRAINT \`FK_9f98831cd6716c6f36f528585ec\` FOREIGN KEY (\`death_benefit_period_id\`) REFERENCES \`death_benefit_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit\` ADD CONSTRAINT \`FK_af919fd213b359b34087b62a78c\` FOREIGN KEY (\`death_benefit_result_id\`) REFERENCES \`death_benefit_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period_document\` ADD CONSTRAINT \`FK_a17c85655354f8fc894cdc428e6\` FOREIGN KEY (\`disability_retirement_planning_grant_disability_period_id\`) REFERENCES \`disability_retirement_planning_grant_disability_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period\` ADD CONSTRAINT \`FK_f4eeb9568b97846552caa7daa2b\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_document\` ADD CONSTRAINT \`FK_0d09c38b950a5d9375bc0e56ff7\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_inss_benefit\` ADD CONSTRAINT \`FK_1b6b36f2a052c9c39fb2070c542\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_legal_proceeding\` ADD CONSTRAINT \`FK_7d2a31f4f32b81929ca92e57841\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_document\` ADD CONSTRAINT \`FK_01286dee51034a4d9ca36d554d8\` FOREIGN KEY (\`disability_retirement_planning_grant_period_id\`) REFERENCES \`disability_retirement_planning_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_earnings_history\` ADD CONSTRAINT \`FK_7cec18c7b75a792b7ef48219c72\` FOREIGN KEY (\`disability_retirement_planning_grant_period_id\`) REFERENCES \`disability_retirement_planning_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period\` ADD CONSTRAINT \`FK_8b0953dce38e733aad3c2b279f5\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_time_accelerator\` ADD CONSTRAINT \`FK_d7aa70164713ebce108a0772957\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant\` ADD CONSTRAINT \`FK_e01eb46945d56b38e24ab445a00\` FOREIGN KEY (\`disability_retirement_planning_grant_result_id\`) REFERENCES \`disability_retirement_planning_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_document\` ADD CONSTRAINT \`FK_25ff45060081bc1f21612162545\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_inss_benefit\` ADD CONSTRAINT \`FK_c54e0d73ea5eee010607750f2f6\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_legal_proceeding\` ADD CONSTRAINT \`FK_93d315a1e03faee4ead93c642e6\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability_document\` ADD CONSTRAINT \`FK_3963237e6f03ccd2fa598e40302\` FOREIGN KEY (\`disability_retirement_planning_period_disability_id\`) REFERENCES \`disability_retirement_planning_period_disability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` ADD CONSTRAINT \`FK_d545cc333ea61dd1ce9a5af4a76\` FOREIGN KEY (\`disability_retirement_planning_period_id\`) REFERENCES \`disability_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` ADD CONSTRAINT \`FK_b205ea894cca82a9cd61b9ae332\` FOREIGN KEY (\`cid_ten_id\`) REFERENCES \`cid_ten\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time_document\` ADD CONSTRAINT \`FK_f5ee414426e28fa5b1a2c2ffa1b\` FOREIGN KEY (\`disability_retirement_planning_period_special_time_id\`) REFERENCES \`disability_retirement_planning_period_special_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time\` ADD CONSTRAINT \`FK_eae8f709d84f24cf350ab87d6a0\` FOREIGN KEY (\`disability_retirement_planning_period_id\`) REFERENCES \`disability_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period\` ADD CONSTRAINT \`FK_52a6d25e0f0f5c9483e9a3874bb\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_remuneration\` ADD CONSTRAINT \`FK_68d222b182c48f73000090c6a63\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_result\` ADD CONSTRAINT \`FK_e2a966ef33036855d12187034cb\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning\` ADD CONSTRAINT \`FK_b111c1afd93ea457abc5f7b8518\` FOREIGN KEY (\`disability_retirement_planning_result_id\`) REFERENCES \`disability_retirement_planning_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_document\` ADD CONSTRAINT \`FK_5a7ef6d0bc6405f3e1862a59cc6\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_inss_benefit\` ADD CONSTRAINT \`FK_c3334211119f55686f6c82f4467\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_legal_proceeding\` ADD CONSTRAINT \`FK_b99de22ec91a8eb020729508a10\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item_document\` ADD CONSTRAINT \`FK_f390dcfeaecee81c424c6c858e0\` FOREIGN KEY (\`teacher_retirement_planning_period_item_id\`) REFERENCES \`teacher_retirement_planning_period_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item\` ADD CONSTRAINT \`FK_1d4aa88a09fcc00b5195c805f9f\` FOREIGN KEY (\`teacher_retirement_planning_period_id\`) REFERENCES \`teacher_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period\` ADD CONSTRAINT \`FK_dda5b7c7d2034d4c63a53d748c6\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_remuneration\` ADD CONSTRAINT \`FK_d50a70e85425e4136767cf47bb4\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning\` ADD CONSTRAINT \`FK_5490dafb2d15ebb5d70278f6906\` FOREIGN KEY (\`teacher_retirement_planning_result_id\`) REFERENCES \`teacher_retirement_planning_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_de48ccd1c2a2087b6f247f298d0\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_f0b4ad9f4cd67248599cf1ce0cd\` FOREIGN KEY (\`special_category_retirement_analysis_id\`) REFERENCES \`special_category_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_a11ef687a9c70fdd9d958e29426\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_5ba08a6a6b94463435e2e8869a1\` FOREIGN KEY (\`disability_retirement_planning_grant_id\`) REFERENCES \`disability_retirement_planning_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_40b7c5c5f6f722d303f7866fb10\` FOREIGN KEY (\`death_benefit_id\`) REFERENCES \`death_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_d1ca0140d8785f268c506bd8f84\` FOREIGN KEY (\`general_urban_retirement_grant_id\`) REFERENCES \`general_urban_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_cdb9ee6d20c2c9321c1af765fe0\` FOREIGN KEY (\`general_urban_retirement_analysis_id\`) REFERENCES \`general_urban_retirement_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_2ab4573af98d7e827bf6213b2b8\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_b811bd3446d4db48dad7026edd5\` FOREIGN KEY (\`payment_plan_id\`) REFERENCES \`payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` ADD CONSTRAINT \`FK_cdcadabf9ba0c6d88a8c42919da\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_ae60525ed1774c20a42f4f2f605\` FOREIGN KEY (\`organization_payment_plan_id\`) REFERENCES \`organization_payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_f51031e36f0605a286112196270\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_3fb985a8187f6c57d5934efb2d4\` FOREIGN KEY (\`affiliate_plan_commission_id\`) REFERENCES \`organization_payment_plan_affiliate_commission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_6082612e99aa862778466d32240\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_94e55182e874bc01e53e28802aa\` FOREIGN KEY (\`bank_transfer_id\`) REFERENCES \`bank_transfer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_fea0a11952be84335fd11f985ee\` FOREIGN KEY (\`mini_advisor_result_id\`) REFERENCES \`mini_advisor_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_c4e818f423b649caa08ee369d67\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_0e3d6aa12714170d67742627e08\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor_result\` ADD CONSTRAINT \`FK_7f01efa1a258c732ceaea0411e8\` FOREIGN KEY (\`mini_advisor_id\`) REFERENCES \`mini_advisor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_3eea7102eb4cb4ab6760639ba14\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_212ab4b919e3768f0e7901a8baa\` FOREIGN KEY (\`organization_customization_document_header_template_id\`) REFERENCES \`organization_customization_document_header_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_d42985ae3fc301782b3ce59a35e\` FOREIGN KEY (\`organization_customization_document_footer_template_id\`) REFERENCES \`organization_customization_document_footer_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_email_preference\` ADD CONSTRAINT \`FK_17b18be46727c736d811578757e\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_main_change\` ADD CONSTRAINT \`FK_97767b8764de4637860e9e5ae63\` FOREIGN KEY (\`regulatory_update_id\`) REFERENCES \`regulatory_update\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_0776c71822610268a496c6aa97f\` FOREIGN KEY (\`organization_member_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_5479b7995c855c2fbda876abaf4\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_07f78e1097a36a30ed392c63433\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` ADD CONSTRAINT \`FK_56e0785dbf491218d3bd1884e0e\` FOREIGN KEY (\`sent_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_300809a30a4494b6ac4a46cf40b\` FOREIGN KEY (\`customer_email_sent_id\`) REFERENCES \`customer_email_sent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_b05f74cf323366c306bf22265a9\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_template\` ADD CONSTRAINT \`FK_68ab5117677e3cb496f1ca5ff63\` FOREIGN KEY (\`owner_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`email_template\` DROP FOREIGN KEY \`FK_68ab5117677e3cb496f1ca5ff63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_b05f74cf323366c306bf22265a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_300809a30a4494b6ac4a46cf40b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` DROP FOREIGN KEY \`FK_56e0785dbf491218d3bd1884e0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_07f78e1097a36a30ed392c63433\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_5479b7995c855c2fbda876abaf4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_0776c71822610268a496c6aa97f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_main_change\` DROP FOREIGN KEY \`FK_97767b8764de4637860e9e5ae63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_email_preference\` DROP FOREIGN KEY \`FK_17b18be46727c736d811578757e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_d42985ae3fc301782b3ce59a35e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_212ab4b919e3768f0e7901a8baa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_3eea7102eb4cb4ab6760639ba14\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor_result\` DROP FOREIGN KEY \`FK_7f01efa1a258c732ceaea0411e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP FOREIGN KEY \`FK_0e3d6aa12714170d67742627e08\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP FOREIGN KEY \`FK_c4e818f423b649caa08ee369d67\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP FOREIGN KEY \`FK_fea0a11952be84335fd11f985ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_94e55182e874bc01e53e28802aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_6082612e99aa862778466d32240\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_3fb985a8187f6c57d5934efb2d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_f51031e36f0605a286112196270\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_ae60525ed1774c20a42f4f2f605\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` DROP FOREIGN KEY \`FK_cdcadabf9ba0c6d88a8c42919da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_b811bd3446d4db48dad7026edd5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_2ab4573af98d7e827bf6213b2b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_cdb9ee6d20c2c9321c1af765fe0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_d1ca0140d8785f268c506bd8f84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_40b7c5c5f6f722d303f7866fb10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_5ba08a6a6b94463435e2e8869a1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_a11ef687a9c70fdd9d958e29426\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_f0b4ad9f4cd67248599cf1ce0cd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_de48ccd1c2a2087b6f247f298d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning\` DROP FOREIGN KEY \`FK_5490dafb2d15ebb5d70278f6906\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_remuneration\` DROP FOREIGN KEY \`FK_d50a70e85425e4136767cf47bb4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period\` DROP FOREIGN KEY \`FK_dda5b7c7d2034d4c63a53d748c6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item\` DROP FOREIGN KEY \`FK_1d4aa88a09fcc00b5195c805f9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item_document\` DROP FOREIGN KEY \`FK_f390dcfeaecee81c424c6c858e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_legal_proceeding\` DROP FOREIGN KEY \`FK_b99de22ec91a8eb020729508a10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_inss_benefit\` DROP FOREIGN KEY \`FK_c3334211119f55686f6c82f4467\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_document\` DROP FOREIGN KEY \`FK_5a7ef6d0bc6405f3e1862a59cc6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning\` DROP FOREIGN KEY \`FK_b111c1afd93ea457abc5f7b8518\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_result\` DROP FOREIGN KEY \`FK_e2a966ef33036855d12187034cb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_remuneration\` DROP FOREIGN KEY \`FK_68d222b182c48f73000090c6a63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period\` DROP FOREIGN KEY \`FK_52a6d25e0f0f5c9483e9a3874bb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time\` DROP FOREIGN KEY \`FK_eae8f709d84f24cf350ab87d6a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time_document\` DROP FOREIGN KEY \`FK_f5ee414426e28fa5b1a2c2ffa1b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` DROP FOREIGN KEY \`FK_b205ea894cca82a9cd61b9ae332\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` DROP FOREIGN KEY \`FK_d545cc333ea61dd1ce9a5af4a76\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability_document\` DROP FOREIGN KEY \`FK_3963237e6f03ccd2fa598e40302\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_legal_proceeding\` DROP FOREIGN KEY \`FK_93d315a1e03faee4ead93c642e6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_inss_benefit\` DROP FOREIGN KEY \`FK_c54e0d73ea5eee010607750f2f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_document\` DROP FOREIGN KEY \`FK_25ff45060081bc1f21612162545\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant\` DROP FOREIGN KEY \`FK_e01eb46945d56b38e24ab445a00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_time_accelerator\` DROP FOREIGN KEY \`FK_d7aa70164713ebce108a0772957\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period\` DROP FOREIGN KEY \`FK_8b0953dce38e733aad3c2b279f5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_earnings_history\` DROP FOREIGN KEY \`FK_7cec18c7b75a792b7ef48219c72\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_document\` DROP FOREIGN KEY \`FK_01286dee51034a4d9ca36d554d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_7d2a31f4f32b81929ca92e57841\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_inss_benefit\` DROP FOREIGN KEY \`FK_1b6b36f2a052c9c39fb2070c542\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_document\` DROP FOREIGN KEY \`FK_0d09c38b950a5d9375bc0e56ff7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period\` DROP FOREIGN KEY \`FK_f4eeb9568b97846552caa7daa2b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_disability_period_document\` DROP FOREIGN KEY \`FK_a17c85655354f8fc894cdc428e6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit\` DROP FOREIGN KEY \`FK_af919fd213b359b34087b62a78c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period_document\` DROP FOREIGN KEY \`FK_9f98831cd6716c6f36f528585ec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period\` DROP FOREIGN KEY \`FK_4f4f680f2046f13308de51d6091\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_period_earnings_history\` DROP FOREIGN KEY \`FK_c59a83ed7d44db8d58997464ebe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_legal_representative\` DROP FOREIGN KEY \`FK_3184400afeea1a608f7661c2c85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_legal_proceeding\` DROP FOREIGN KEY \`FK_77a97c86805f1ffc6481669bd7d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_inss_benefit\` DROP FOREIGN KEY \`FK_0389fafe1ecfba45912cf30bcf2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_document\` DROP FOREIGN KEY \`FK_f17e5b74381044b36a7619167b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_dependent_document\` DROP FOREIGN KEY \`FK_08287d82a763d1d9c61fb5050bd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_dependent\` DROP FOREIGN KEY \`FK_fdd64eeec05d40c671003ac8279\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`death_benefit_benefit_institutor\` DROP FOREIGN KEY \`FK_3c5281b0bce9795577dd4dd15ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP FOREIGN KEY \`FK_cfbbaafae7a8df980f0f21a2a35\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_212190f336811c90d27f245a9a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_d1f904355ae45745907e1ad5564\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_39fc5f2a0361478d67bbbd5a7ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` DROP FOREIGN KEY \`FK_1df3cf4511525993df0b77f8b79\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` DROP FOREIGN KEY \`FK_113b18d754bd72377193f6b1c17\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP FOREIGN KEY \`FK_4074eb5df41d29d371cea803dbc\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a11ef687a9c70fdd9d958e2942\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_de48ccd1c2a2087b6f247f298d\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_cfbbaafae7a8df980f0f21a2a3\` ON \`auth_identity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP INDEX \`IDX_978e4a75b0628fcaa0bfc4cb5b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`deleted_at\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_config\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` CHANGE \`organization_customization_document_footer_template_id\` \`organization_customization_document_footer_template_id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` CHANGE \`organization_customization_document_header_template_id\` \`organization_customization_document_header_template_id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`deleted_at\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`deleted_at\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`pix_address_key_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`pix_address_key_type\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`status\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP INDEX \`IDX_bbac27ff0cadcd7095f36ce711\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`deleted_at\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bank_transfer\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_a11ef687a9c70fdd9d958e2942\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_de48ccd1c2a2087b6f247f298d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'gerador_discurso', 'avaliacao_deficiencia_para_bpc', 'analise_renda_per_capita_para_bpc', 'analise_linha_tempo_rural', 'gerador_perguntas_audiencia', 'analise_qualidade_segurado', 'planejamento_aposentadoria_para_deficiente', 'concessao_aposentadoria_urbana_geral', 'analise_aposentadoria_urbana_geral', 'aposentadoria_categoria_especial', 'concessao_aposentadoria_especial') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` CHANGE \`public_service_start_date\` \`public_service_start_date\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis\` CHANGE \`career_start_date\` \`career_start_date\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_analysis_period_document\` CHANGE \`document_type\` \`document_type\` enum ('ctc_document', 'ppp', 'cpts', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rpps_period_document\` CHANGE \`document_type\` \`document_type\` enum ('ctc_document', 'ppp', 'cpts', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP INDEX \`IDX_cfbbaafae7a8df980f0f21a2a3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_attendant\` DROP INDEX \`IDX_577aff594ba31e473b56b7acb9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum ('MINI_ADVISOR_COMPLETE_ANALYSIS', 'MINI_ADVISOR_SIMPLIFIED_ANALYSIS', 'REGULATORY_UPDATES', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_COMPLETE_ANALYSIS', 'LEGAL_PLEADING_SIMPLIFIED_ANALYSIS', 'LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS', 'RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS', 'CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS', 'LEGAL_PROCEEDING_MONITORING', 'ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS', 'ELOY_CHAT_LEGISLATION_QUESTIONS', 'ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH', 'ELOY_CHAT_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS', 'RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS', 'RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS', 'SPECIAL_ACTIVITY_COMPLETE_ANALYSIS', 'SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS', 'JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS', 'MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS', 'MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS', 'SPEECH_GENERATOR_COMPLETE_ANALYSIS', 'SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS', 'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS', 'INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS', 'INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS', 'INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS', 'ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS', 'FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS', 'FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_COMPLETE_ANALYSIS', 'RURAL_TIMELINE_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS', 'AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS', 'RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS', 'GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS', 'GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS', 'RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION', 'TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS', 'DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS', 'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS', 'SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`death_benefit_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP COLUMN \`sequencial\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` DROP COLUMN \`valid_contribution_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period\` DROP COLUMN \`sequencial\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP COLUMN \`file_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`special_retirement_grant_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`special_category_retirement_analysis\` ADD \`current_workflow_step_index\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD \`original_file_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD \`bucket_key\` varchar(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD \`organization_logo\` varchar(255) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`regulatory_update_main_change\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_regulatory_update_email_preference_customer_id\` ON \`regulatory_update_email_preference\``,
    );
    await queryRunner.query(
      `DROP TABLE \`regulatory_update_email_preference\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_7f01efa1a258c732ceaea0411e\` ON \`mini_advisor_result\``,
    );
    await queryRunner.query(`DROP TABLE \`mini_advisor_result\``);
    await queryRunner.query(
      `DROP INDEX \`REL_fea0a11952be84335fd11f985e\` ON \`mini_advisor\``,
    );
    await queryRunner.query(`DROP TABLE \`mini_advisor\``);
    await queryRunner.query(
      `DROP INDEX \`REL_5490dafb2d15ebb5d70278f690\` ON \`teacher_retirement_planning\``,
    );
    await queryRunner.query(`DROP TABLE \`teacher_retirement_planning\``);
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_remuneration\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period_item\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period_item_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_b111c1afd93ea457abc5f7b851\` ON \`disability_retirement_planning\``,
    );
    await queryRunner.query(`DROP TABLE \`disability_retirement_planning\``);
    await queryRunner.query(
      `DROP INDEX \`REL_e2a966ef33036855d12187034c\` ON \`disability_retirement_planning_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_remuneration\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_special_time\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_special_time_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_disability\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_disability_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e01eb46945d56b38e24ab445a0\` ON \`disability_retirement_planning_grant\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_disability_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_disability_period_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_af919fd213b359b34087b62a78\` ON \`death_benefit\``,
    );
    await queryRunner.query(`DROP TABLE \`death_benefit\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_result\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_period_document\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_period\``);
    await queryRunner.query(
      `DROP TABLE \`death_benefit_period_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`death_benefit_legal_representative\``,
    );
    await queryRunner.query(`DROP TABLE \`death_benefit_legal_proceeding\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_inss_benefit\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_document\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_dependent_document\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_dependent\``);
    await queryRunner.query(`DROP TABLE \`death_benefit_benefit_institutor\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`UQ_acc_config\` ON \`affiliate_customer_config\` (\`config\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_rtccp_adjustment_period\` ON \`rural_timeline_cnis_contribution_period_adjustment\` (\`rural_timeline_cnis_contribution_period_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`UQ_abt_bank_payment\` ON \`affiliate_bank_transfer\` (\`bank_payment_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`UQ_opp_affiliate_commission_plan\` ON \`organization_payment_plan_affiliate_commission\` (\`organization_payment_plan_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`bank_external_id\` ON \`bank_transfer\` (\`bank_external_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\` (\`special_retirement_grant_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\` (\`general_urban_retirement_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_467461f25aaf1080665789dfd2\` ON \`analysis_tool_record\` (\`special_retirement_grant_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_d1ca0140d8785f268c506bd8f84\` ON \`analysis_tool_record\` (\`general_urban_retirement_grant_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_overdue_contribution_cnis_contribution_period\` ON \`rural_timeline_cnis_contribution_period_overdue_contribution\` (\`rural_timeline_cnis_contribution_period_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_cnis_contribution_period_document_period\` ON \`rural_timeline_cnis_contribution_period_document\` (\`rural_timeline_cnis_contribution_period_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_pending_exit_date_cnis_contribution_period\` ON \`rural_timeline_period_pending_exit_date\` (\`rural_timeline_cnis_contribution_period_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`UQ_auth_identity_support_attendant_id\` ON \`auth_identity\` (\`support_attendant_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`UQ_support_attendant_email\` ON \`support_attendant\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_template\` ADD CONSTRAINT \`FK_email_template_owner\` FOREIGN KEY (\`owner_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_customer_email_sent_attachment_customer_email_sent\` FOREIGN KEY (\`customer_email_sent_id\`) REFERENCES \`customer_email_sent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_customer_email_sent_attachment_analysis_tool_record\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` ADD CONSTRAINT \`FK_364942f94d78d35288f43ece6d7\` FOREIGN KEY (\`sent_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_organization_member\` FOREIGN KEY (\`organization_member_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_analysis_tool_record\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_analysis_tool_client\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_org_customization_organization\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_org_customization_header_template\` FOREIGN KEY (\`organization_customization_document_header_template_id\`) REFERENCES \`organization_customization_document_header_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_org_customization_footer_template\` FOREIGN KEY (\`organization_customization_document_footer_template_id\`) REFERENCES \`organization_customization_document_footer_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_commission\` FOREIGN KEY (\`affiliate_plan_commission_id\`) REFERENCES \`organization_payment_plan_affiliate_commission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_bank_transfer\` FOREIGN KEY (\`bank_transfer_id\`) REFERENCES \`bank_transfer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_bank_payment\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_opp_affiliate_commission_plan\` FOREIGN KEY (\`organization_payment_plan_id\`) REFERENCES \`organization_payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_opp_affiliate_commission_affiliate\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` ADD CONSTRAINT \`FK_affiliate_customer_customer_id\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_affiliate_customer_payment_plan_payment_plan_id\` FOREIGN KEY (\`payment_plan_id\`) REFERENCES \`payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_affiliate_customer_payment_plan_affiliate_customer_id\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_467461f25aaf1080665789dfd26\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD CONSTRAINT \`FK_auth_identity_support_attendant\` FOREIGN KEY (\`support_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_support_ticket_requester_auth_identity\` FOREIGN KEY (\`requester_auth_identity_id\`) REFERENCES \`auth_identity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_support_ticket_organization\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_support_ticket_assigned_attendant\` FOREIGN KEY (\`assigned_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` ADD CONSTRAINT \`FK_support_ticket_message_ticket\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` ADD CONSTRAINT \`FK_support_ticket_message_sender_auth_identity\` FOREIGN KEY (\`sender_auth_identity_id\`) REFERENCES \`auth_identity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD CONSTRAINT \`FK_support_ticket_attachment_ticket\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
