import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RetirementPermanentDisabilityRejectionFlow20260504182943 implements MigrationInterface {
  name = 'RetirementPermanentDisabilityRejectionFlow20260504182943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('CNIS', 'ADMINISTRATIVE_PROCEDURE_DENIAL', 'ADMINISTRATIVE_PROCEDURE_SUSPENSION', 'MEDICAL_SOCIAL_REPORT') NOT NULL, \`retirement_permanent_disability_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_incapacity_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid\` varchar(20) NOT NULL, \`type\` enum ('MAIN_INCAPACITY', 'PREVIOUS_BENEFIT') NOT NULL, \`retirement_permanent_disability_rejection_incapacity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_incapacity_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('PERMANENT_ASSISTANCE', 'BENEFIT_DECLARATION') NOT NULL, \`retirement_permanent_disability_rejection_incapacity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_incapacity\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`incapacity_start_date\` date NULL, \`disease_description\` text NULL, \`is_incapacity_from_accident\` tinyint NOT NULL DEFAULT 0, \`incapacitating_event_description\` text NULL, \`is_incapacity_from_serious_disease\` tinyint NOT NULL DEFAULT 0, \`serious_disease_type\` enum ('ALIENACAO_MENTAL', 'CARDIOPATIA_GRAVE', 'CEGUEIRA', 'CONTAMINACAO_POR_RADIACAO', 'DOENCA_DE_PARKINSON', 'ESCLEROSE_MULTIPLA', 'ESPONDILOARTROSE_ANQUILOSANTE', 'ESTADO_AVANCADO_DOENCA_PAGET', 'HANSENIASE', 'HEPATOPATIA_GRAVE', 'NEFROPATIA_GRAVE', 'NEOPLASIA_MALIGNA', 'PARALISIA_IRREVERSIVEL', 'AIDS', 'TUBERCULOSE_ATIVA', 'OUTROS') NULL, \`serious_disease_other_description\` text NULL, \`serious_disease_start_date\` date NULL, \`needs_permanent_assistance\` tinyint NOT NULL DEFAULT 0, \`has_previous_incapacity_benefit\` tinyint NOT NULL DEFAULT 0, \`previous_benefit_number\` varchar(100) NULL, \`previous_benefit_start_date\` date NULL, \`previous_benefit_end_date\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_insured_quality_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('UNEMPLOYMENT_PROOF', 'RURAL_ACTIVITY') NOT NULL, \`retirement_permanent_disability_rejection_insured_quality_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_insured_quality\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_involuntary_unemployed\` tinyint NOT NULL DEFAULT 0, \`intends_to_prove_involuntary_unemployment\` tinyint NULL, \`is_rural_insured_at_generating_fact\` tinyint NOT NULL DEFAULT 0, \`rural_insured_start_date\` date NULL, \`rural_insured_end_date\` date NULL, \`rural_insured_description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`retirement_permanent_disability_rejection_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_period_earnings_hist\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`value\` varchar(255) NULL, \`retirement_permanent_disability_rejection_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`work_type\` enum ('URBAN', 'RURAL') NOT NULL, \`bond_origin\` varchar(255) NULL, \`category\` enum ('EMPREGADO_URBANO', 'EMPREGADO_RURAL', 'EMPREGO_DOMESTICO', 'TRABALHADOR_AVULSO', 'CONTRIBUINTE_INDIVIDUAL_AUTONOMO', 'CONTRIBUINTE_INDIVIDUAL_PRESTADOR', 'MEI', 'SEGURADO_ESPECIAL', 'SEGURADO_FACULTATIVO') NULL, \`activity_description\` text NULL, \`is_pendency\` tinyint NOT NULL DEFAULT 0, \`competence_below_the_minimum\` tinyint NOT NULL DEFAULT 0, \`pendency_reason\` enum ('LEAVE_DATE', 'COMPETENCE_BELOW_MINIMUM', 'INCONSISTENT_COMPETENCE', 'LATE_CONTRIBUTION') NULL, \`period_consideration\` enum ('SIM', 'NAO', 'PROVISORIO') NULL, \`contribution_average\` decimal(15,2) NULL, \`wants_to_complement_via_meu_inss\` tinyint NULL, \`status\` tinyint NOT NULL DEFAULT 0, \`local\` varchar(500) NULL, \`retirement_permanent_disability_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`request_entry_date\` date NULL, \`denial_date\` date NULL, \`category\` enum ('urban_employee', 'rural_employee', 'domestic_employee', 'avulso_worker', 'individual_contributor_autonomous', 'individual_contributor_service_provider', 'mei', 'special_insured', 'optional_insured') NULL, \`retirement_permanent_disability_rejection_result_id\` varchar(36) NULL, \`retirement_permanent_disability_rejection_incapacity_id\` varchar(36) NULL, \`retirement_permanent_disability_rejection_insured_quality_id\` varchar(36) NULL, UNIQUE INDEX \`REL_rpdr_result\` (\`retirement_permanent_disability_rejection_result_id\`), UNIQUE INDEX \`REL_rpdr_incapacity\` (\`retirement_permanent_disability_rejection_incapacity_id\`), UNIQUE INDEX \`REL_rpdr_insured_quality\` (\`retirement_permanent_disability_rejection_insured_quality_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`retirement_permanent_disability_rejection_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_document\` ADD CONSTRAINT \`FK_rpdr_document_rpdr\` FOREIGN KEY (\`retirement_permanent_disability_rejection_id\`) REFERENCES \`retirement_permanent_disability_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_cid\` ADD CONSTRAINT \`FK_rpdr_incapacity_cid_incapacity\` FOREIGN KEY (\`retirement_permanent_disability_rejection_incapacity_id\`) REFERENCES \`retirement_permanent_disability_rejection_incapacity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_document\` ADD CONSTRAINT \`FK_rpdr_incapacity_doc_incapacity\` FOREIGN KEY (\`retirement_permanent_disability_rejection_incapacity_id\`) REFERENCES \`retirement_permanent_disability_rejection_incapacity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_insured_quality_doc\` ADD CONSTRAINT \`FK_rpdr_insured_quality_doc_iq\` FOREIGN KEY (\`retirement_permanent_disability_rejection_insured_quality_id\`) REFERENCES \`retirement_permanent_disability_rejection_insured_quality\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period_document\` ADD CONSTRAINT \`FK_rpdr_period_doc_period\` FOREIGN KEY (\`retirement_permanent_disability_rejection_period_id\`) REFERENCES \`retirement_permanent_disability_rejection_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period_earnings_hist\` ADD CONSTRAINT \`FK_rpdr_period_earnings_period\` FOREIGN KEY (\`retirement_permanent_disability_rejection_period_id\`) REFERENCES \`retirement_permanent_disability_rejection_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period\` ADD CONSTRAINT \`FK_rpdr_period_rpdr\` FOREIGN KEY (\`retirement_permanent_disability_rejection_id\`) REFERENCES \`retirement_permanent_disability_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` ADD CONSTRAINT \`FK_rpdr_result\` FOREIGN KEY (\`retirement_permanent_disability_rejection_result_id\`) REFERENCES \`retirement_permanent_disability_rejection_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` ADD CONSTRAINT \`FK_rpdr_incapacity\` FOREIGN KEY (\`retirement_permanent_disability_rejection_incapacity_id\`) REFERENCES \`retirement_permanent_disability_rejection_incapacity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` ADD CONSTRAINT \`FK_rpdr_insured_quality\` FOREIGN KEY (\`retirement_permanent_disability_rejection_insured_quality_id\`) REFERENCES \`retirement_permanent_disability_rejection_insured_quality\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_rpdr\` FOREIGN KEY (\`retirement_permanent_disability_rejection_id\`) REFERENCES \`retirement_permanent_disability_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_rpdr\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` DROP FOREIGN KEY \`FK_rpdr_insured_quality\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` DROP FOREIGN KEY \`FK_rpdr_incapacity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection\` DROP FOREIGN KEY \`FK_rpdr_result\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period\` DROP FOREIGN KEY \`FK_rpdr_period_rpdr\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period_earnings_hist\` DROP FOREIGN KEY \`FK_rpdr_period_earnings_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_period_document\` DROP FOREIGN KEY \`FK_rpdr_period_doc_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_insured_quality_doc\` DROP FOREIGN KEY \`FK_rpdr_insured_quality_doc_iq\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_document\` DROP FOREIGN KEY \`FK_rpdr_incapacity_doc_incapacity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_cid\` DROP FOREIGN KEY \`FK_rpdr_incapacity_cid_incapacity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_document\` DROP FOREIGN KEY \`FK_rpdr_document_rpdr\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`retirement_permanent_disability_rejection_id\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_period_earnings_hist\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_insured_quality\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_insured_quality_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_incapacity\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_incapacity_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_incapacity_cid\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_rejection_document\``,
    );
  }
}
