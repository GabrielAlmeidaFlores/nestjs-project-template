import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAnalyzedAtToRuralTimelinePeriodDocument1771260000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rural_timeline_period_document',
      new TableColumn({
        name: 'analyzed_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'rural_timeline_period_document',
      'analyzed_at',
    );
  }
}
