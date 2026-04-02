import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemLogsTable1773950000000 implements MigrationInterface {
  public name = 'CreateSystemLogsTable1773950000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`system_logs\` (
        \`id\` varchar(36) NOT NULL,
        \`code\` int NOT NULL,
        \`endpoint\` varchar(500) NOT NULL,
        \`data\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`stack_trace\` text NULL,
        \`is_error\` tinyint(1) NOT NULL,
        \`request_body\` longtext NULL,
        \`response_body\` longtext NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`system_logs\``);
  }
}
