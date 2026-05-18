import { TableForeignKey } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RestoreDeathBenefitRejectionColumnOnAnalysisToolRecord1781000000001 implements MigrationInterface {
  public readonly name =
    'RestoreDeathBenefitRejectionColumnOnAnalysisToolRecord1781000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const columnName = 'death_benefit_rejection_id';
    const tableName = 'analysis_tool_record';

    const hasDeathBenefitRejectionIdColumn = await queryRunner.hasColumn(
      tableName,
      columnName,
    );

    if (!hasDeathBenefitRejectionIdColumn) {
      await queryRunner.query(
        `ALTER TABLE \`${tableName}\` ADD \`${columnName}\` varchar(36) NULL`,
      );
    }

    const table = await queryRunner.getTable(tableName);

    const hasDeathBenefitRejectionForeignKey =
      table?.foreignKeys.some(
        (foreignKey) =>
          foreignKey.columnNames.length === 1 &&
          foreignKey.columnNames[0] === columnName,
      ) ?? false;

    if (!hasDeathBenefitRejectionForeignKey) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          name: 'FK_78ea3849a680ec7aca5f92912ef',
          columnNames: [columnName],
          referencedTableName: 'death_benefit_rejection',
          referencedColumnNames: ['id'],
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const columnName = 'death_benefit_rejection_id';
    const tableName = 'analysis_tool_record';

    const table = await queryRunner.getTable(tableName);

    const deathBenefitRejectionForeignKey = table?.foreignKeys.find(
      (foreignKey) =>
        foreignKey.columnNames.length === 1 &&
        foreignKey.columnNames[0] === columnName,
    );

    if (deathBenefitRejectionForeignKey) {
      await queryRunner.dropForeignKey(
        tableName,
        deathBenefitRejectionForeignKey,
      );
    }

    const hasDeathBenefitRejectionIdColumn = await queryRunner.hasColumn(
      tableName,
      columnName,
    );

    if (hasDeathBenefitRejectionIdColumn) {
      await queryRunner.query(
        `ALTER TABLE \`${tableName}\` DROP COLUMN \`${columnName}\``,
      );
    }
  }
}
