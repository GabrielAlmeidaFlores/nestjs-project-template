import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLegalPleadingDocumentAnalysisColumnToLongtext1771630000000 implements MigrationInterface {
  name = 'ChangeLegalPleadingDocumentAnalysisColumnToLongtext1771630000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`legal_pleading_document_analysis\` MODIFY COLUMN \`analysis\` LONGTEXT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`legal_pleading_document_analysis\` MODIFY COLUMN \`analysis\` TEXT NULL`,
    );
  }
}
