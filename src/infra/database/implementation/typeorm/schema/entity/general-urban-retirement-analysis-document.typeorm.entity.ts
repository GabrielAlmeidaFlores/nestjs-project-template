import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';

@Entity({ name: 'general_urban_retirement_analysis_document' })
export class GeneralUrbanRetirementAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public type: GeneralUrbanRetirementAnalysisDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis?:
    | GeneralUrbanRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisDocumentTypeormEntity.name;
}
