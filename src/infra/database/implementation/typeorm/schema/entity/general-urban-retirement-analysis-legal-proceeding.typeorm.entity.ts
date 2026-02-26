import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';

@Entity({ name: 'general_urban_retirement_analysis_legal_proceeding' })
export class GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public legalProceeding: string;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.legalProceedings,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis?:
    | GeneralUrbanRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity.name;
}
