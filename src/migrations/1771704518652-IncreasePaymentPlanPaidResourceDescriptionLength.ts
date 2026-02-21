import type { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreasePaymentPlanPaidResourceDescriptionLength1771704518652
  implements MigrationInterface
{
  name = 'IncreasePaymentPlanPaidResourceDescriptionLength1771704518652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`description\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`description\` varchar(150) NOT NULL`,
    );
  }
}
