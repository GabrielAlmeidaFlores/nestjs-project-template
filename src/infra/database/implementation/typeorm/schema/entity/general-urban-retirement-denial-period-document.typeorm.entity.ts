import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';

@Entity({ name: 'general_urban_retirement_denial_period_document' })
export class GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => GeneralUrbanRetirementDenialPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_period_id' })
  public generalUrbanRetirementDenialPeriod?: GeneralUrbanRetirementDenialPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity.name;
}
