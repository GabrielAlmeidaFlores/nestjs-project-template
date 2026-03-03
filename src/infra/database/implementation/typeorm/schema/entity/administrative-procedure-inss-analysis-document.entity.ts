import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';

@Entity({ name: 'administrative_procedure_inss_analysis_document' })
export class AdministrativeProcedureInssAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AdministrativeProcedureInssAnalysisDocumentTypeEnum,
  })
  public type: AdministrativeProcedureInssAnalysisDocumentTypeEnum;

  @ManyToOne(() => AdministrativeProcedureInssAnalysisTypeormEntity)
  @JoinColumn({ name: 'administrative_procedure_inss_analysis_id' })
  public administrativeProcedureInssAnalysis?:
    | AdministrativeProcedureInssAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    AdministrativeProcedureInssAnalysisDocumentTypeormEntity.name;
}
