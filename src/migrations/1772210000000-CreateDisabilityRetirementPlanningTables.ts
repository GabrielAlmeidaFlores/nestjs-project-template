import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDisabilityRetirementPlanningTables1772210000000
  implements MigrationInterface
{
  name = 'CreateDisabilityRetirementPlanningTables1772210000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`disability_retirement_planning_complete_analysis\` longtext NULL, \`disability_retirement_planning_simplified_analysis\` longtext NULL, \`disability_retirement_planning_complete_analysis_download\` longtext NULL, \`disability_retirement_planning_id\` varchar(36) NULL, UNIQUE INDEX \`REL_drp_result_disability_retirement_planning_id\` (\`disability_retirement_planning_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`current_position\` varchar(255) NOT NULL, \`federative_entity\` enum ('state', 'municipality', 'union', 'federal_district') NOT NULL, \`state\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NULL, \`municipality\` varchar(255) NULL, \`public_service_start_date\` date NOT NULL, \`career_start_date\` date NOT NULL, \`analysis_name\` varchar(255) NULL, \`long_time_disability\` tinyint NOT NULL, \`disability_retirement_planning_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_drp_disability_retirement_planning_result_id\` (\`disability_retirement_planning_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`job_position\` varchar(255) NOT NULL, \`career_name\` varchar(255) NOT NULL, \`service_type\` enum ('comum', 'especial', 'tempo_de_pcd', 'averbacao_tempo_comum_rgps', 'averbacao_tempo_especial_rgps', 'averbacao_tempo_de_pcd_rgps', 'outros') NOT NULL, \`department\` varchar(255) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `CREATE TABLE \`disability_retirement_planning_remuneration\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`remuneration_date\` date NOT NULL, \`remuneration_amount\` decimal(15,2) NOT NULL, \`disability_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_disability\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`disability_degree\` enum ('leve', 'moderado', 'grave') NOT NULL, \`disability_category\` enum ('mental_ou_intelectual', 'fisica', 'sensorial') NOT NULL, \`disability_type\` enum ('total', 'parcial', 'nenhum') NOT NULL, \`disability_description\` text NOT NULL, \`activity_impact\` text NOT NULL, \`disability_retirement_planning_period_id\` varchar(36) NULL, \`cid_ten_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_disability_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(500) NOT NULL, \`disability_retirement_planning_period_disability_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_special_time\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`disability_retirement_planning_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_period_special_time_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(500) NOT NULL, \`disability_retirement_planning_period_special_time_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`disability_retirement_planning_id\` varchar(36) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_drp_analysis_tool_record_disability_retirement_planning_id\` (\`disability_retirement_planning_id\`)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_result\` ADD CONSTRAINT \`FK_drp_result_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning\` ADD CONSTRAINT \`FK_drp_disability_retirement_planning_result\` FOREIGN KEY (\`disability_retirement_planning_result_id\`) REFERENCES \`disability_retirement_planning_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period\` ADD CONSTRAINT \`FK_drp_period_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_document\` ADD CONSTRAINT \`FK_drp_document_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_inss_benefit\` ADD CONSTRAINT \`FK_drp_inss_benefit_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_legal_proceeding\` ADD CONSTRAINT \`FK_drp_legal_proceeding_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_remuneration\` ADD CONSTRAINT \`FK_drp_remuneration_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` ADD CONSTRAINT \`FK_drp_period_disability_period\` FOREIGN KEY (\`disability_retirement_planning_period_id\`) REFERENCES \`disability_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` ADD CONSTRAINT \`FK_drp_period_disability_cid_ten\` FOREIGN KEY (\`cid_ten_id\`) REFERENCES \`cid_ten\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability_document\` ADD CONSTRAINT \`FK_drp_period_disability_document_period_disability\` FOREIGN KEY (\`disability_retirement_planning_period_disability_id\`) REFERENCES \`disability_retirement_planning_period_disability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time\` ADD CONSTRAINT \`FK_drp_period_special_time_period\` FOREIGN KEY (\`disability_retirement_planning_period_id\`) REFERENCES \`disability_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time_document\` ADD CONSTRAINT \`FK_drp_period_special_time_document_special_time\` FOREIGN KEY (\`disability_retirement_planning_period_special_time_id\`) REFERENCES \`disability_retirement_planning_period_special_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_drp_analysis_tool_record_disability_retirement_planning\` FOREIGN KEY (\`disability_retirement_planning_id\`) REFERENCES \`disability_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_drp_analysis_tool_record_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time_document\` DROP FOREIGN KEY \`FK_drp_period_special_time_document_special_time\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_special_time\` DROP FOREIGN KEY \`FK_drp_period_special_time_period\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability_document\` DROP FOREIGN KEY \`FK_drp_period_disability_document_period_disability\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` DROP FOREIGN KEY \`FK_drp_period_disability_cid_ten\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period_disability\` DROP FOREIGN KEY \`FK_drp_period_disability_period\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_remuneration\` DROP FOREIGN KEY \`FK_drp_remuneration_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_legal_proceeding\` DROP FOREIGN KEY \`FK_drp_legal_proceeding_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_inss_benefit\` DROP FOREIGN KEY \`FK_drp_inss_benefit_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_document\` DROP FOREIGN KEY \`FK_drp_document_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_period\` DROP FOREIGN KEY \`FK_drp_period_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning\` DROP FOREIGN KEY \`FK_drp_disability_retirement_planning_result\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_result\` DROP FOREIGN KEY \`FK_drp_result_disability_retirement_planning\``,
    );

    await queryRunner.query(
      `DROP INDEX \`IDX_drp_analysis_tool_record_disability_retirement_planning_id\` ON \`analysis_tool_record\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`disability_retirement_planning_id\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_special_time_document\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_special_time\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_disability_document\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_period_disability\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_remuneration\``,
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
      `DROP TABLE \`disability_retirement_planning_period\``,
    );

    await queryRunner.query(
      `DROP INDEX \`REL_drp_result_disability_retirement_planning_id\` ON \`disability_retirement_planning_result\``,
    );

    await queryRunner.query(
      `DROP INDEX \`REL_drp_disability_retirement_planning_result_id\` ON \`disability_retirement_planning\``,
    );

    await queryRunner.query(`DROP TABLE \`disability_retirement_planning_result\``);

    await queryRunner.query(`DROP TABLE \`disability_retirement_planning\``);
  }
}
