import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsSimplifiedAndCustomerEmailSentAttachments1772710000000
  implements MigrationInterface
{
  name = 'AddIsSimplifiedAndCustomerEmailSentAttachments1772710000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` ADD \`is_simplified\` tinyint NOT NULL DEFAULT 0`,
    );

    await queryRunner.query(
      `CREATE TABLE \`customer_email_sent_attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`customer_email_sent_id\` varchar(36) NOT NULL, \`analysis_tool_record_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`) ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_customer_email_sent_attachment_customer_email_sent\` FOREIGN KEY (\`customer_email_sent_id\`) REFERENCES \`customer_email_sent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` ADD CONSTRAINT \`FK_customer_email_sent_attachment_analysis_tool_record\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_customer_email_sent_attachment_analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent_attachment\` DROP FOREIGN KEY \`FK_customer_email_sent_attachment_customer_email_sent\``,
    );
    await queryRunner.query(`DROP TABLE \`customer_email_sent_attachment\``);
    await queryRunner.query(
      `ALTER TABLE \`customer_email_sent\` DROP COLUMN \`is_simplified\``,
    );
  }
}

