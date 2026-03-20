import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixGeneralUrbanRetirementRelationsAndDocumentTypes1774011563395
  implements MigrationInterface
{
  name = 'FixGeneralUrbanRetirementRelationsAndDocumentTypes1774011563395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_cdb9ee6d20c2c9321c1af765fe` ON `analysis_tool_record`',
    );
    await queryRunner.query(
      'ALTER TABLE `special_category_retirement_analysis` DROP COLUMN `current_workflow_step_index`',
    );
    await queryRunner.query(
      'ALTER TABLE `retirement_planning_rgps_period` ADD `valid_contribution_time` text NULL',
    );
    await queryRunner.query(
      "ALTER TABLE `retirement_planning_rpps_period_document` CHANGE `document_type` `document_type` enum ('ctc_document', 'ppp', 'ctps', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'",
    );
    await queryRunner.query(
      "ALTER TABLE `general_urban_retirement_analysis_period_document` CHANGE `document_type` `document_type` enum ('ctc_document', 'ppp', 'ctps', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'",
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` CHANGE `career_start_date` `career_start_date` date NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` CHANGE `public_service_start_date` `public_service_start_date` date NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` ADD UNIQUE INDEX `IDX_cdb9ee6d20c2c9321c1af765fe` (`general_urban_retirement_analysis_id`)',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `REL_cdb9ee6d20c2c9321c1af765fe` ON `analysis_tool_record` (`general_urban_retirement_analysis_id`)',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_document` ADD CONSTRAINT `FK_29a1b9d05b647fc96c56734dcf2` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_legal_proceeding` ADD CONSTRAINT `FK_aff7883a0002c9295cdcfdafcf0` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_special_time` ADD CONSTRAINT `FK_96d438c2ec566de0aad0f8259f6` FOREIGN KEY (`general_urban_retirement_analysis_period_id`) REFERENCES `general_urban_retirement_analysis_period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period` ADD CONSTRAINT `FK_d26e244d2ddce71248ef6646ee8` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_disability` ADD CONSTRAINT `FK_1db39d82b206944a47590d38d00` FOREIGN KEY (`cid_id`) REFERENCES `cid_ten`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_disability` ADD CONSTRAINT `FK_a258ae7dbcec4aedd5d9e83e16a` FOREIGN KEY (`general_urban_retirement_analysis_period_id`) REFERENCES `general_urban_retirement_analysis_period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` ADD CONSTRAINT `FK_57f785fe8ed25f9bf7deaac36a5` FOREIGN KEY (`general_urban_retirement_analysis_period_special_time_id`) REFERENCES `general_urban_retirement_analysis_period_special_time`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` ADD CONSTRAINT `FK_eef0053e330500b53b59ac5796b` FOREIGN KEY (`general_urban_retirement_analysis_period_disability_id`) REFERENCES `general_urban_retirement_analysis_period_disability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` ADD CONSTRAINT `FK_6c9682c5876b3ea0126a5007b2f` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_remuneration` ADD CONSTRAINT `FK_bd176d27aea6b73a8e41f4c27b4` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` ADD CONSTRAINT `FK_117c4c09f147cbe28fb597f9a75` FOREIGN KEY (`general_urban_retirement_analysis_result_id`) REFERENCES `general_urban_retirement_analysis_result`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` ADD CONSTRAINT `FK_cdb9ee6d20c2c9321c1af765fe0` FOREIGN KEY (`general_urban_retirement_analysis_id`) REFERENCES `general_urban_retirement_analysis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` DROP FOREIGN KEY `FK_cdb9ee6d20c2c9321c1af765fe0`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` DROP FOREIGN KEY `FK_117c4c09f147cbe28fb597f9a75`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_remuneration` DROP FOREIGN KEY `FK_bd176d27aea6b73a8e41f4c27b4`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` DROP FOREIGN KEY `FK_6c9682c5876b3ea0126a5007b2f`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` DROP FOREIGN KEY `FK_eef0053e330500b53b59ac5796b`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_document` DROP FOREIGN KEY `FK_57f785fe8ed25f9bf7deaac36a5`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_disability` DROP FOREIGN KEY `FK_a258ae7dbcec4aedd5d9e83e16a`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_disability` DROP FOREIGN KEY `FK_1db39d82b206944a47590d38d00`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period` DROP FOREIGN KEY `FK_d26e244d2ddce71248ef6646ee8`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_period_special_time` DROP FOREIGN KEY `FK_96d438c2ec566de0aad0f8259f6`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_legal_proceeding` DROP FOREIGN KEY `FK_aff7883a0002c9295cdcfdafcf0`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis_document` DROP FOREIGN KEY `FK_29a1b9d05b647fc96c56734dcf2`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_cdb9ee6d20c2c9321c1af765fe` ON `analysis_tool_record`',
    );
    await queryRunner.query(
      'ALTER TABLE `analysis_tool_record` DROP INDEX `IDX_cdb9ee6d20c2c9321c1af765fe`',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` CHANGE `public_service_start_date` `public_service_start_date` date NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `general_urban_retirement_analysis` CHANGE `career_start_date` `career_start_date` date NOT NULL',
    );
    await queryRunner.query(
      "ALTER TABLE `general_urban_retirement_analysis_period_document` CHANGE `document_type` `document_type` enum ('ctc_document', 'ppp', 'cpts', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'",
    );
    await queryRunner.query(
      "ALTER TABLE `retirement_planning_rpps_period_document` CHANGE `document_type` `document_type` enum ('ctc_document', 'ppp', 'cpts', 'ltcat', 'judicial', 'medico', 'outros', 'outros_medicos') NOT NULL DEFAULT 'outros'",
    );
    await queryRunner.query(
      'ALTER TABLE `retirement_planning_rgps_period` DROP COLUMN `valid_contribution_time`',
    );
    await queryRunner.query(
      'ALTER TABLE `special_category_retirement_analysis` ADD `current_workflow_step_index` int NOT NULL DEFAULT \'1\'',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_cdb9ee6d20c2c9321c1af765fe` ON `analysis_tool_record` (`general_urban_retirement_analysis_id`)',
    );
  }
}