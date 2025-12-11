import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'legal_proceeding_detail' })
export class LegalProceedingDetailTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_tool_client_legal_proceeding_detail',
    type: 'longtext',
  })
  public detail: string;

  @ManyToOne(
    () => AnalysisToolClientLegalProceedingTypeormEntity,
    (entity) => entity.legalProceedingDetail,
  )
  @JoinColumn({ name: 'analysis_tool_client_legal_proceeding_id' })
  public analysisToolClientLegalProceeding?:
    | AnalysisToolClientLegalProceedingTypeormEntity
    | undefined;
  protected override readonly _type = LegalProceedingDetailTypeormEntity.name;
}
