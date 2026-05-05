import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRetirementPlanningRppsCtpsDocumentType1781000000003 implements MigrationInterface {
  public name = 'FixRetirementPlanningRppsCtpsDocumentType1781000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`retirement_planning_rpps_period_document\`
      MODIFY \`document_type\` enum('ctc_document','ppp','cpts','ctps','ltcat','judicial','medico','outros','outros_medicos')
      NOT NULL DEFAULT 'outros'
    `);

    await queryRunner.query(`
      UPDATE \`retirement_planning_rpps_period_document\`
      SET \`document_type\` = 'ctps'
      WHERE \`document_type\` = 'cpts'
    `);

    await queryRunner.query(`
      ALTER TABLE \`retirement_planning_rpps_period_document\`
      MODIFY \`document_type\` enum('ctc_document','ppp','ctps','ltcat','judicial','medico','outros','outros_medicos')
      NOT NULL DEFAULT 'outros'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`retirement_planning_rpps_period_document\`
      MODIFY \`document_type\` enum('ctc_document','ppp','cpts','ctps','ltcat','judicial','medico','outros','outros_medicos')
      NOT NULL DEFAULT 'outros'
    `);

    await queryRunner.query(`
      UPDATE \`retirement_planning_rpps_period_document\`
      SET \`document_type\` = 'cpts'
      WHERE \`document_type\` = 'ctps'
    `);

    await queryRunner.query(`
      ALTER TABLE \`retirement_planning_rpps_period_document\`
      MODIFY \`document_type\` enum('ctc_document','ppp','cpts','ltcat','judicial','medico','outros','outros_medicos')
      NOT NULL DEFAULT 'outros'
    `);
  }
}
