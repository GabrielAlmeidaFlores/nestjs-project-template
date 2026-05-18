import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveAccidentAssistanceTerminatedDibDcbFromBenefitToParent1777388400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated ADD COLUMN dib DATE NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated ADD COLUMN dcb DATE NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated_benefit DROP COLUMN dib`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated_benefit DROP COLUMN dcb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated_benefit ADD COLUMN dib DATE NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated_benefit ADD COLUMN dcb DATE NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated DROP COLUMN dib`,
    );

    await queryRunner.query(
      `ALTER TABLE accident_assistance_terminated DROP COLUMN dcb`,
    );
  }
}
