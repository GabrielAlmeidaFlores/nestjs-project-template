import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';

@Entity({ name: 'maternity_pay_grant_inss_benefit' })
export class MaternityPayGrantInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit_number', type: 'varchar', length: 255 })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => MaternityPayGrantTypeormEntity,
    (entity) => entity.maternityPayGrantInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_id' })
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | null;

  protected override readonly _type =
    MaternityPayGrantInssBenefitTypeormEntity.name;
}
