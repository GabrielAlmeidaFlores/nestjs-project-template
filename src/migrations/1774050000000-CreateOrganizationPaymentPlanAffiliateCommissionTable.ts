import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganizationPaymentPlanAffiliateCommissionTable1774050000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`organization_payment_plan_affiliate_commission\` (
        \`id\` varchar(36) NOT NULL,
        \`organization_payment_plan_id\` varchar(36) NOT NULL UNIQUE,
        \`affiliate_customer_id\` varchar(36) NOT NULL,
        \`commission_percentage\` decimal(5,2) NOT NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` timestamp(6) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `organization_payment_plan_affiliate_commission`');
  }
}
