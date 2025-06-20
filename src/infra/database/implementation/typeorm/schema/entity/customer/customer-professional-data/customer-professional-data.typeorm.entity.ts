import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { OccupationAreaEnum } from '@core/domain/schema/entity/customer/customer-professional-data/enum/professional-data-occupation.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';
import { CustomerProfessionalDataTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-professional-data/customer-professional-data.typeorm.entity.props.interface';

@Entity({ name: 'customer_professional_data' })
export class CustomerProfessionalDataTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'occupation_area',
    type: 'simple-enum',
  })
  public occupationArea: OccupationAreaEnum;

  @Column({ name: 'state_code', type: 'varchar', length: 50 })
  public stateCode: string;

  @OneToOne(() => CustomerTypeormEntity, (entity) => entity.customerAddress)
  @JoinColumn({
    name: 'customer_id',
  })
  public customer: CustomerTypeormEntity;

  protected readonly _type = CustomerProfessionalDataTypeormEntity.name;

  public constructor(
    props?: CustomerProfessionalDataTypeormEntityPropsInterface,
  ) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.occupationArea = props.occupationArea;
    this.stateCode = props.stateCode;
    this.customer = props.customer;
  }
}
