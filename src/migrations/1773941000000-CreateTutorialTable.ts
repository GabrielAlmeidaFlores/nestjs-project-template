import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTutorialTable1773941000000 implements MigrationInterface {
  public name = 'CreateTutorialTable1773941000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`tutorial\` (
        \`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`link\` varchar(500) NOT NULL,
        \`functionality\` varchar(100) NOT NULL,
        \`description\` text NOT NULL,
        \`image\` varchar(255) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`tutorial\``);
  }
}
