import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';

@Entity({ name: 'judicial_case_analysis_legal_proceeding' })
export class JudicialCaseAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => JudicialCaseAnalysisTypeormEntity,
    (entity) => entity.judicialCaseAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'judicial_case_analysis_id' })
  public judicialCaseAnalysis: JudicialCaseAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    JudicialCaseAnalysisLegalProceedingTypeormEntity.name;
}
