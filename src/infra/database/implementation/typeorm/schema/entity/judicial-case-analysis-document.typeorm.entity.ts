import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';

@Entity({ name: 'judicial_case_analysis_document' })
export class JudicialCaseAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: JudicialCaseAnalysisDocumentTypeEnum,
  })
  public type: JudicialCaseAnalysisDocumentTypeEnum;

  @ManyToOne(() => JudicialCaseAnalysisTypeormEntity)
  @JoinColumn({ name: 'judicial_case_analysis_id' })
  public judicialCaseAnalysis?: JudicialCaseAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    JudicialCaseAnalysisDocumentTypeormEntity.name;
}
