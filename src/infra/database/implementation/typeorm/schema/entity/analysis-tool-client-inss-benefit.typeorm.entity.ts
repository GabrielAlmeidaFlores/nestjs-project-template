import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'analysis_tool_client_inss_benefit' })
export class AnalysisToolClientInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.analysisToolClientInssBenefit,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient: AnalysisToolClientTypeormEntity | undefined;

  protected override readonly _type =
    AnalysisToolClientInssBenefitTypeormEntity.name;
}
