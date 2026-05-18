import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';

@Entity({ name: 'general_urban_retirement_analysis_result' })
export class GeneralUrbanRetirementAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'general_urban_retirement_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementCompleteAnalysis: string | null;

  @Column({
    name: 'general_urban_retirement_simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementSimplifiedAnalysis: string | null;

  @Column({
    name: 'general_urban_retirement_complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysisResult,
  )
  public generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisResultTypeormEntity.name;
}
