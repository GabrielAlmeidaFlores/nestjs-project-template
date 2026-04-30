import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OptionalFieldCnisDocument1777315159457 implements MigrationInterface {
  name = 'OptionalFieldCnisDocument1777315159457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` CHANGE \`cnis_document\` \`cnis_document\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`special_retirement_grant\` CHANGE \`cnis_document\` \`cnis_document\` varchar(255) NOT NULL`,
    );
  }
}
