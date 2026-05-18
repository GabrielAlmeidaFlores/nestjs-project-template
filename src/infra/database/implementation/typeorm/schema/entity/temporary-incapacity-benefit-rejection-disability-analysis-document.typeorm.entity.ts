import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';

import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/enum/temporary-incapacity-benefit-rejection-disability-analysis-document-type.enum';

@Entity({ name: 'temp_incapacity_benefit_rejection_disability_analysis_doc' })
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_rejection_disability_analysis_id',
  })
  public temporaryIncapacityBenefitRejectionDisabilityAnalysis?: TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity.name;
}
