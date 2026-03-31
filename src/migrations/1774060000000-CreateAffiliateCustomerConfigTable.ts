import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAffiliateCustomerConfigTable1774060000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`affiliate_customer_config\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` timestamp(6) NULL,
        \`config\` enum('TRANSFER_DAY_OF_MONTH') NOT NULL,
        \`value\` varchar(255) NOT NULL,
        UNIQUE INDEX \`UQ_acc_config\` (\`config\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE \`affiliate_customer_config\``,
    );
  }
}
