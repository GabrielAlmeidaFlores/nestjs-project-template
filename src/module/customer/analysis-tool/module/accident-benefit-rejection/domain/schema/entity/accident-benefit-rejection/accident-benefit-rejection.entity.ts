import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';

import type { AccidentBenefitRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity.props.interface';
import type { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import type { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import type { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';
import type { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

export class AccidentBenefitRejectionEntity extends BaseEntity<AccidentBenefitRejectionId> {
  public readonly analysisName: string | null;
  public readonly requirementStartDate: Date | null;
  public readonly rejectionDate: Date | null;
  public readonly category: AccidentBenefitRejectionCategoryEnum | null;
  public readonly mainAccidentBenefitRejectionReason: AccidentBenefitRejectionMainReasonEnum | null;
  public readonly otherAccidentBenefitRejectionReason: string | null;
  public readonly hasPreviousGrantRelated: boolean | null;
  public readonly previousGrantBenefitNumber: string | null;
  public readonly previousGrantStartDate: Date | null;
  public readonly previousGrantTerminationDate: Date | null;
  public readonly requestToExtendTemporaryDisabilityBenefit: AccidentBenefitRejectionRequestToExtendEnum | null;
  public readonly accidentBenefitRejectionResultId: AccidentBenefitRejectionResultId | null;

  protected readonly _type = AccidentBenefitRejectionEntity.name;

  public constructor(props: AccidentBenefitRejectionEntityPropsInterface) {
    super(AccidentBenefitRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.requirementStartDate = props.requirementStartDate ?? null;
    this.rejectionDate = props.rejectionDate ?? null;
    this.category = props.category ?? null;
    this.mainAccidentBenefitRejectionReason =
      props.mainAccidentBenefitRejectionReason ?? null;
    this.otherAccidentBenefitRejectionReason =
      props.otherAccidentBenefitRejectionReason ?? null;
    this.hasPreviousGrantRelated = props.hasPreviousGrantRelated ?? null;
    this.previousGrantBenefitNumber = props.previousGrantBenefitNumber ?? null;
    this.previousGrantStartDate = props.previousGrantStartDate ?? null;
    this.previousGrantTerminationDate =
      props.previousGrantTerminationDate ?? null;
    this.requestToExtendTemporaryDisabilityBenefit =
      props.requestToExtendTemporaryDisabilityBenefit ?? null;
    this.accidentBenefitRejectionResultId =
      props.accidentBenefitRejectionResultId ?? null;
  }
}
