import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';

@Entity({ name: 'general_urban_retirement_grant_period_document' })
export class GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(() => GeneralUrbanRetirementGrantPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_grant_period_id' })
  public generalUrbanRetirementGrantPeriod?: GeneralUrbanRetirementGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity.name;
}
