import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRetirementPermanentDisabilityRevisionWorkPeriods1746748800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`retirement_permanent_disability_revision_work_periods\` (
        \`id\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        \`bond_origin\` varchar(255) NOT NULL,
        \`start_date\` date NOT NULL,
        \`end_date\` date NULL,
        \`category\` varchar(100) NOT NULL,
        \`competence_below_the_minimum\` tinyint NOT NULL,
        \`pendency_reason\` varchar(255) NULL,
        \`period_consideration\` varchar(255) NULL,
        \`contribution_average\` decimal(10,2) NULL,
        \`status\` tinyint NOT NULL,
        \`grace_period\` int NOT NULL,
        \`retirement_permanent_disability_revision_id\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_ret_per_dis_rev_work_periods_revision\`
          FOREIGN KEY (\`retirement_permanent_disability_revision_id\`)
          REFERENCES \`retirement_permanent_disability_revision\`(\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE \`ret_per_dis_rev_work_periods_earnings_history\` (
        \`id\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        \`competence\` date NULL,
        \`remuneration\` longtext NULL,
        \`indicators\` varchar(255) NULL,
        \`payment_date\` date NULL,
        \`contribution\` varchar(255) NULL,
        \`contribution_salary\` varchar(255) NULL,
        \`competence_below_the_minimum\` tinyint NULL,
        \`retirement_permanent_disability_revision_work_periods_id\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_ret_per_dis_rev_work_periods_earnings_history_work_periods\`
          FOREIGN KEY (\`retirement_permanent_disability_revision_work_periods_id\`)
          REFERENCES \`retirement_permanent_disability_revision_work_periods\`(\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE \`ret_per_dis_rev_work_periods_earnings_history\``,
    );

    await queryRunner.query(
      `DROP TABLE \`retirement_permanent_disability_revision_work_periods\``,
    );
  }
}
