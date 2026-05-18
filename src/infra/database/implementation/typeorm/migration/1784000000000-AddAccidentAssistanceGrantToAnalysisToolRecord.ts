import type { MigrationInterface, QueryRunner } from 'typeorm';

type MysqlShowColumnType = {
  Field: string;
  Type: string;
  Null: 'YES' | 'NO';
  Key: string;
  Default: string | null;
  Extra: string;
};

export class AddAccidentAssistanceGrantToAnalysisToolRecord1784000000000
  implements MigrationInterface
{
  public readonly name =
    'AddAccidentAssistanceGrantToAnalysisToolRecord1784000000000';

  private readonly enumValue = 'concessao_auxilio_acidente';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`accident_assistance_grant_id\` varchar(36) NULL`,
    );

    await this.appendEnumValues(queryRunner, 'analysis_tool_record', 'type', [
      this.enumValue,
    ]);

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_accident_assistance_grant\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_accident_assistance_grant\``,
    );

    await this.removeEnumValues(queryRunner, 'analysis_tool_record', 'type', [
      this.enumValue,
    ]);

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`accident_assistance_grant_id\``,
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
