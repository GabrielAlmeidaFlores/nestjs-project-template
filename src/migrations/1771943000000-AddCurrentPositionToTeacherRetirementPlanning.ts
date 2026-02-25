import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrentPositionToTeacherRetirementPlanning1771943000000
  implements MigrationInterface
{
  public name = 'AddCurrentPositionToTeacherRetirementPlanning1771943000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning` ADD `current_position` varchar(255) NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `teacher_retirement_planning` DROP COLUMN `current_position`",
    );
  }
}
