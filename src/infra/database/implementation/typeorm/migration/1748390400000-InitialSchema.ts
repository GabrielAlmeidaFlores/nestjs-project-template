import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1748390400000 implements MigrationInterface {
  protected readonly _type = InitialSchema1748390400000.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "auth_identity" (
        "id"         uuid          NOT NULL,
        "email"      varchar(100)  NOT NULL,
        "password"   char(60)      NOT NULL,
        "is_active"  boolean       NOT NULL DEFAULT true,
        "created_at" TIMESTAMP     NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP     NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_auth_identity"       PRIMARY KEY ("id"),
        CONSTRAINT "UQ_auth_identity_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"               uuid         NOT NULL,
        "auth_identity_id" uuid         NOT NULL,
        "name"             varchar(100) NOT NULL,
        "username"         varchar(50)  NOT NULL,
        "bio"              text,
        "created_at"       TIMESTAMP    NOT NULL DEFAULT now(),
        "updated_at"       TIMESTAMP    NOT NULL DEFAULT now(),
        "deleted_at"       TIMESTAMP,
        CONSTRAINT "PK_users"                    PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_auth_identity_id"   UNIQUE ("auth_identity_id"),
        CONSTRAINT "UQ_users_username"           UNIQUE ("username")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id"         uuid      NOT NULL,
        "author_id"  uuid      NOT NULL,
        "content"    text      NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_posts" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_posts_author_id" ON "posts" ("author_id")`,
    );

    await queryRunner.query(`
      CREATE TABLE "comments" (
        "id"         uuid      NOT NULL,
        "post_id"    uuid      NOT NULL,
        "author_id"  uuid      NOT NULL,
        "content"    text      NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_comments" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_post_id"    ON "comments" ("post_id")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_author_id"  ON "comments" ("author_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "auth_identity"`);
  }
}
