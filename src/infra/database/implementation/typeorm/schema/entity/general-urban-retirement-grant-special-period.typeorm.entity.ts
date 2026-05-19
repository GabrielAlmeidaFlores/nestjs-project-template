import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';

@Entity({ name: 'general_urban_retirement_grant_special_period' })
export class GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => GeneralUrbanRetirementGrantTypeormEntity,
    (entity) => entity.specialTimePeriods,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity.name;
}
