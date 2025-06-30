import { Column, Entity, OneToMany } from 'typeorm';

import { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-resource/application-paid-resource/enum/application-paid-resource.enum';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';

@Entity({ name: 'application_paid_resource' })
export class ApplicationPaidResourceTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'resource',
    type: 'simple-enum',
    enum: ApplicationPaidResourceEnum,
  })
  public resource: ApplicationPaidResourceEnum;

  @Column({ name: 'credit_cost', type: 'int' })
  public creditCost: number;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @OneToMany(
    () => AvailablePaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.applicationPaidResource,
  )
  public applicationPaidResource: AvailablePaymentPlanEnabledPaidResourceTypeormEntity;

  @OneToMany(
    () => OrganizationCreditUsageTypeormEntity,
    (entity) => entity.applicationPaidResource,
  )
  public organizationCreditUsage: OrganizationCreditUsageTypeormEntity;

  protected override readonly _type = ApplicationPaidResourceTypeormEntity.name;
}
