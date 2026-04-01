import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeHasContributedWithInssToBoolean1774410000000
  implements MigrationInterface
{
  public readonly name =
    'ChangeHasContributedWithInssToBoolean1774410000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` MODIFY \`has_contributed_with_inss\` tinyint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` MODIFY \`has_contributed_with_inss\` varchar(255) NOT NULL`,
    );
  }
}
