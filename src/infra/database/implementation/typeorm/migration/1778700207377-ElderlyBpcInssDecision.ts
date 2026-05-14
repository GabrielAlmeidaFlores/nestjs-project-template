import { MigrationInterface, QueryRunner } from 'typeorm';

export class ElderlyBpcInssDecision1778700207377 implements MigrationInterface {
  name = 'ElderlyBpcInssDecision1778700207377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_499062d0713a7feb50babf7792\` ON \`retirement_permanent_disability_rejection\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ce8b3c5e19a78c2909393dce0b\` ON \`retirement_permanent_disability_rejection\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9f0a1f9bee92c01a3ea0556abb\` ON \`retirement_permanent_disability_rejection\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`elderly_bpc_rejection_result\` ADD \`inss_decision_analysis\` longtext NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`elderly_bpc_rejection_document\` CHANGE \`type\` \`type\` enum ('cnis', 'cad_unico', 'administrative_proceedings') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`elderly_bpc_rejection_document\` CHANGE \`type\` \`type\` enum ('cnis', 'cad_unico') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`elderly_bpc_rejection_result\` DROP COLUMN \`inss_decision_analysis\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_9f0a1f9bee92c01a3ea0556abb\` ON \`retirement_permanent_disability_rejection\` (\`retirement_permanent_disability_rejection_incapacity_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_ce8b3c5e19a78c2909393dce0b\` ON \`retirement_permanent_disability_rejection\` (\`retirement_permanent_disability_rejection_insured_quality_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_499062d0713a7feb50babf7792\` ON \`retirement_permanent_disability_rejection\` (\`retirement_permanent_disability_rejection_result_id\`)`,
    );
  }
}
