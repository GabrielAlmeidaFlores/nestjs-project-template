import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/value-object/temporary-incapacity-benefit-rejection-disability-analysis-document-id.value-object';

import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/enum/temporary-incapacity-benefit-rejection-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityPropsInterface,
  ) {
    super(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId,
      props,
    );
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitRejectionDisabilityAnalysisId =
      props.temporaryIncapacityBenefitRejectionDisabilityAnalysisId;
  }
}
