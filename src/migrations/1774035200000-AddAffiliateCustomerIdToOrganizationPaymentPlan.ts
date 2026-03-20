import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAffiliateCustomerIdToOrganizationPaymentPlan1774035200000
  implements MigrationInterface
{
  name =
    'AddAffiliateCustomerIdToOrganizationPaymentPlan1774035200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan\` ADD \`affiliate_customer_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan\` ADD CONSTRAINT \`FK_opp_affiliate_customer_id\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan\` DROP FOREIGN KEY \`FK_opp_affiliate_customer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_payment_plan\` DROP COLUMN \`affiliate_customer_id\``,
    );
  }
}
