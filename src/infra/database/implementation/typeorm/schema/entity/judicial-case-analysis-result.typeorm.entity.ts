import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';

@Entity({ name: 'judicial_case_analysis_result' })
export class JudicialCaseAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'judicial_case_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public judicialCaseCompleteAnalysis: string | null;

  @Column({
    name: 'judicial_case_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public judicialCaseSimplifiedAnalysis: string | null;

  @OneToOne(
    () => JudicialCaseAnalysisTypeormEntity,
    (entity) => entity.judicialCaseAnalysisResult,
  )
  public judicialCaseAnalysis?: JudicialCaseAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    JudicialCaseAnalysisResultTypeormEntity.name;
}
