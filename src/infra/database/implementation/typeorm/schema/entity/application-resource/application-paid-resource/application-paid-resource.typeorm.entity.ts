import { Column, Entity, OneToMany } from 'typeorm';

import { ApplicationPaidResourceEnum } from '@core/domain/schema/entity/application-resource/application-paid-resource/enum/application-paid-resource.enum';
import { ApplicationPaidResourceTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/application-resource/application-paid-resource/application-paid-resource.typeorm.entity.props.interface';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

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

  protected readonly _type = ApplicationPaidResourceTypeormEntity.name;

  public constructor(
    props?: ApplicationPaidResourceTypeormEntityPropsInterface,
  ) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.resource = props.resource;
    this.creditCost = props.creditCost;
    this.description = props.description;
    this.applicationPaidResource = props.applicationPaidResource;
  }
}
