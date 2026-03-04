import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherRetirementPlanningFlow1772200000001
  implements MigrationInterface
{
  name = 'CreateTeacherRetirementPlanningFlow1772200000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`teacher_retirement_planning_complete_analysis\` longtext NULL, \`teacher_retirement_planning_simplified_analysis\` longtext NULL, \`teacher_retirement_planning_complete_analysis_download\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`federative_entity\` enum('state','municipality','union','federal_district') NOT NULL, \`state\` varchar(2) NULL, \`municipality\` varchar(255) NULL, \`analysis_name\` varchar(255) NULL, \`current_position\` varchar(255) NULL, \`activity_type\` enum('classroom_only','classroom_and_pedagogical_function','no_teaching_activity') NOT NULL, \`public_service_start_date\` date NOT NULL, \`career_start_date\` date NOT NULL, \`teacher_retirement_planning_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_teacher_retirement_planning_result\` (\`teacher_retirement_planning_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` longtext NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_remuneration\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contribution_date\` date NOT NULL, \`amount\` decimal(15,2) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`position_name\` varchar(255) NOT NULL, \`career_name\` varchar(255) NOT NULL, \`service_type\` enum('common','special','disability','teacher','rgps_ctc') NOT NULL, \`department\` varchar(255) NOT NULL, \`teacher_retirement_planning_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period_item\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`institution_name\` varchar(255) NOT NULL, \`institution_type\` enum('private','public') NOT NULL, \`education_level\` enum('early_childhood','elementary','high_school') NOT NULL, \`role_performed\` enum('classroom','principal','coordinator') NOT NULL, \`teacher_retirement_planning_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`teacher_retirement_planning_period_item_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` longtext NOT NULL, \`teacher_retirement_planning_period_item_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning\` ADD CONSTRAINT \`FK_teacher_retirement_planning_result\` FOREIGN KEY (\`teacher_retirement_planning_result_id\`) REFERENCES \`teacher_retirement_planning_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_document\` ADD CONSTRAINT \`FK_teacher_retirement_planning_document\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_inss_benefit\` ADD CONSTRAINT \`FK_teacher_retirement_planning_inss_benefit\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_legal_proceeding\` ADD CONSTRAINT \`FK_teacher_retirement_planning_legal_proceeding\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_remuneration\` ADD CONSTRAINT \`FK_teacher_retirement_planning_remuneration\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period\` ADD CONSTRAINT \`FK_teacher_retirement_planning_period\` FOREIGN KEY (\`teacher_retirement_planning_id\`) REFERENCES \`teacher_retirement_planning\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item\` ADD CONSTRAINT \`FK_teacher_retirement_planning_period_item\` FOREIGN KEY (\`teacher_retirement_planning_period_id\`) REFERENCES \`teacher_retirement_planning_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item_document\` ADD CONSTRAINT \`FK_teacher_retirement_planning_period_item_document\` FOREIGN KEY (\`teacher_retirement_planning_period_item_id\`) REFERENCES \`teacher_retirement_planning_period_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item_document\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_period_item_document\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period_item\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_period_item\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_period\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_period\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_remuneration\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_remuneration\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_legal_proceeding\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_legal_proceeding\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_inss_benefit\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_inss_benefit\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning_document\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_document\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`teacher_retirement_planning\` DROP FOREIGN KEY \`FK_teacher_retirement_planning_result\``,
    );

    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period_item_document\``,
    );

    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period_item\``,
    );

    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_period\``,
    );

    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_remuneration\``,
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
      `DROP INDEX \`REL_teacher_retirement_planning_result\` ON \`teacher_retirement_planning\``,
    );

    await queryRunner.query(`DROP TABLE \`teacher_retirement_planning\``);

    await queryRunner.query(
      `DROP TABLE \`teacher_retirement_planning_result\``,
    );
  }
}
