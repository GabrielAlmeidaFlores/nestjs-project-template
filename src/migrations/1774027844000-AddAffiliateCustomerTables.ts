import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAffiliateCustomerTables1774027844000 implements MigrationInterface {
  name = 'AddAffiliateCustomerTables1774027844000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`affiliate_customer\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`pix_address_key\` varchar(255) NULL, \`pix_address_key_type\` varchar(100) NULL, \`payment_commission_percentage\` int NOT NULL, \`payment_plan_discount_percentage\` int NOT NULL, \`payment_plan_discount_valid_until\` date NOT NULL, \`payment_plan_discount_redemption_limit\` int NOT NULL, \`customer_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`affiliate_customer_payment_plan\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`affiliate_customer_id\` varchar(36) NULL, \`payment_plan_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` ADD CONSTRAINT \`FK_affiliate_customer_customer_id\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_affiliate_customer_payment_plan_affiliate_customer_id\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` ADD CONSTRAINT \`FK_affiliate_customer_payment_plan_payment_plan_id\` FOREIGN KEY (\`payment_plan_id\`) REFERENCES \`payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_affiliate_customer_payment_plan_payment_plan_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer_payment_plan\` DROP FOREIGN KEY \`FK_affiliate_customer_payment_plan_affiliate_customer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_customer\` DROP FOREIGN KEY \`FK_affiliate_customer_customer_id\``,
    );
    await queryRunner.query(`DROP TABLE \`affiliate_customer_payment_plan\``);
    await queryRunner.query(`DROP TABLE \`affiliate_customer\``);
  }
}
