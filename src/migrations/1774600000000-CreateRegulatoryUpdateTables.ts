import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRegulatoryUpdateTables1774600000000
  implements MigrationInterface
{
  name = 'CreateRegulatoryUpdateTables1774600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`regulatory_update\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`title\` varchar(255) NOT NULL,
        \`summary\` text NOT NULL,
        \`main_changes\` text NOT NULL,
        \`implementation_status\` text NOT NULL,
        \`beneficiary_impact\` text NOT NULL,
        \`full_text\` longtext NOT NULL,
        \`source_url\` varchar(500) NULL,
        \`published_at\` date NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`regulatory_update_email_preference\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`email_enabled\` tinyint NOT NULL DEFAULT 0,
        \`customer_id\` varchar(36) NOT NULL,
        UNIQUE INDEX \`IDX_regulatory_update_email_preference_customer_id\` (\`customer_id\`),
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_regulatory_update_email_preference_customer\`
          FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\` (\`id\`)
          ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`regulatory_update_monitored_source\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`name\` varchar(255) NOT NULL,
        \`url\` varchar(500) NOT NULL,
        \`active\` tinyint NOT NULL DEFAULT 1,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE \`regulatory_update_monitored_source\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`regulatory_update_email_preference\` DROP FOREIGN KEY \`FK_regulatory_update_email_preference_customer\``,
    );
    await queryRunner.query(
      `DROP TABLE \`regulatory_update_email_preference\``,
    );
    await queryRunner.query(`DROP TABLE \`regulatory_update\``);
  }
}
