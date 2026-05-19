import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/value-object/permanent-incapacity-benefit-terminated-disability-analysis-document-id.value-object';

import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/enum/permanent-incapacity-benefit-terminated-disability-analysis-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/permanent-incapacity-benefit-terminated-disability-analysis-document.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId> {
  public readonly fileName: string;
  public readonly type: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum;
  public readonly permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntityPropsInterface,
  ) {
    super(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId,
      props,
    );
    this.fileName = props.fileName;
    this.type = props.type;
    this.permanentIncapacityBenefitTerminatedDisabilityAnalysisId =
      props.permanentIncapacityBenefitTerminatedDisabilityAnalysisId;
  }
}
