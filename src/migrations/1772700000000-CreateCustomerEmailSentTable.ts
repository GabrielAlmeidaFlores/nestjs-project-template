import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerEmailSentTable1772700000000
  implements MigrationInterface
{
  name = 'CreateCustomerEmailSentTable1772700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer_email_sent\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`emails\` text NOT NULL, \`subject\` varchar(255) NOT NULL, \`html_content\` longtext NOT NULL, \`sent_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` ADD CONSTRAINT \`FK_364942f94d78d35288f43ece6d7\` FOREIGN KEY (\`sent_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` DROP FOREIGN KEY \`FK_364942f94d78d35288f43ece6d7\``,
    );
    await queryRunner.query(`DROP TABLE \`customer_email_sent\``);
  }
}
