import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePaymentPlanPaidResourceEntity1771706393048
  implements MigrationInterface
{
  name = 'UpdatePaymentPlanPaidResourceEntity1771706393048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`description\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`description\` varchar(1000) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` MODIFY COLUMN \`title\` varchar(150) NOT NULL`,
    );
  }
}
