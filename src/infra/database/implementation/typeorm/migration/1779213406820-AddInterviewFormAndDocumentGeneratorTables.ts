import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterviewFormAndDocumentGeneratorTables1779213406820 implements MigrationInterface {
  name = 'AddInterviewFormAndDocumentGeneratorTables1779213406820';

  private async safeAddForeignKey(
    queryRunner: QueryRunner,
    tableName: string,
    constraintName: string,
    sql: string,
  ): Promise<void> {
    const result = await queryRunner.query(
      `SELECT COUNT(*) as count FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = ? AND CONSTRAINT_NAME = ?`,
      [tableName, constraintName],
    );
    if (Number(result[0].count) === 0) {
      await queryRunner.query(sql);
    }
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`interview_form\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`client_name\` varchar(255) NULL, \`client_cpf\` varchar(50) NULL, \`client_rg\` varchar(50) NULL, \`client_inss_password\` varchar(100) NULL, \`client_address\` varchar(500) NULL, \`client_profession\` varchar(255) NULL, \`client_nit\` varchar(50) NULL, \`client_ctps_number\` varchar(50) NULL, \`client_birth_date\` varchar(20) NULL, \`client_marital_status\` varchar(50) NULL, \`client_race\` varchar(50) NULL, \`client_phone_number\` varchar(50) NULL, \`client_mother_name\` varchar(255) NULL, \`client_father_name\` varchar(255) NULL, \`client_spouse_name\` varchar(255) NULL, \`client_email\` varchar(100) NULL, \`client_ctps\` varchar(50) NULL, \`client_has_disclosure\` tinyint NULL, \`client_has_rpc\` tinyint NULL, \`client_registration_date\` varchar(20) NULL, \`client_age\` varchar(20) NULL, \`client_neighborhood\` varchar(255) NULL, \`client_street\` varchar(255) NULL, \`client_street_number\` varchar(20) NULL, \`client_is_married_or_in_union\` tinyint NULL, \`client_has_children\` tinyint NULL, \`children_names\` text NULL, \`is_retired\` tinyint NULL, \`has_received_or_receives_social_security_benefit\` tinyint NULL, \`has_received_or_receives_welfare_benefit\` tinyint NULL, \`social_security_benefit_type\` varchar(100) NULL, \`social_security_benefit_number\` varchar(50) NULL, \`welfare_benefit_number\` varchar(50) NULL, \`desired_benefit_type\` enum ('AUXILIO_POR_INCAPACIDADE_TEMPORARIA', 'APOSENTADORIA_POR_INCAPACIDADE_PERMANENTE', 'AUXILIO_ACIDENTE', 'SALARIO_MATERNIDADE', 'PENSAO_POR_MORTE', 'APOSENTADORIA_URBANA_COMUM', 'APOSENTADORIA_RURAL_OU_HIBRIDA', 'APOSENTADORIA_DA_PESSOA_COM_DEFICIENCIA', 'APOSENTADORIA_DO_PROFESSOR', 'APOSENTADORIA_ESPECIAL', 'BPC_IDOSO', 'BPC_DEFICIENTE') NULL, \`has_social_security_debt\` tinyint NULL, \`social_security_debt_date\` varchar(20) NULL, \`social_security_debt_amount\` varchar(50) NULL, \`receives_bolsa_familia\` tinyint NULL, \`has_worked_in_special_activities\` tinyint NULL, \`special_activity_type\` varchar(255) NULL, \`special_activity_agent\` varchar(255) NULL, \`has_ppp_or_ltcat\` tinyint NULL, \`ppp_or_ltcat_details\` varchar(500) NULL, \`is_company_open_or_closed\` varchar(20) NULL, \`company_name\` varchar(255) NULL, \`has_worked_with_electricity\` tinyint NULL, \`has_worked_as_vigilante\` tinyint NULL, \`has_worked_exposed_to_excessive_noise\` tinyint NULL, \`has_worked_in_rural_area\` tinyint NULL, \`family_lived_in_rural_area_during_childhood\` tinyint NULL, \`has_worked_in_public_service\` tinyint NULL, \`has_held_public_office\` tinyint NULL, \`has_been_commissioned_by_public_administration\` tinyint NULL, \`has_been_hospitalized\` text NULL, \`has_health_problems\` text NULL, \`has_had_accident\` text NULL, \`has_had_work_accident\` text NULL, \`has_medical_treatment\` text NULL, \`takes_continuous_medication\` text NULL, \`buys_medication_from_popular_pharmacy\` tinyint NULL, \`medical_service_type\` enum ('SUS', 'PARTICULAR') NULL, \`attending_doctor_name\` varchar(255) NULL, \`treatment_location\` varchar(255) NULL, \`has_lab_reports\` tinyint NULL, \`has_medical_records\` tinyint NULL, \`has_accident_report\` text NULL, \`has_administrative_claim_with_inss\` text NULL, \`has_ongoing_lawsuit\` text NULL, \`has_previous_lawsuit\` text NULL, \`has_requested_administrative_or_judicial_review\` text NULL, \`has_rg_cpf_proof_of_residence\` tinyint NULL, \`has_pap_and_judicial_process_copy\` tinyint NULL, \`has_cnis_extract\` tinyint NULL, \`has_ppp_and_ltcat\` tinyint NULL, \`has_reservist_certificate\` tinyint NULL, \`has_rural_documents\` tinyint NULL, \`has_complete_ctps_copy\` tinyint NULL, \`has_public_administration_work_contract\` tinyint NULL, \`has_other_documents\` tinyint NULL, \`other_documents_description\` text NULL, \`analysis_tool_client_id\` varchar(36) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`fee_contract_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`fee_contract_generator_complete_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`jef_waiver_declaration_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`jef_waiver_declaration_generator_complete_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`poverty_declaration_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`poverty_declaration_generator_complete_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`power_of_attorney_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`power_of_attorney_generator_complete_analysis\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_93bdb64f535796b12676befef3b',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_93bdb64f535796b12676befef3b\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_5f48f3d21da2326dc3084bcd765',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_5f48f3d21da2326dc3084bcd765\` FOREIGN KEY (\`general_urban_retirement_denial_id\`) REFERENCES \`general_urban_retirement_denial\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_161119c21d96483f5d6d79e9c72',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_161119c21d96483f5d6d79e9c72\` FOREIGN KEY (\`disability_retirement_planning_rejection_id\`) REFERENCES \`disability_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_b2b640c0a73ecf4a3f6cb57c124',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_b2b640c0a73ecf4a3f6cb57c124\` FOREIGN KEY (\`retirement_permanent_disability_rejection_id\`) REFERENCES \`retirement_permanent_disability_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_525e0443c3beed697504ccabed6',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_525e0443c3beed697504ccabed6\` FOREIGN KEY (\`bpc_disability_grant_id\`) REFERENCES \`bpc_disability_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_d839be03e3ce21bd911d1add88e',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_d839be03e3ce21bd911d1add88e\` FOREIGN KEY (\`bpc_disability_denial_id\`) REFERENCES \`bpc_disability_denial\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_2e2cb32e1168368c156782d993d',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_2e2cb32e1168368c156782d993d\` FOREIGN KEY (\`bpc_elderly_analysis_id\`) REFERENCES \`bpc_elderly_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_0537095eb4deadf0665a1ed51d4',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_0537095eb4deadf0665a1ed51d4\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_d85d4cf01373ea25be0175450a0',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_d85d4cf01373ea25be0175450a0\` FOREIGN KEY (\`maternity_pay_rejection_id\`) REFERENCES \`maternity_pay_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_e2c6a1756f9f902c900f67cadae',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_e2c6a1756f9f902c900f67cadae\` FOREIGN KEY (\`temporary_incapacity_benefit_rejection_id\`) REFERENCES \`temporary_incapacity_benefit_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_7899d1f84a9f60b5c6f638499c4',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_7899d1f84a9f60b5c6f638499c4\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_e7c60d2dd653cb78bae7d718bf9',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_e7c60d2dd653cb78bae7d718bf9\` FOREIGN KEY (\`elderly_bpc_rejection_id\`) REFERENCES \`elderly_bpc_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_237a38463dd4b4d4fed8db1f6f6',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_237a38463dd4b4d4fed8db1f6f6\` FOREIGN KEY (\`maternity_pay_grant_id\`) REFERENCES \`maternity_pay_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_b123e2d397b2b3c9db19fdfea0e',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_b123e2d397b2b3c9db19fdfea0e\` FOREIGN KEY (\`teacher_retirement_planning_rejection_id\`) REFERENCES \`teacher_retirement_planning_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_9ae40c63b9379f0b255a3a48477',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_9ae40c63b9379f0b255a3a48477\` FOREIGN KEY (\`bpc_disability_termination_id\`) REFERENCES \`bpc_disability_termination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_4bf0d6a2aa0890f504095a69860',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_4bf0d6a2aa0890f504095a69860\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_5af99ee5a985818cff039d3c48e',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_5af99ee5a985818cff039d3c48e\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_2cae792050fd684546a36a3ef8e',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_2cae792050fd684546a36a3ef8e\` FOREIGN KEY (\`retirement_permanent_disability_revision_id\`) REFERENCES \`retirement_permanent_disability_revision\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_e6ee5e8d95d03bf65a427bdfa9d',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_e6ee5e8d95d03bf65a427bdfa9d\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_7c1280af9f78ec8754644652bf4',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_7c1280af9f78ec8754644652bf4\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'analysis_tool_record',
      'FK_60a4deb79c0a5025ad6919f732f',
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_60a4deb79c0a5025ad6919f732f\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'accident_assistance_terminated',
      'FK_9c14e626ecabe8689c5b2763347',
      `ALTER TABLE \`accident_assistance_terminated\` ADD CONSTRAINT \`FK_9c14e626ecabe8689c5b2763347\` FOREIGN KEY (\`accident_assistance_terminated_result_id\`) REFERENCES \`accident_assistance_terminated_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'accident_assistance_terminated',
      'FK_7ed740a71f28787c9ed73c944fd',
      `ALTER TABLE \`accident_assistance_terminated\` ADD CONSTRAINT \`FK_7ed740a71f28787c9ed73c944fd\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'accident_assistance_terminated',
      'FK_8ab9bd36f52690f29705635b776',
      `ALTER TABLE \`accident_assistance_terminated\` ADD CONSTRAINT \`FK_8ab9bd36f52690f29705635b776\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_customer_payment_plan',
      'FK_2ab4573af98d7e827bf6213b2b8',
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_2ab4573af98d7e827bf6213b2b8\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_customer_payment_plan',
      'FK_b811bd3446d4db48dad7026edd5',
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_b811bd3446d4db48dad7026edd5\` FOREIGN KEY (\`payment_plan_id\`) REFERENCES \`payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_customer',
      'FK_cdcadabf9ba0c6d88a8c42919da',
      `ALTER TABLE \`affiliate_customer\` ADD CONSTRAINT \`FK_cdcadabf9ba0c6d88a8c42919da\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_payment_plan_affiliate_commission',
      'FK_ae60525ed1774c20a42f4f2f605',
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_ae60525ed1774c20a42f4f2f605\` FOREIGN KEY (\`organization_payment_plan_id\`) REFERENCES \`organization_payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_payment_plan_affiliate_commission',
      'FK_f51031e36f0605a286112196270',
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_f51031e36f0605a286112196270\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_bank_transfer',
      'FK_3fb985a8187f6c57d5934efb2d4',
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_3fb985a8187f6c57d5934efb2d4\` FOREIGN KEY (\`affiliate_plan_commission_id\`) REFERENCES \`organization_payment_plan_affiliate_commission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_bank_transfer',
      'FK_6082612e99aa862778466d32240',
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_6082612e99aa862778466d32240\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'affiliate_bank_transfer',
      'FK_94e55182e874bc01e53e28802aa',
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_94e55182e874bc01e53e28802aa\` FOREIGN KEY (\`bank_transfer_id\`) REFERENCES \`bank_transfer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_pack_purchase',
      'FK_b1b7c551fbf2de09bfe4f32e8aa',
      `ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_b1b7c551fbf2de09bfe4f32e8aa\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_pack_purchase',
      'FK_d9a5bfe7715c71666f04a70b3bb',
      `ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_d9a5bfe7715c71666f04a70b3bb\` FOREIGN KEY (\`credit_pack_id\`) REFERENCES \`credit_pack\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_pack_purchase',
      'FK_c3ffb9efe979a695e45da4f073c',
      `ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_c3ffb9efe979a695e45da4f073c\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_grant_earnings_history',
      'FK_258da09d5778790d374906c8cff',
      `ALTER TABLE \`general_urban_retirement_grant_earnings_history\` ADD CONSTRAINT \`FK_258da09d5778790d374906c8cff\` FOREIGN KEY (\`general_urban_retirement_grant_period_id\`) REFERENCES \`general_urban_retirement_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_grant_earnings_history',
      'FK_8d41ed0c8db19562a65d1ae3b43',
      `ALTER TABLE \`general_urban_retirement_grant_earnings_history\` ADD CONSTRAINT \`FK_8d41ed0c8db19562a65d1ae3b43\` FOREIGN KEY (\`general_urban_retirement_grant_id\`) REFERENCES \`general_urban_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_grant_period_document',
      'FK_6905d73a0cfe17a4da0fb03012e',
      `ALTER TABLE \`general_urban_retirement_grant_period_document\` ADD CONSTRAINT \`FK_6905d73a0cfe17a4da0fb03012e\` FOREIGN KEY (\`general_urban_retirement_grant_period_id\`) REFERENCES \`general_urban_retirement_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_review_period_earnings_history',
      'FK_fc13c956463bf1fe98b18cf7776',
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` ADD CONSTRAINT \`FK_fc13c956463bf1fe98b18cf7776\` FOREIGN KEY (\`general_urban_retirement_review_period_id\`) REFERENCES \`general_urban_retirement_review_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_review_period_earnings_history',
      'FK_a7777d1d1177675064612098464',
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` ADD CONSTRAINT \`FK_a7777d1d1177675064612098464\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'general_urban_retirement_review_period_document',
      'FK_a37c7f738797c8cf1ce840fa9d2',
      `ALTER TABLE \`general_urban_retirement_review_period_document\` ADD CONSTRAINT \`FK_a37c7f738797c8cf1ce840fa9d2\` FOREIGN KEY (\`general_urban_retirement_review_period_id\`) REFERENCES \`general_urban_retirement_review_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'interview_form',
      'FK_b55d634c8f0500ab2d643435747',
      `ALTER TABLE \`interview_form\` ADD CONSTRAINT \`FK_b55d634c8f0500ab2d643435747\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'interview_form',
      'FK_f43072421681ab54ef564d8672f',
      `ALTER TABLE \`interview_form\` ADD CONSTRAINT \`FK_f43072421681ab54ef564d8672f\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'interview_form',
      'FK_ca4b2481254cce5f49bbfbe2eab',
      `ALTER TABLE \`interview_form\` ADD CONSTRAINT \`FK_ca4b2481254cce5f49bbfbe2eab\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection',
      'FK_01f86230ecd9d7b3df77d903eb2',
      `ALTER TABLE \`maternity_pay_rejection\` ADD CONSTRAINT \`FK_01f86230ecd9d7b3df77d903eb2\` FOREIGN KEY (\`maternity_pay_rejection_result_id\`) REFERENCES \`maternity_pay_rejection_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_document',
      'FK_fd267b3e4f43feca85a85f315aa',
      `ALTER TABLE \`maternity_pay_rejection_document\` ADD CONSTRAINT \`FK_fd267b3e4f43feca85a85f315aa\` FOREIGN KEY (\`maternity_pay_rejection_id\`) REFERENCES \`maternity_pay_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_inss_benefit',
      'FK_e6a9529a3041526abd51858f468',
      `ALTER TABLE \`maternity_pay_rejection_inss_benefit\` ADD CONSTRAINT \`FK_e6a9529a3041526abd51858f468\` FOREIGN KEY (\`maternity_pay_rejection_id\`) REFERENCES \`maternity_pay_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_legal_proceeding',
      'FK_13be8b5394803fa64430965526c',
      `ALTER TABLE \`maternity_pay_rejection_legal_proceeding\` ADD CONSTRAINT \`FK_13be8b5394803fa64430965526c\` FOREIGN KEY (\`maternity_pay_rejection_id\`) REFERENCES \`maternity_pay_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_work_period',
      'FK_5f1f19debb50eac9a2089282d3f',
      `ALTER TABLE \`maternity_pay_rejection_work_period\` ADD CONSTRAINT \`FK_5f1f19debb50eac9a2089282d3f\` FOREIGN KEY (\`maternity_pay_rejection_id\`) REFERENCES \`maternity_pay_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_work_period_document',
      'FK_af2973c4f449c034b88b5daecdb',
      `ALTER TABLE \`maternity_pay_rejection_work_period_document\` ADD CONSTRAINT \`FK_af2973c4f449c034b88b5daecdb\` FOREIGN KEY (\`maternity_pay_rejection_work_period_id\`) REFERENCES \`maternity_pay_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'maternity_pay_rejection_work_period_earnings_history',
      'FK_03776c7b4866d16e70354f26822',
      `ALTER TABLE \`maternity_pay_rejection_work_period_earnings_history\` ADD CONSTRAINT \`FK_03776c7b4866d16e70354f26822\` FOREIGN KEY (\`maternity_pay_rejection_work_period_id\`) REFERENCES \`maternity_pay_rejection_work_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'mini_advisor_result',
      'FK_7f01efa1a258c732ceaea0411e8',
      `ALTER TABLE \`mini_advisor_result\` ADD CONSTRAINT \`FK_7f01efa1a258c732ceaea0411e8\` FOREIGN KEY (\`mini_advisor_id\`) REFERENCES \`mini_advisor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'mini_advisor',
      'FK_fea0a11952be84335fd11f985ee',
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_fea0a11952be84335fd11f985ee\` FOREIGN KEY (\`mini_advisor_result_id\`) REFERENCES \`mini_advisor_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'mini_advisor',
      'FK_c4e818f423b649caa08ee369d67',
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_c4e818f423b649caa08ee369d67\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'mini_advisor',
      'FK_0e3d6aa12714170d67742627e08',
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_0e3d6aa12714170d67742627e08\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_purchase',
      'FK_32de382d298a541c80fddee31d3',
      `ALTER TABLE \`organization_credit_purchase\` ADD CONSTRAINT \`FK_32de382d298a541c80fddee31d3\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_purchase',
      'FK_047167a78a1dac16f86e5948f17',
      `ALTER TABLE \`organization_credit_purchase\` ADD CONSTRAINT \`FK_047167a78a1dac16f86e5948f17\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_usage',
      'FK_db20475add2e374dd952d48ae92',
      `ALTER TABLE \`organization_credit_usage\` ADD CONSTRAINT \`FK_db20475add2e374dd952d48ae92\` FOREIGN KEY (\`payment_plan_paid_resource_id\`) REFERENCES \`payment_plan_paid_resource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_credit_usage',
      'FK_abdf40aa47ff13eb674d32f0ef7',
      `ALTER TABLE \`organization_credit_usage\` ADD CONSTRAINT \`FK_abdf40aa47ff13eb674d32f0ef7\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_customization',
      'FK_3eea7102eb4cb4ab6760639ba14',
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_3eea7102eb4cb4ab6760639ba14\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_customization',
      'FK_212ab4b919e3768f0e7901a8baa',
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_212ab4b919e3768f0e7901a8baa\` FOREIGN KEY (\`organization_customization_document_header_template_id\`) REFERENCES \`organization_customization_document_header_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'organization_customization',
      'FK_d42985ae3fc301782b3ce59a35e',
      `ALTER TABLE \`organization_customization\` ADD CONSTRAINT \`FK_d42985ae3fc301782b3ce59a35e\` FOREIGN KEY (\`organization_customization_document_footer_template_id\`) REFERENCES \`organization_customization_document_footer_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'regulatory_update_main_change',
      'FK_97767b8764de4637860e9e5ae63',
      `ALTER TABLE \`regulatory_update_main_change\` ADD CONSTRAINT \`FK_97767b8764de4637860e9e5ae63\` FOREIGN KEY (\`regulatory_update_id\`) REFERENCES \`regulatory_update\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'regulatory_update_email_preference',
      'FK_17b18be46727c736d811578757e',
      `ALTER TABLE \`regulatory_update_email_preference\` ADD CONSTRAINT \`FK_17b18be46727c736d811578757e\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'retirement_planning_rgps_earnings_history',
      'FK_3d8fd2e6a2caa76981f1fbabe97',
      `ALTER TABLE \`retirement_planning_rgps_earnings_history\` ADD CONSTRAINT \`FK_3d8fd2e6a2caa76981f1fbabe97\` FOREIGN KEY (\`retirement_planning_rgps_period_id\`) REFERENCES \`retirement_planning_rgps_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'retirement_planning_rgps_earnings_history',
      'FK_dfc01e49ffa5423c031c6f0b685',
      `ALTER TABLE \`retirement_planning_rgps_earnings_history\` ADD CONSTRAINT \`FK_dfc01e49ffa5423c031c6f0b685\` FOREIGN KEY (\`retirement_planning_rgps_id\`) REFERENCES \`retirement_planning_rgps\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'rural_timeline_cnis_contribution_period_adjustment',
      'FK_f0f673b4ae36807ac35693afd14',
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_adjustment\` ADD CONSTRAINT \`FK_f0f673b4ae36807ac35693afd14\` FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`) REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'system_activities',
      'FK_0776c71822610268a496c6aa97f',
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_0776c71822610268a496c6aa97f\` FOREIGN KEY (\`organization_member_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'system_activities',
      'FK_5479b7995c855c2fbda876abaf4',
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_5479b7995c855c2fbda876abaf4\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'system_activities',
      'FK_07f78e1097a36a30ed392c63433',
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_07f78e1097a36a30ed392c63433\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'customer_email_sent',
      'FK_56e0785dbf491218d3bd1884e0e',
      `ALTER TABLE \`customer_email_sent\` ADD CONSTRAINT \`FK_56e0785dbf491218d3bd1884e0e\` FOREIGN KEY (\`sent_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'customer_email_sent_attachment',
      'FK_300809a30a4494b6ac4a46cf40b',
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_300809a30a4494b6ac4a46cf40b\` FOREIGN KEY (\`customer_email_sent_id\`) REFERENCES \`customer_email_sent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'customer_email_sent_attachment',
      'FK_b05f74cf323366c306bf22265a9',
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_b05f74cf323366c306bf22265a9\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'email_template',
      'FK_68ab5117677e3cb496f1ca5ff63',
      `ALTER TABLE \`email_template\` ADD CONSTRAINT \`FK_68ab5117677e3cb496f1ca5ff63\` FOREIGN KEY (\`owner_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.safeAddForeignKey(
      queryRunner,
      'retirement_planning_rgps_period_document',
      'FK_c42bf0bbd5b403e3191330cc9f5',
      `ALTER TABLE \`retirement_planning_rgps_period_document\` ADD CONSTRAINT \`FK_c42bf0bbd5b403e3191330cc9f5\` FOREIGN KEY (\`retirement_planning_rgps_period_id\`) REFERENCES \`retirement_planning_rgps_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_period_document\` DROP FOREIGN KEY \`FK_c42bf0bbd5b403e3191330cc9f5\``,
    );
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
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_adjustment\` DROP FOREIGN KEY \`FK_f0f673b4ae36807ac35693afd14\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_earnings_history\` DROP FOREIGN KEY \`FK_dfc01e49ffa5423c031c6f0b685\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_planning_rgps_earnings_history\` DROP FOREIGN KEY \`FK_3d8fd2e6a2caa76981f1fbabe97\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_email_preference\` DROP FOREIGN KEY \`FK_17b18be46727c736d811578757e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_main_change\` DROP FOREIGN KEY \`FK_97767b8764de4637860e9e5ae63\``,
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
      `ALTER TABLE \`organization_credit_usage\` DROP FOREIGN KEY \`FK_abdf40aa47ff13eb674d32f0ef7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_usage\` DROP FOREIGN KEY \`FK_db20475add2e374dd952d48ae92\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_purchase\` DROP FOREIGN KEY \`FK_047167a78a1dac16f86e5948f17\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_purchase\` DROP FOREIGN KEY \`FK_32de382d298a541c80fddee31d3\``,
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
      `ALTER TABLE \`mini_advisor_result\` DROP FOREIGN KEY \`FK_7f01efa1a258c732ceaea0411e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_work_period_earnings_history\` DROP FOREIGN KEY \`FK_03776c7b4866d16e70354f26822\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_work_period_document\` DROP FOREIGN KEY \`FK_af2973c4f449c034b88b5daecdb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_work_period\` DROP FOREIGN KEY \`FK_5f1f19debb50eac9a2089282d3f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_legal_proceeding\` DROP FOREIGN KEY \`FK_13be8b5394803fa64430965526c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_inss_benefit\` DROP FOREIGN KEY \`FK_e6a9529a3041526abd51858f468\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection_document\` DROP FOREIGN KEY \`FK_fd267b3e4f43feca85a85f315aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`maternity_pay_rejection\` DROP FOREIGN KEY \`FK_01f86230ecd9d7b3df77d903eb2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`interview_form\` DROP FOREIGN KEY \`FK_ca4b2481254cce5f49bbfbe2eab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`interview_form\` DROP FOREIGN KEY \`FK_f43072421681ab54ef564d8672f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`interview_form\` DROP FOREIGN KEY \`FK_b55d634c8f0500ab2d643435747\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_document\` DROP FOREIGN KEY \`FK_a37c7f738797c8cf1ce840fa9d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` DROP FOREIGN KEY \`FK_a7777d1d1177675064612098464\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` DROP FOREIGN KEY \`FK_fc13c956463bf1fe98b18cf7776\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_grant_period_document\` DROP FOREIGN KEY \`FK_6905d73a0cfe17a4da0fb03012e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_grant_earnings_history\` DROP FOREIGN KEY \`FK_8d41ed0c8db19562a65d1ae3b43\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_grant_earnings_history\` DROP FOREIGN KEY \`FK_258da09d5778790d374906c8cff\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_c3ffb9efe979a695e45da4f073c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_d9a5bfe7715c71666f04a70b3bb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_b1b7c551fbf2de09bfe4f32e8aa\``,
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
      `ALTER TABLE \`accident_assistance_terminated\` DROP FOREIGN KEY \`FK_8ab9bd36f52690f29705635b776\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated\` DROP FOREIGN KEY \`FK_7ed740a71f28787c9ed73c944fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated\` DROP FOREIGN KEY \`FK_9c14e626ecabe8689c5b2763347\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_60a4deb79c0a5025ad6919f732f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_7c1280af9f78ec8754644652bf4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_e6ee5e8d95d03bf65a427bdfa9d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_2cae792050fd684546a36a3ef8e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_5af99ee5a985818cff039d3c48e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_4bf0d6a2aa0890f504095a69860\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_9ae40c63b9379f0b255a3a48477\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_b123e2d397b2b3c9db19fdfea0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_237a38463dd4b4d4fed8db1f6f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_e7c60d2dd653cb78bae7d718bf9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_7899d1f84a9f60b5c6f638499c4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_e2c6a1756f9f902c900f67cadae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_d85d4cf01373ea25be0175450a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_0537095eb4deadf0665a1ed51d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_2e2cb32e1168368c156782d993d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_d839be03e3ce21bd911d1add88e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_525e0443c3beed697504ccabed6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_b2b640c0a73ecf4a3f6cb57c124\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_161119c21d96483f5d6d79e9c72\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_5f48f3d21da2326dc3084bcd765\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_93bdb64f535796b12676befef3b\``,
    );
    await queryRunner.query(
      `DROP TABLE \`power_of_attorney_generator_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`poverty_declaration_generator_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`jef_waiver_declaration_generator_analysis\``,
    );
    await queryRunner.query(`DROP TABLE \`fee_contract_generator_analysis\``);
    await queryRunner.query(`DROP TABLE \`interview_form\``);
  }
}
