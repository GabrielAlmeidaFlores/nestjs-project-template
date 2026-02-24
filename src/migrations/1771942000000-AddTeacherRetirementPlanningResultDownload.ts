import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTeacherRetirementPlanningResultDownload1771942000000
  implements MigrationInterface
{
  public name = 'AddTeacherRetirementPlanningResultDownload1771942000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_result` ADD `teacher_retirement_planning_complete_analysis_download` longtext NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning_result` DROP COLUMN `teacher_retirement_planning_complete_analysis_download`",
    );
  }
}
