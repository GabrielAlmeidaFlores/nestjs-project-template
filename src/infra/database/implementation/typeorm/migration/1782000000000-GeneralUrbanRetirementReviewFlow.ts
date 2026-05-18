import type { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class GeneralUrbanRetirementReviewFlow1782000000000 implements MigrationInterface {
  public readonly name = 'GeneralUrbanRetirementReviewFlow1782000000000';

  private readonly reviewResourceValues = [
    'GENERAL_URBAN_RETIREMENT_REVIEW_CNIS_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_BENEFIT_AWARD_LETTER_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_FIRST_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_COMPARE_CNIS_CTPS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_SPECIAL_PERIOD_PPP_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_NO_END_DATE_DOCUMENTS_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_RURAL_TIME_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_MILITARY_SERVICE_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_PUBLIC_SERVICE_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_CTPS_OUTSIDE_CNIS_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_STUDENT_APPRENTICE_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_WORK_ABROAD_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_INFORMAL_WORK_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_LABOR_COURT_DECISION_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_COMPLETE_ANALYSIS',
    'GENERAL_URBAN_RETIREMENT_REVIEW_SIMPLIFIED_ANALYSIS',
  ];

  private readonly reviewAnalysisToolRecordType =
    'revisao_aposentadoria_urbana_geral';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_result\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`client_name\` varchar(255) NULL,
        \`client_federal_document\` varchar(50) NULL,
        \`client_birth_date\` date NULL,
        \`client_last_affiliation_date\` date NULL,
        \`compare_cnis_ctps\` longtext NULL,
        \`compare_cnis_ctps_raw\` longtext NULL,
        \`benefit_award_letter_analysis\` longtext NULL,
        \`benefit_award_letter_analysis_raw\` longtext NULL,
        \`first_analysis\` longtext NULL,
        \`general_urban_retirement_review_complete_analysis\` longtext NULL,
        \`general_urban_retirement_review_simplified_analysis\` longtext NULL,
        \`general_urban_retirement_review_complete_analysis_download\` longtext NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`cnis_document\` varchar(255) NULL,
        \`benefit_award_letter_document\` varchar(255) NULL,
        \`analysis_name\` varchar(255) NULL,
        \`category\` varchar(255) NULL,
        \`my_inss_password\` varchar(500) NULL,
        \`general_urban_retirement_review_result_id\` varchar(36) NULL,
        UNIQUE INDEX \`REL_gurr_review_result_id\` (\`general_urban_retirement_review_result_id\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_document\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`document\` varchar(255) NOT NULL,
        \`type\` enum ('ADMINISTRATIVE_PROCEDURE', 'CNIS', 'CONTRIBUTIVE_PROFILE_SUMMARY', 'OTHER') NOT NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_inss_benefit\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`inss_benefit_number\` varchar(100) NOT NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_legal_proceeding\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`legal_proceeding_number\` varchar(100) NOT NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_period\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`period_name\` varchar(255) NULL,
        \`period_start\` date NULL,
        \`period_end\` date NULL,
        \`category\` varchar(100) NULL,
        \`is_pendency\` tinyint NULL,
        \`reason_pendency\` enum ('LEAVE_DATE', 'COMPETENCE_BELOW_MINIMUM', 'INCONSISTENT_COMPETENCE') NULL,
        \`competence_below_the_minimum\` tinyint NULL,
        \`contribution_average\` decimal(10,2) NULL,
        \`type_of_contribution\` varchar(100) NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        \`status\` tinyint NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_period_document\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`document\` varchar(255) NOT NULL,
        \`general_urban_retirement_review_period_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_period_earnings_history\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`competence\` date NULL,
        \`remuneration\` longtext NULL,
        \`indicators\` varchar(255) NULL,
        \`payment_date\` date NULL,
        \`contribution\` varchar(255) NULL,
        \`contribution_salary\` varchar(255) NULL,
        \`analysis\` longtext NULL,
        \`general_urban_retirement_review_period_id\` varchar(36) NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        \`competence_below_the_minimum\` tinyint NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_analysis_result\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`analysis_type\` enum ('tempo_rural', 'servico_militar', 'servico_publico', 'ctps_fora_do_cnis', 'aluno_aprendiz', 'trabalho_no_exterior', 'trabalho_informal', 'sentenca_trabalhista') NULL,
        \`response\` longtext NOT NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_time_accelerator\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`time_type\` varchar(100) NOT NULL,
        \`recognition_inss\` varchar(255) NOT NULL,
        \`recognition_judicial\` varchar(255) NOT NULL,
        \`name\` varchar(255) NULL,
        \`institution\` varchar(255) NULL,
        \`period_start\` date NULL,
        \`period_end\` date NULL,
        \`affects_qualifying_period\` tinyint NULL,
        \`time_gained\` varchar(100) NULL,
        \`viability\` varchar(50) NULL,
        \`technical_note\` longtext NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`general_urban_retirement_review_special_period\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`response\` longtext NOT NULL,
        \`general_urban_retirement_review_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`general_urban_retirement_review_id\` varchar(36) NULL`,
    );

    await this.appendEnumValues(
      queryRunner,
      'payment_plan_paid_resource',
      'resource',
      this.reviewResourceValues,
    );
    await this.appendEnumValues(queryRunner, 'analysis_tool_record', 'type', [
      this.reviewAnalysisToolRecordType,
    ]);

    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review\` ADD CONSTRAINT \`FK_gurr_result_id\` FOREIGN KEY (\`general_urban_retirement_review_result_id\`) REFERENCES \`general_urban_retirement_review_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_document\` ADD CONSTRAINT \`FK_gurr_document_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_inss_benefit\` ADD CONSTRAINT \`FK_gurr_inss_benefit_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_legal_proceeding\` ADD CONSTRAINT \`FK_gurr_legal_proceeding_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period\` ADD CONSTRAINT \`FK_gurr_period_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_document\` ADD CONSTRAINT \`FK_gurr_period_document_period_id\` FOREIGN KEY (\`general_urban_retirement_review_period_id\`) REFERENCES \`general_urban_retirement_review_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` ADD CONSTRAINT \`FK_gurr_earnings_history_period_id\` FOREIGN KEY (\`general_urban_retirement_review_period_id\`) REFERENCES \`general_urban_retirement_review_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` ADD CONSTRAINT \`FK_gurr_earnings_history_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_analysis_result\` ADD CONSTRAINT \`FK_gurr_analysis_result_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_time_accelerator\` ADD CONSTRAINT \`FK_gurr_time_accelerator_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_special_period\` ADD CONSTRAINT \`FK_gurr_special_period_review_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_gurr_id\` FOREIGN KEY (\`general_urban_retirement_review_id\`) REFERENCES \`general_urban_retirement_review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_gurr_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_special_period\` DROP FOREIGN KEY \`FK_gurr_special_period_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_time_accelerator\` DROP FOREIGN KEY \`FK_gurr_time_accelerator_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_analysis_result\` DROP FOREIGN KEY \`FK_gurr_analysis_result_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` DROP FOREIGN KEY \`FK_gurr_earnings_history_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_earnings_history\` DROP FOREIGN KEY \`FK_gurr_earnings_history_period_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period_document\` DROP FOREIGN KEY \`FK_gurr_period_document_period_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_period\` DROP FOREIGN KEY \`FK_gurr_period_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_legal_proceeding\` DROP FOREIGN KEY \`FK_gurr_legal_proceeding_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_inss_benefit\` DROP FOREIGN KEY \`FK_gurr_inss_benefit_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review_document\` DROP FOREIGN KEY \`FK_gurr_document_review_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`general_urban_retirement_review\` DROP FOREIGN KEY \`FK_gurr_result_id\``,
    );

    await queryRunner.query(
      `UPDATE \`analysis_tool_record\`
        SET \`type\` = 'analise_aposentadoria_urbana_geral',
            \`general_urban_retirement_review_id\` = NULL
      WHERE \`type\` = '${this.reviewAnalysisToolRecordType}'`,
    );

    await queryRunner.query(
      `DELETE pppric
      FROM \`payment_plan_paid_resource_ia_config\` pppric
      INNER JOIN \`payment_plan_paid_resource\` pppr
        ON pppr.\`id\` = pppric.\`payment_plan_paid_resource_id\`
      WHERE pppr.\`resource\` IN (${this.reviewResourceValues
        .map((value) => this.quoteSqlValue(value))
        .join(', ')})`,
    );
    await queryRunner.query(
      `DELETE ocu
      FROM \`organization_credit_usage\` ocu
      INNER JOIN \`payment_plan_paid_resource\` pppr
        ON pppr.\`id\` = ocu.\`payment_plan_paid_resource_id\`
      WHERE pppr.\`resource\` IN (${this.reviewResourceValues
        .map((value) => this.quoteSqlValue(value))
        .join(', ')})`,
    );
    await queryRunner.query(
      `DELETE pper
      FROM \`payment_plan_enabled_paid_resource\` pper
      INNER JOIN \`payment_plan_paid_resource\` pppr
        ON pppr.\`id\` = pper.\`payment_plan_paid_resource_id\`
      WHERE pppr.\`resource\` IN (${this.reviewResourceValues
        .map((value) => this.quoteSqlValue(value))
        .join(', ')})`,
    );
    await queryRunner.query(
      `DELETE opper
      FROM \`organization_payment_plan_enabled_paid_resource\` opper
      INNER JOIN \`payment_plan_paid_resource\` pppr
        ON pppr.\`id\` = opper.\`payment_plan_paid_resource_id\`
      WHERE pppr.\`resource\` IN (${this.reviewResourceValues
        .map((value) => this.quoteSqlValue(value))
        .join(', ')})`,
    );
    await queryRunner.query(
      `DELETE FROM \`payment_plan_paid_resource\`
      WHERE \`resource\` IN (${this.reviewResourceValues
        .map((value) => this.quoteSqlValue(value))
        .join(', ')})`,
    );

    await this.removeEnumValues(queryRunner, 'analysis_tool_record', 'type', [
      this.reviewAnalysisToolRecordType,
    ]);
    await this.removeEnumValues(
      queryRunner,
      'payment_plan_paid_resource',
      'resource',
      this.reviewResourceValues,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`general_urban_retirement_review_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_gurr_review_result_id\` ON \`general_urban_retirement_review\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_special_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_time_accelerator\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_analysis_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_period_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_document\``,
    );
    await queryRunner.query(`DROP TABLE \`general_urban_retirement_review\``);
    await queryRunner.query(
      `DROP TABLE \`general_urban_retirement_review_result\``,
    );
  }

  private async appendEnumValues(
    queryRunner: QueryRunner,
    tableName: string,
    columnName: string,
    valuesToAppend: string[],
  ): Promise<void> {
    const column = await this.getColumnMetadata(
      queryRunner,
      tableName,
      columnName,
    );
    const currentValues = this.parseEnumValues(column.Type);
    const nextValues = [...new Set([...currentValues, ...valuesToAppend])];

    await this.changeEnumValues(
      queryRunner,
      tableName,
      columnName,
      nextValues,
      column,
    );
  }

  private async removeEnumValues(
    queryRunner: QueryRunner,
    tableName: string,
    columnName: string,
    valuesToRemove: string[],
  ): Promise<void> {
    const column = await this.getColumnMetadata(
      queryRunner,
      tableName,
      columnName,
    );
    const nextValues = this.parseEnumValues(column.Type).filter(
      (value) => !valuesToRemove.includes(value),
    );

    await this.changeEnumValues(
      queryRunner,
      tableName,
      columnName,
      nextValues,
      column,
    );
  }

  private async changeEnumValues(
    queryRunner: QueryRunner,
    tableName: string,
    columnName: string,
    values: string[],
    column: MysqlShowColumnType,
  ): Promise<void> {
    const nullability = column.Null === 'YES' ? 'NULL' : 'NOT NULL';
    const defaultClause =
      column.Default !== null && column.Default !== undefined
        ? ` DEFAULT ${this.quoteSqlValue(String(column.Default))}`
        : '';

    await queryRunner.query(
      `ALTER TABLE \`${tableName}\` CHANGE \`${columnName}\` \`${columnName}\` enum(${values
        .map((value) => this.quoteSqlValue(value))
        .join(', ')}) ${nullability}${defaultClause}`,
    );
  }

  private async getColumnMetadata(
    queryRunner: QueryRunner,
    tableName: string,
    columnName: string,
  ): Promise<MysqlShowColumnType> {
    const [column] = (await queryRunner.query(
      `SHOW COLUMNS FROM \`${tableName}\` LIKE '${columnName}'`,
    )) as MysqlShowColumnType[];

    if (column === undefined) {
      throw new Error(
        `Column ${tableName}.${columnName} was not found during migration.`,
      );
    }

    return column;
  }

  private parseEnumValues(type: string): string[] {
    const matches = [...type.matchAll(/'((?:[^'\\\\]|\\\\.)*)'/g)];

    return matches.map((match) => (match[1] ?? '').replace(/\\\\'/g, "'"));
  }

  private quoteSqlValue(value: string): string {
    return `'${value.replace(/'/g, "''")}'`;
  }
}

type MysqlShowColumnType = {
  Field: TableColumn['name'];
  Type: string;
  Null: 'YES' | 'NO';
  Key: string;
  Default: string | null;
  Extra: string;
};
