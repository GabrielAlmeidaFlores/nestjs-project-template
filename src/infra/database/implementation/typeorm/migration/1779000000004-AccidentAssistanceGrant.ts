import { MigrationInterface, QueryRunner } from 'typeorm';

import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

export class AccidentAssistanceGrant1779000000004 implements MigrationInterface {
  public readonly name = 'AccidentAssistanceGrant1779000000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.changePaymentResourceEnum(queryRunner, [
      ...Object.values(PaymentPlanPaidResourceTypeEnum),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.changePaymentResourceEnum(
      queryRunner,
      Object.values(PaymentPlanPaidResourceTypeEnum).filter(
        (value) =>
          ![
            PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_COMPLETE_ANALYSIS,
            PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_SIMPLIFIED_ANALYSIS,
            PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_FIRST_ANALYSIS,
          ].includes(value),
      ),
    );
  }

  private async changePaymentResourceEnum(
    queryRunner: QueryRunner,
    values: string[],
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum (${this.toSqlEnum(values)}) NOT NULL`,
    );
  }

  private toSqlEnum(values: string[]): string {
    return values.map((value) => `'${value.replace(/'/g, "''")}'`).join(', ');
  }
}
