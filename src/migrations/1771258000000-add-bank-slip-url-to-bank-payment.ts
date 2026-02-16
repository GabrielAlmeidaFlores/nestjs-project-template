import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddBankSlipUrlToBankPayment1771258000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bank_payment',
      new TableColumn({
        name: 'bank_slip_url',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'bank_payment',
      new TableColumn({
        name: 'bank_slip_code',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bank_payment', 'bank_slip_url');
    await queryRunner.dropColumn('bank_payment', 'bank_slip_code');
  }
}
