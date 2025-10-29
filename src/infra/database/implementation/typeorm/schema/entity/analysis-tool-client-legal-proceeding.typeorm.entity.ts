import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'analysis_tool_client_legal_proceeding' })
export class AnalysisToolClientLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.analysisToolClientLegalProceeding,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient: AnalysisToolClientTypeormEntity | undefined;

  protected override readonly _type =
    AnalysisToolClientLegalProceedingTypeormEntity.name;
}
