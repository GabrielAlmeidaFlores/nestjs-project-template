import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeathBenefitGrantTimeAcceleratorTable1775828000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`death_benefit_grant_time_accelerator\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`type\` enum ('TEMPO_RURAL','SERVICO_MILITAR','SERVICO_PUBLICO','CTPS','ALUNO_APRENDIZ','TRABALHO_NO_EXTERIOR','TRABALHO_INFORMAL','SENTENCA_TRABALHISTA') NOT NULL,
        \`recognition_inss\` enum ('PROVAVEL','IMPROVAVEL') NOT NULL,
        \`recognition_judicial\` enum ('FAVORAVEL','DESFAVORAVEL','NAO') NOT NULL,
        \`viability\` enum ('ALTA','MEDIA','BAIXA') NOT NULL,
        \`technical_note\` longtext NULL,
        \`start_date\` date NULL,
        \`end_date\` date NULL,
        \`institution\` varchar(255) NULL,
        \`affects_qualifying_period\` tinyint NOT NULL,
        \`death_benefit_grant_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE \`death_benefit_grant_time_accelerator\`
        ADD CONSTRAINT \`FK_death_benefit_grant_time_accelerator_death_benefit_grant\`
        FOREIGN KEY (\`death_benefit_grant_id\`)
        REFERENCES \`death_benefit_grant\`(\`id\`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`death_benefit_grant_time_accelerator\`
        DROP FOREIGN KEY \`FK_death_benefit_grant_time_accelerator_death_benefit_grant\`
    `);

    await queryRunner.query(
      `DROP TABLE \`death_benefit_grant_time_accelerator\``,
    );
  }
}
