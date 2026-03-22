import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAffiliateBankTransferTable1774040000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`affiliate_bank_transfer\` (
        \`id\` varchar(36) NOT NULL,
        \`affiliate_customer_id\` varchar(36) NOT NULL,
        \`bank_payment_id\` varchar(36) NOT NULL,
        \`organization_payment_plan_id\` varchar(36) NOT NULL,
        \`bank_transfer_id\` varchar(36) NOT NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` timestamp(6) NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_abt_affiliate_customer\` FOREIGN KEY (\`affiliate_customer_id\`) REFERENCES \`affiliate_customer\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_abt_bank_payment\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_abt_organization_payment_plan\` FOREIGN KEY (\`organization_payment_plan_id\`) REFERENCES \`organization_payment_plan\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_abt_bank_transfer\` FOREIGN KEY (\`bank_transfer_id\`) REFERENCES \`bank_transfer\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `affiliate_bank_transfer`');
  }
}
