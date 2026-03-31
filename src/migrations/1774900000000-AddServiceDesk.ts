import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddServiceDesk1774900000000 implements MigrationInterface {
  public name = 'AddServiceDesk1774900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` MODIFY COLUMN \`federal_document\` varchar(50) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD COLUMN \`support_attendant_id\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD COLUMN \`must_change_password\` tinyint(1) NOT NULL DEFAULT 0`,
    );

    await queryRunner.query(
      `CREATE TABLE \`support_attendant\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`support_type\` varchar(50) NOT NULL,
        \`is_active\` tinyint(1) NOT NULL DEFAULT 1,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    );

    await queryRunner.query(
      `CREATE TABLE \`support_ticket\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`organization_id\` varchar(36) NOT NULL,
        \`requester_auth_identity_id\` varchar(36) NOT NULL,
        \`requester_email\` varchar(255) NOT NULL,
        \`requester_name\` varchar(255) NOT NULL,
        \`ticket_number\` varchar(8) NOT NULL,
        \`support_type\` varchar(50) NOT NULL,
        \`subject\` varchar(255) NOT NULL,
        \`problem\` varchar(100) NOT NULL,
        \`description\` longtext NOT NULL,
        \`status\` varchar(50) NOT NULL,
        \`assigned_attendant_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`UQ_support_ticket_org_number\` (\`organization_id\`, \`ticket_number\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    );

    await queryRunner.query(
      `CREATE TABLE \`support_ticket_attachment\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`support_ticket_id\` varchar(36) NOT NULL,
        \`bucket_key\` varchar(500) NOT NULL,
        \`original_file_name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    );

    await queryRunner.query(
      `CREATE TABLE \`support_ticket_message\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`support_ticket_id\` varchar(36) NOT NULL,
        \`sender_auth_identity_id\` varchar(36) NOT NULL,
        \`sender_name\` varchar(255) NOT NULL,
        \`sender_type\` varchar(50) NOT NULL,
        \`content\` longtext NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` ADD CONSTRAINT \`FK_auth_identity_support_attendant\` FOREIGN KEY (\`support_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` ADD CONSTRAINT \`FK_support_ticket_assigned_attendant\` FOREIGN KEY (\`assigned_attendant_id\`) REFERENCES \`support_attendant\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` ADD CONSTRAINT \`FK_support_ticket_attachment_ticket\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` ADD CONSTRAINT \`FK_support_ticket_message_ticket\` FOREIGN KEY (\`support_ticket_id\`) REFERENCES \`support_ticket\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket_message\` DROP FOREIGN KEY \`FK_support_ticket_message_ticket\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket_attachment\` DROP FOREIGN KEY \`FK_support_ticket_attachment_ticket\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` DROP FOREIGN KEY \`FK_support_ticket_assigned_attendant\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP FOREIGN KEY \`FK_auth_identity_support_attendant\``,
    );

    await queryRunner.query(`DROP TABLE \`support_ticket_message\``);
    await queryRunner.query(`DROP TABLE \`support_ticket_attachment\``);
    await queryRunner.query(`DROP TABLE \`support_ticket\``);
    await queryRunner.query(`DROP TABLE \`support_attendant\``);

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP COLUMN \`must_change_password\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` DROP COLUMN \`support_attendant_id\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`auth_identity\` MODIFY COLUMN \`federal_document\` varchar(50) NOT NULL`,
    );
  }
}
