import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';

@Entity({ name: 'bpc_elderly_analysis_document' })
export class BpcElderlyAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcElderlyAnalysisDocumentTypeEnum,
  })
  public type: BpcElderlyAnalysisDocumentTypeEnum;

  @ManyToOne(() => BpcElderlyAnalysisTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis?: BpcElderlyAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyAnalysisDocumentTypeormEntity.name;
}
