import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/enum/retirement-permanent-disability-rejection-incapacity-cid-type.enum';

@Entity({ name: 'retirement_permanent_disability_rejection_incapacity_cid' })
export class RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid', type: 'varchar', length: 20 })
  public cid: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum,
  })
  public type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacityCid,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_rejection_incapacity_id',
  })
  public retirementPermanentDisabilityRejectionIncapacity?: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity.name;
}
