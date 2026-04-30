import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccidentAssistanceTerminatedPeriodDocumentTable1682700000000 implements MigrationInterface {
  name = 'CreateAccidentAssistanceTerminatedPeriodDocumentTable1682700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`accident_assistance_terminated_period_document\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`document\` varchar(255) NULL,
        \`accident_assistance_terminated_period_id\` varchar(36) NULL,

        PRIMARY KEY (\`id\`),

        CONSTRAINT \`FK_accident_assistance_terminated_period_document_period\`
        FOREIGN KEY (\`accident_assistance_terminated_period_id\`)
        REFERENCES \`accident_assistance_terminated_period\`(\`id\`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE \`accident_assistance_terminated_period_document\`;
    `);
  }
}
