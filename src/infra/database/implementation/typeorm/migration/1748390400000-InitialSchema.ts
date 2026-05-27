import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1748390400000 implements MigrationInterface {
  protected readonly _type = InitialSchema1748390400000.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`auth_identity\` (
        \`id\` varchar(36) NOT NULL,
        \`email\` varchar(100) NOT NULL,
        \`password\` char(60) NOT NULL,
        \`is_active\` tinyint NOT NULL DEFAULT 1,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        UNIQUE INDEX \`IDX_auth_identity_email\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`auth_identity_id\` varchar(36) NOT NULL,
        \`name\` varchar(100) NOT NULL,
        \`username\` varchar(50) NOT NULL,
        \`bio\` text NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        UNIQUE INDEX \`IDX_users_auth_identity_id\` (\`auth_identity_id\`),
        UNIQUE INDEX \`IDX_users_username\` (\`username\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`posts\` (
        \`id\` varchar(36) NOT NULL,
        \`author_id\` varchar(36) NOT NULL,
        \`content\` text NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        INDEX \`IDX_posts_author_id\` (\`author_id\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`comments\` (
        \`id\` varchar(36) NOT NULL,
        \`post_id\` varchar(36) NOT NULL,
        \`author_id\` varchar(36) NOT NULL,
        \`content\` text NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        INDEX \`IDX_comments_post_id\` (\`post_id\`),
        INDEX \`IDX_comments_author_id\` (\`author_id\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`comments\``);
    await queryRunner.query(`DROP TABLE \`posts\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`auth_identity\``);
  }
}
