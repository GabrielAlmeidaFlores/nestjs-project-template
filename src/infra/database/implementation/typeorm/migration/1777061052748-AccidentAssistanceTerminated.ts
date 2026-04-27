import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AccidentAssistanceTerminated1777061052748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela principal
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`accident_date\` date NULL,
      \`accident_description\` text NULL,
      \`der\` date NOT NULL,
      \`denial_date\` date NOT NULL,
      \`category\` varchar(100) NOT NULL,
      \`inss_password\` varchar(255) NULL,
      \`analysis_name\` varchar(255) NULL,
      \`benefit_cessation_reason\` text NOT NULL,
      \`had_previous_incapacity_benefit\` tinyint NOT NULL,
      \`previous_incapacity_benefit_number\` varchar(50) NULL,
      \`previous_incapacity_benefit_start_date\` date NULL,
      \`previous_incapacity_benefit_end_date\` date NULL,
      \`extension_request_status\` varchar(50) NULL,
      \`dib\` date NULL,
      \`dcb\` date NULL,
      \`inss_benefit_number\` varchar(255) NULL,
      \`accident_assistance_terminated_result_id\` varchar(36) NULL,
      \`created_by_id\` varchar(36) NULL,
      \`updated_by_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de benefícios
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_benefit\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`inss_benefit_number\` varchar(100) NOT NULL,
      \`accident_assistance_terminated_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de CID
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_cid\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`name\` varchar(20) NOT NULL,
      \`accident_assistance_terminated_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de documentos
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_document\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`document\` varchar(255) NOT NULL,
      \`type\` enum('CNIS','ADMINISTRATIVE_PROCESS','OTHER') NOT NULL,
      \`accident_assistance_terminated_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de processos judiciais
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_legal_proceeding\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`legal_proceeding_number\` varchar(100) NOT NULL,
      \`accident_assistance_terminated_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de períodos
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_period\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`sequencial\` int NULL,
      \`period_name\` varchar(255) NULL,
      \`period_start\` date NULL,
      \`period_end\` date NULL,
      \`category\` varchar(100) NULL,
      \`is_pendency\` tinyint(1) NULL,
      \`reason_pendency\` enum('NO_CONTRIBUTION','NO_REGISTRATION','NO_CAR','NO_CTPS','NO_CADASTRAL_LINK','NO_CADASTRAL_LINK_AND_NO_CONTRIBUTION','NO_CONTRIBUTION_AND_NO_CTPS','NO_CONTRIBUTION_AND_NO_REGISTRATION','NO_CONTRIBUTION_AND_NO_CAR','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_CTPS','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_REGISTRATION','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_CAR','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_CTPS_AND_NO_REGISTRATION','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_CTPS_AND_NO_CAR','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_REGISTRATION_AND_NO_CAR','NO_CONTRIBUTION_AND_NO_CADASTRAL_LINK_AND_NO_CTPS_AND_NO_REGISTRATION_AND_NO_CAR','OTHER') NULL,
      \`competence_below_the_minimum\` tinyint(1) NULL,
      \`contribution_average\` decimal(10,2) NULL,
      \`type_of_contribution\` varchar(100) NULL,
      \`status\` tinyint(1) NULL,
      \`accident_assistance_terminated_id\` varchar(36) NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Tabela de resultados
    await queryRunner.query(`CREATE TABLE \`accident_assistance_terminated_result\` (
      \`id\` varchar(36) NOT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      \`deleted_at\` datetime(6) NULL,
      \`accident_assistance_terminated_complete_analysis\` longtext NULL,
      \`accident_assistance_terminated_simplified_analysis\` text NULL,
      \`decision_details\` longtext NULL,
      \`first_analysis\` longtext NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);

    // Foreign keys
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated\` ADD CONSTRAINT \`FK_accident_assistance_terminated_result\` FOREIGN KEY (\`accident_assistance_terminated_result_id\`) REFERENCES \`accident_assistance_terminated_result\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated_benefit\` ADD CONSTRAINT \`FK_accident_assistance_terminated_benefit_parent\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated_cid\` ADD CONSTRAINT \`FK_accident_assistance_terminated_cid_parent\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated_document\` ADD CONSTRAINT \`FK_accident_assistance_terminated_document_parent\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated_legal_proceeding\` ADD CONSTRAINT \`FK_accident_assistance_terminated_legal_proceeding_parent\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_terminated_period\` ADD CONSTRAINT \`FK_accident_assistance_terminated_period_parent\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    // Integração com analysis_tool_record
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD COLUMN \`accident_assistance_terminated_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_accident_assistance_terminated\` FOREIGN KEY (\`accident_assistance_terminated_id\`) REFERENCES \`accident_assistance_terminated\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    // ... FK para created_by_id e updated_by_id podem ser adicionadas conforme necessário ...
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop FKs analysis_tool_record
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` DROP FOREIGN KEY `FK_analysis_tool_record_accident_assistance_terminated`',
    );
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` DROP COLUMN `accident_assistance_terminated_id`',
    );

    // Drop FKs filhos
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated_period` DROP FOREIGN KEY `FK_accident_assistance_terminated_period_parent`',
    );
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated_legal_proceeding` DROP FOREIGN KEY `FK_accident_assistance_terminated_legal_proceeding_parent`',
    );
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated_document` DROP FOREIGN KEY `FK_accident_assistance_terminated_document_parent`',
    );
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated_cid` DROP FOREIGN KEY `FK_accident_assistance_terminated_cid_parent`',
    );
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated_benefit` DROP FOREIGN KEY `FK_accident_assistance_terminated_benefit_parent`',
    );
    await queryRunner.query(
      'ALTER TABLE `accident_assistance_terminated` DROP FOREIGN KEY `FK_accident_assistance_terminated_result`',
    );

    // Drop tables em ordem reversa
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_result`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_period`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_legal_proceeding`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_document`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_cid`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated_benefit`',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS `accident_assistance_terminated`',
    );
  }
}
