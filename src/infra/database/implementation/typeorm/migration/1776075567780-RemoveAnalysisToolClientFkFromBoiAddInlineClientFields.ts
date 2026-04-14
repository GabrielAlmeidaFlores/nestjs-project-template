import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveAnalysisToolClientFkFromBoiAddInlineClientFields1776075567780 implements MigrationInterface {
  name = 'RemoveAnalysisToolClientFkFromBoiAddInlineClientFields1776075567780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` DROP FOREIGN KEY \`FK_c9430f87a08b094fde62807d974\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP FOREIGN KEY \`FK_1f9bbd7929d29a60fa18efbfa71\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` DROP FOREIGN KEY \`FK_5a40eca4f2b9a31b502dadc419a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` DROP FOREIGN KEY \`FK_e5d13c0b0ff4fc0aac9c0bd3f1e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` DROP FOREIGN KEY \`FK_fe13f7fc78a045ab3ba03df35db\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents\` DROP FOREIGN KEY \`FK_a68932b69afdb1df547c3959637\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` DROP FOREIGN KEY \`FK_351b571298612eb99f1480abf0a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` DROP FOREIGN KEY \`FK_88e4f2a0e52506a4b818a094384\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` DROP FOREIGN KEY \`FK_02952d3df1d2f65220433900c68\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_dependent_pension_analysis\` DROP FOREIGN KEY \`FK_563c83aa0b7d476ceb7e38f2bcc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_retirement_rule\` DROP FOREIGN KEY \`FK_f44913cb29a2e09a7e37a055607\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` DROP FOREIGN KEY \`FK_c07a04bf5030365523fe0475a7a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_document\` DROP FOREIGN KEY \`FK_tdbg_document_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` DROP FOREIGN KEY \`FK_tdbg_inss_benefit_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` DROP FOREIGN KEY \`FK_tdbg_insured_status_doc_to_insured_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` DROP FOREIGN KEY \`FK_tdbg_insured_status_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_tdbg_legal_proceeding_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` DROP FOREIGN KEY \`FK_tdbg_period_doc_to_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` DROP FOREIGN KEY \`FK_tdbg_prev_benefits_doc_to_prev_benefits\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` DROP FOREIGN KEY \`FK_tdbg_prev_benefits_to_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period\` DROP FOREIGN KEY \`FK_tdbg_period_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` DROP FOREIGN KEY \`FK_tdbg_earnings_history_to_work_periods\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` DROP FOREIGN KEY \`FK_tdbg_work_periods_to_tdbg\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` DROP FOREIGN KEY \`FK_tdbg_to_result_fk\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_tdbg_atr_to_tdbg\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1f9bbd7929d29a60fa18efbfa7\` ON \`spa_benefit_originator_identification\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e5d13c0b0ff4fc0aac9c0bd3f1\` ON \`spa_customer_profile_identification\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_02952d3df1d2f65220433900c6\` ON \`spa_deceased_work_history\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c07a04bf5030365523fe0475a7\` ON \`spa_result\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_tdbg_to_result\` ON \`temporary_disability_benefits_grant\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a11ef687a9c70fdd9d958e2942\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_de48ccd1c2a2087b6f247f298d\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f0b4ad9f4cd67248599cf1ce0c\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` CHANGE \`survivor_pension_analysis_benefit_originator_identification_id\` \`benefit_originator_identification_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` CHANGE \`survivor_pension_analysis_customer_profile_identification_id\` \`customer_profile_identification_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` CHANGE \`survivor_pension_analysis_deceased_benefit_dependents_id\` \`deceased_benefit_dependents_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` CHANGE \`survivor_pension_analysis_deceased_work_history_period_id\` \`deceased_work_history_period_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` CHANGE \`survivor_pension_analysis_deceased_work_history_id\` \`deceased_work_history_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP COLUMN \`analysis_tool_client_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD \`client_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD \`client_federal_document\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD \`client_birth_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD \`client_gender\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD UNIQUE INDEX \`IDX_96690f1ed7525214faa3c3d1bf\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` ADD UNIQUE INDEX \`IDX_27e61c7381b787e99c3138290e\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` ADD UNIQUE INDEX \`IDX_15d388f0d60f9d5bd1db425775\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` ADD UNIQUE INDEX \`IDX_9059fa1c6af64371b60a843836\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` ADD UNIQUE INDEX \`IDX_0dbf09f864fc1d0b259a49b471\` (\`temporary_disability_benefits_grant_result_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_96690f1ed7525214faa3c3d1bf\` ON \`spa_benefit_originator_identification\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_27e61c7381b787e99c3138290e\` ON \`spa_customer_profile_identification\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_15d388f0d60f9d5bd1db425775\` ON \`spa_deceased_work_history\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_9059fa1c6af64371b60a843836\` ON \`spa_result\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_0dbf09f864fc1d0b259a49b471\` ON \`temporary_disability_benefits_grant\` (\`temporary_disability_benefits_grant_result_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` ADD CONSTRAINT \`FK_786ce267551df8e4b6640da52f6\` FOREIGN KEY (\`benefit_originator_identification_id\`) REFERENCES \`spa_benefit_originator_identification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD CONSTRAINT \`FK_96690f1ed7525214faa3c3d1bf6\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` ADD CONSTRAINT \`FK_40531007bc2fb0c2d65efa48f3b\` FOREIGN KEY (\`customer_profile_identification_id\`) REFERENCES \`spa_customer_profile_identification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` ADD CONSTRAINT \`FK_27e61c7381b787e99c3138290e8\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` ADD CONSTRAINT \`FK_358c75ce90dec5fc870dbc4cca8\` FOREIGN KEY (\`deceased_benefit_dependents_id\`) REFERENCES \`spa_deceased_benefit_dependents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents\` ADD CONSTRAINT \`FK_3372c8549c0a75f2dc5726ebb65\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` ADD CONSTRAINT \`FK_8901176f40704205180a0410a55\` FOREIGN KEY (\`deceased_work_history_period_id\`) REFERENCES \`spa_deceased_work_history_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` ADD CONSTRAINT \`FK_3a0c48a3fddccd6f523887b466e\` FOREIGN KEY (\`deceased_work_history_id\`) REFERENCES \`spa_deceased_work_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` ADD CONSTRAINT \`FK_15d388f0d60f9d5bd1db4257754\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_dependent_pension_analysis\` ADD CONSTRAINT \`FK_f18b17030c3bb40c859f7248b0e\` FOREIGN KEY (\`survivor_pension_analysis_result_id\`) REFERENCES \`spa_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_retirement_rule\` ADD CONSTRAINT \`FK_94122a13d4667f694982b80a2bf\` FOREIGN KEY (\`survivor_pension_analysis_result_id\`) REFERENCES \`spa_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` ADD CONSTRAINT \`FK_9059fa1c6af64371b60a843836c\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_document\` ADD CONSTRAINT \`FK_d495fdd8d01ad24f54fdbe5f2d9\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` ADD CONSTRAINT \`FK_24105a0e93c717b9300265c37a2\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` ADD CONSTRAINT \`FK_9cbb85fc671daa41b718f340c8b\` FOREIGN KEY (\`temporary_disability_benefits_grant_insured_status_id\`) REFERENCES \`temporary_disability_benefits_grant_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` ADD CONSTRAINT \`FK_db51dcb6dee04079503bb287f76\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` ADD CONSTRAINT \`FK_208b10b09994762bbcac8c3ecc9\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` ADD CONSTRAINT \`FK_8d2c787f5a504f048ba926b77c2\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` ADD CONSTRAINT \`FK_5bb5c3c3dc8f739464f9fe89ca7\` FOREIGN KEY (\`temporary_disability_benefits_grant_previous_benefits_id\`) REFERENCES \`temporary_disability_benefits_grant_previous_benefits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` ADD CONSTRAINT \`FK_0a7fc9cd43165a6c11ea78a2238\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period\` ADD CONSTRAINT \`FK_8bd86f9501c9b24ef12a64358ee\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` ADD CONSTRAINT \`FK_fc84df6ddcd859b5de1e40c6764\` FOREIGN KEY (\`temporary_disability_benefits_grant_work_periods_id\`) REFERENCES \`temporary_disability_benefits_grant_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` ADD CONSTRAINT \`FK_d95c3786cfb90925d20ea9ced9e\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` ADD CONSTRAINT \`FK_0dbf09f864fc1d0b259a49b4719\` FOREIGN KEY (\`temporary_disability_benefits_grant_result_id\`) REFERENCES \`temporary_disability_benefits_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_52d3272e33512e5f53d9c5d575c\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_52d3272e33512e5f53d9c5d575c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` DROP FOREIGN KEY \`FK_0dbf09f864fc1d0b259a49b4719\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` DROP FOREIGN KEY \`FK_d95c3786cfb90925d20ea9ced9e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` DROP FOREIGN KEY \`FK_fc84df6ddcd859b5de1e40c6764\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period\` DROP FOREIGN KEY \`FK_8bd86f9501c9b24ef12a64358ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` DROP FOREIGN KEY \`FK_0a7fc9cd43165a6c11ea78a2238\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` DROP FOREIGN KEY \`FK_5bb5c3c3dc8f739464f9fe89ca7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` DROP FOREIGN KEY \`FK_8d2c787f5a504f048ba926b77c2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_208b10b09994762bbcac8c3ecc9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` DROP FOREIGN KEY \`FK_db51dcb6dee04079503bb287f76\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` DROP FOREIGN KEY \`FK_9cbb85fc671daa41b718f340c8b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` DROP FOREIGN KEY \`FK_24105a0e93c717b9300265c37a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_document\` DROP FOREIGN KEY \`FK_d495fdd8d01ad24f54fdbe5f2d9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` DROP FOREIGN KEY \`FK_9059fa1c6af64371b60a843836c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_retirement_rule\` DROP FOREIGN KEY \`FK_94122a13d4667f694982b80a2bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_dependent_pension_analysis\` DROP FOREIGN KEY \`FK_f18b17030c3bb40c859f7248b0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` DROP FOREIGN KEY \`FK_15d388f0d60f9d5bd1db4257754\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` DROP FOREIGN KEY \`FK_3a0c48a3fddccd6f523887b466e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` DROP FOREIGN KEY \`FK_8901176f40704205180a0410a55\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents\` DROP FOREIGN KEY \`FK_3372c8549c0a75f2dc5726ebb65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` DROP FOREIGN KEY \`FK_358c75ce90dec5fc870dbc4cca8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` DROP FOREIGN KEY \`FK_27e61c7381b787e99c3138290e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` DROP FOREIGN KEY \`FK_40531007bc2fb0c2d65efa48f3b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP FOREIGN KEY \`FK_96690f1ed7525214faa3c3d1bf6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` DROP FOREIGN KEY \`FK_786ce267551df8e4b6640da52f6\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_0dbf09f864fc1d0b259a49b471\` ON \`temporary_disability_benefits_grant\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_9059fa1c6af64371b60a843836\` ON \`spa_result\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_15d388f0d60f9d5bd1db425775\` ON \`spa_deceased_work_history\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_27e61c7381b787e99c3138290e\` ON \`spa_customer_profile_identification\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_96690f1ed7525214faa3c3d1bf\` ON \`spa_benefit_originator_identification\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` DROP INDEX \`IDX_0dbf09f864fc1d0b259a49b471\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` DROP INDEX \`IDX_9059fa1c6af64371b60a843836\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` DROP INDEX \`IDX_15d388f0d60f9d5bd1db425775\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` DROP INDEX \`IDX_27e61c7381b787e99c3138290e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP INDEX \`IDX_96690f1ed7525214faa3c3d1bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP COLUMN \`client_gender\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP COLUMN \`client_birth_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP COLUMN \`client_federal_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` DROP COLUMN \`client_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD \`analysis_tool_client_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` CHANGE \`deceased_work_history_id\` \`survivor_pension_analysis_deceased_work_history_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` CHANGE \`deceased_work_history_period_id\` \`survivor_pension_analysis_deceased_work_history_period_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` CHANGE \`deceased_benefit_dependents_id\` \`survivor_pension_analysis_deceased_benefit_dependents_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` CHANGE \`customer_profile_identification_id\` \`survivor_pension_analysis_customer_profile_identification_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` CHANGE \`benefit_originator_identification_id\` \`survivor_pension_analysis_benefit_originator_identification_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_f0b4ad9f4cd67248599cf1ce0c\` ON \`analysis_tool_record\` (\`special_category_retirement_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_de48ccd1c2a2087b6f247f298d\` ON \`analysis_tool_record\` (\`teacher_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_cdb9ee6d20c2c9321c1af765fe\` ON \`analysis_tool_record\` (\`general_urban_retirement_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_a11ef687a9c70fdd9d958e2942\` ON \`analysis_tool_record\` (\`disability_retirement_planning_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_tdbg_to_result\` ON \`temporary_disability_benefits_grant\` (\`temporary_disability_benefits_grant_result_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_c07a04bf5030365523fe0475a7\` ON \`spa_result\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_02952d3df1d2f65220433900c6\` ON \`spa_deceased_work_history\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_e5d13c0b0ff4fc0aac9c0bd3f1\` ON \`spa_customer_profile_identification\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1f9bbd7929d29a60fa18efbfa7\` ON \`spa_benefit_originator_identification\` (\`survivor_pension_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_tdbg_atr_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant\` ADD CONSTRAINT \`FK_tdbg_to_result_fk\` FOREIGN KEY (\`temporary_disability_benefits_grant_result_id\`) REFERENCES \`temporary_disability_benefits_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_work_periods\` ADD CONSTRAINT \`FK_tdbg_work_periods_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_grant_work_periods_earnings_history\` ADD CONSTRAINT \`FK_tdbg_earnings_history_to_work_periods\` FOREIGN KEY (\`temporary_disability_benefits_grant_work_periods_id\`) REFERENCES \`temporary_disability_benefits_grant_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period\` ADD CONSTRAINT \`FK_tdbg_period_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits\` ADD CONSTRAINT \`FK_tdbg_prev_benefits_to_period\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_previous_benefits_document\` ADD CONSTRAINT \`FK_tdbg_prev_benefits_doc_to_prev_benefits\` FOREIGN KEY (\`temporary_disability_benefits_grant_previous_benefits_id\`) REFERENCES \`temporary_disability_benefits_grant_previous_benefits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_period_document\` ADD CONSTRAINT \`FK_tdbg_period_doc_to_period\` FOREIGN KEY (\`temporary_disability_benefits_grant_period_id\`) REFERENCES \`temporary_disability_benefits_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` ADD CONSTRAINT \`FK_tdbg_legal_proceeding_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status\` ADD CONSTRAINT \`FK_tdbg_insured_status_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_insured_status_document\` ADD CONSTRAINT \`FK_tdbg_insured_status_doc_to_insured_status\` FOREIGN KEY (\`temporary_disability_benefits_grant_insured_status_id\`) REFERENCES \`temporary_disability_benefits_grant_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` ADD CONSTRAINT \`FK_tdbg_inss_benefit_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_grant_document\` ADD CONSTRAINT \`FK_tdbg_document_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result\` ADD CONSTRAINT \`FK_c07a04bf5030365523fe0475a7a\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_retirement_rule\` ADD CONSTRAINT \`FK_f44913cb29a2e09a7e37a055607\` FOREIGN KEY (\`survivor_pension_analysis_result_id\`) REFERENCES \`spa_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_result_dependent_pension_analysis\` ADD CONSTRAINT \`FK_563c83aa0b7d476ceb7e38f2bcc\` FOREIGN KEY (\`survivor_pension_analysis_result_id\`) REFERENCES \`spa_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history\` ADD CONSTRAINT \`FK_02952d3df1d2f65220433900c68\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period\` ADD CONSTRAINT \`FK_88e4f2a0e52506a4b818a094384\` FOREIGN KEY (\`survivor_pension_analysis_deceased_work_history_id\`) REFERENCES \`spa_deceased_work_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_work_history_period_document\` ADD CONSTRAINT \`FK_351b571298612eb99f1480abf0a\` FOREIGN KEY (\`survivor_pension_analysis_deceased_work_history_period_id\`) REFERENCES \`spa_deceased_work_history_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents\` ADD CONSTRAINT \`FK_a68932b69afdb1df547c3959637\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_deceased_benefit_dependents_document\` ADD CONSTRAINT \`FK_fe13f7fc78a045ab3ba03df35db\` FOREIGN KEY (\`survivor_pension_analysis_deceased_benefit_dependents_id\`) REFERENCES \`spa_deceased_benefit_dependents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification\` ADD CONSTRAINT \`FK_e5d13c0b0ff4fc0aac9c0bd3f1e\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_customer_profile_identification_document\` ADD CONSTRAINT \`FK_5a40eca4f2b9a31b502dadc419a\` FOREIGN KEY (\`survivor_pension_analysis_customer_profile_identification_id\`) REFERENCES \`spa_customer_profile_identification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification\` ADD CONSTRAINT \`FK_1f9bbd7929d29a60fa18efbfa71\` FOREIGN KEY (\`survivor_pension_analysis_id\`) REFERENCES \`spa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`spa_benefit_originator_identification_document\` ADD CONSTRAINT \`FK_c9430f87a08b094fde62807d974\` FOREIGN KEY (\`survivor_pension_analysis_benefit_originator_identification_id\`) REFERENCES \`spa_benefit_originator_identification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
