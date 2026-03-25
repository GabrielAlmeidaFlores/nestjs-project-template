import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganizationCustomizationTables1774500000000
  implements MigrationInterface
{
  name = 'CreateOrganizationCustomizationTables1774500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_customization_document_header_template\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`type\` enum('modern','classic','standout_classic','modern_standout') NOT NULL,
        \`html_content\` text NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`organization_customization_document_footer_template\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`type\` enum('modern','classic') NOT NULL,
        \`html_content\` text NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`organization_customization\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`organization_logo\` varchar(255) NOT NULL,
        \`organization_customization_document_footer_description\` text NULL,
        \`primary_color\` varchar(50) NOT NULL,
        \`secondary_color\` varchar(50) NOT NULL,
        \`tertiary_color\` varchar(50) NOT NULL,
        \`organization_id\` varchar(36) NULL,
        \`organization_customization_document_header_template_id\` varchar(36) NOT NULL,
        \`organization_customization_document_footer_template_id\` varchar(36) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`organization_customization\`
        ADD CONSTRAINT \`FK_org_customization_organization\`
        FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`)
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`organization_customization\`
        ADD CONSTRAINT \`FK_org_customization_header_template\`
        FOREIGN KEY (\`organization_customization_document_header_template_id\`)
        REFERENCES \`organization_customization_document_header_template\`(\`id\`)
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`organization_customization\`
        ADD CONSTRAINT \`FK_org_customization_footer_template\`
        FOREIGN KEY (\`organization_customization_document_footer_template_id\`)
        REFERENCES \`organization_customization_document_footer_template\`(\`id\`)
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_footer_template\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_header_template\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_customization\` DROP FOREIGN KEY \`FK_org_customization_organization\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_customization\``);
    await queryRunner.query(
      `DROP TABLE \`organization_customization_document_footer_template\``,
    );
    await queryRunner.query(
      `DROP TABLE \`organization_customization_document_header_template\``,
    );
  }
}
