import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';

@Entity({ name: 'general_urban_retirement_grant_legal_proceeding' })
export class GeneralUrbanRetirementGrantLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => GeneralUrbanRetirementGrantTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrantLegalProceeding,
  )
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant:
    | GeneralUrbanRetirementGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementGrantLegalProceedingTypeormEntity.name;
}
