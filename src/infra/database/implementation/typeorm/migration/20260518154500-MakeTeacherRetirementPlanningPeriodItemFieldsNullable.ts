import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeTeacherRetirementPlanningPeriodItemFieldsNullable20260518154500
  implements MigrationInterface
{
  public name = 'MakeTeacherRetirementPlanningPeriodItemFieldsNullable20260518154500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `end_date` `end_date` date NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `institution_name` `institution_name` varchar(255) NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `institution_type` `institution_type` varchar(255) NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `education_level` `education_level` varchar(255) NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `role_performed` `role_performed` varchar(255) NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `role_performed` `role_performed` enum('classroom','principal','coordinator') NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `education_level` `education_level` enum('early_childhood','elementary','high_school') NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `institution_type` `institution_type` enum('private','public') NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `institution_name` `institution_name` varchar(255) NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_period_item` CHANGE `end_date` `end_date` date NOT NULL",
    );
  }
}
