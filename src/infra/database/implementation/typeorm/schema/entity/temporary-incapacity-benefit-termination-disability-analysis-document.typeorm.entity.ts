import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';

import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';

@Entity({
  name: 'temp_incapacity_benefit_termination_disability_analysis_doc',
})
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_termination_disability_analysis_id',
  })
  public temporaryIncapacityBenefitTerminationDisabilityAnalysis?: TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity.name;
}
