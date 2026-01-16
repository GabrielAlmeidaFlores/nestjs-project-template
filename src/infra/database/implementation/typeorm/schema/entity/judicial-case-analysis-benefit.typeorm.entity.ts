import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';

@Entity({ name: 'judicial_case_analysis_benefit' })
export class JudicialCaseAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => JudicialCaseAnalysisTypeormEntity,
    (entity) => entity.judicialCaseAnalysisBenefit,
  )
  @JoinColumn({ name: 'judicial_case_analysis_id' })
  public judicialCaseAnalysis: JudicialCaseAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    JudicialCaseAnalysisBenefitTypeormEntity.name;
}
