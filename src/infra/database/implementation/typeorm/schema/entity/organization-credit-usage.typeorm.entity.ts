import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';

@Entity({ name: 'organization_credit_usage' })
export class OrganizationCreditUsageTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'credit_amount', type: 'integer' })
  public creditAmount: number;

  @ManyToOne(() => PaymentPlanPaidResourceTypeormEntity)
  @JoinColumn({ name: 'payment_plan_paid_resource_id' })
  public paymentPlanPaidResource?:
    | PaymentPlanPaidResourceTypeormEntity
    | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = OrganizationCreditUsageTypeormEntity.name;
}
