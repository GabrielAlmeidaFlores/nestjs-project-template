import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmailTemplateTable1772720000000
  implements MigrationInterface
{
  name = 'CreateEmailTemplateTable1772720000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`email_template\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`owner_id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`html_content\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`email_template\` ADD CONSTRAINT \`FK_email_template_owner\` FOREIGN KEY (\`owner_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`email_template\` DROP FOREIGN KEY \`FK_email_template_owner\``,
    );
    await queryRunner.query(`DROP TABLE \`email_template\``);
  }
}

