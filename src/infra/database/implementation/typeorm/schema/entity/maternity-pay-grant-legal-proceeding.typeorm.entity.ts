import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';

@Entity({ name: 'maternity_pay_grant_legal_proceeding' })
export class MaternityPayGrantLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'legal_proceeding_number', type: 'varchar', length: 255 })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => MaternityPayGrantTypeormEntity,
    (entity) => entity.maternityPayGrantLegalProceeding,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_id' })
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | null;

  protected override readonly _type =
    MaternityPayGrantLegalProceedingTypeormEntity.name;
}
