import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganizationPaymentPlanAffiliateCommissionTable1774050000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_payment_plan_affiliate_commission\` (\`id\` varchar(36) NOT NULL, \`commission_percentage\` decimal(5,2) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`organization_payment_plan_id\` varchar(36) NULL, \`affiliate_customer_id\` varchar(36) NULL, UNIQUE INDEX \`UQ_opp_affiliate_commission_plan\` (\`organization_payment_plan_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_opp_affiliate_commission_plan\` FOREIGN KEY (\`organization_payment_plan_id\`) REFERENCES \`organization_payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` ADD CONSTRAINT \`FK_opp_affiliate_commission_affiliate\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_opp_affiliate_commission_affiliate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan_affiliate_commission\` DROP FOREIGN KEY \`FK_opp_affiliate_commission_plan\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UQ_opp_affiliate_commission_plan\` ON \`organization_payment_plan_affiliate_commission\``,
    );
    await queryRunner.query(
      `DROP TABLE \`organization_payment_plan_affiliate_commission\``,
    );
  }
}
