import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/value-object/temporary-incapacity-benefit-termination-disability-analysis-document-id.value-object';

import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityPropsInterface,
  ) {
    super(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId,
      props,
    );
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitTerminationDisabilityAnalysisId =
      props.temporaryIncapacityBenefitTerminationDisabilityAnalysisId;
  }
}
