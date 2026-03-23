import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAffiliateBankTransferTable1774050000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `affiliate_bank_transfer`');
    await queryRunner.query(
      `CREATE TABLE \`affiliate_bank_transfer\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`affiliate_plan_commission_id\` varchar(36) NULL, \`bank_payment_id\` varchar(36) NULL, \`bank_transfer_id\` varchar(36) NULL, UNIQUE INDEX \`UQ_abt_bank_payment\` (\`bank_payment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_commission\` FOREIGN KEY (\`affiliate_plan_commission_id\`) REFERENCES \`organization_payment_plan_affiliate_commission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_bank_payment\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` ADD CONSTRAINT \`FK_abt_bank_transfer\` FOREIGN KEY (\`bank_transfer_id\`) REFERENCES \`bank_transfer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_bank_transfer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_bank_payment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`affiliate_bank_transfer\` DROP FOREIGN KEY \`FK_abt_commission\``,
    );
    await queryRunner.query('DROP TABLE `affiliate_bank_transfer`');
    await queryRunner.query(
      `CREATE TABLE \`affiliate_bank_transfer\` (\`id\` varchar(36) NOT NULL, \`affiliate_customer_id\` varchar(36) NOT NULL, \`bank_payment_id\` varchar(36) NOT NULL, \`organization_payment_plan_id\` varchar(36) NOT NULL, \`bank_transfer_id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }
}
