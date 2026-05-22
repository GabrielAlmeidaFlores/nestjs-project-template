import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpaDeceasedWorkHistoryRemunerations1790000000000
  implements MigrationInterface
{
  public name = 'AddSpaDeceasedWorkHistoryRemunerations1790000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `spa_deceased_work_history` ADD `remunerations` json NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `spa_deceased_work_history` DROP COLUMN `remunerations`',
    );
  }
}
