import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBankTransferTable1774040000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`bank_transfer\` (
        \`id\` varchar(36) NOT NULL,
        \`bank_external_id\` varchar(255) NULL UNIQUE,
        \`amount\` decimal(10,2) NOT NULL,
        \`status\` varchar(100) NOT NULL,
        \`pix_address_key\` varchar(255) NOT NULL,
        \`pix_address_key_type\` varchar(100) NOT NULL,
        \`transfer_date\` timestamp NULL,
        \`description\` text NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` timestamp(6) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `bank_transfer`');
  }
}
