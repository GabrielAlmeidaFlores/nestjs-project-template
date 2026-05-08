import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRetirementPermanentDisabilityRevisionFirstAnalysis1746662400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_result\`
       ADD COLUMN \`retirement_permanent_disability_revision_first_analysis\` LONGTEXT NULL
       AFTER \`id\``,
    );

    await queryRunner.query(`
      CREATE TABLE \`retirement_per_dis_rev_concession_letter_breakdown\` (
        \`id\` varchar(36) NOT NULL,
        \`competence\` varchar(20) NOT NULL,
        \`amount\` decimal(15,2) NOT NULL,
        \`reason_not_considered\` varchar(500) NOT NULL,
        \`action\` varchar(255) NOT NULL,
        \`retirement_permanent_disability_revision_id\` varchar(36) NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_ret_per_dis_rev_concession_breakdown_revision\`
          FOREIGN KEY (\`retirement_permanent_disability_revision_id\`)
          REFERENCES \`retirement_permanent_disability_revision\`(\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_concession_letter_breakdown\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_revision_result\`
       DROP COLUMN \`retirement_permanent_disability_revision_first_analysis\``,
    );
  }
}
