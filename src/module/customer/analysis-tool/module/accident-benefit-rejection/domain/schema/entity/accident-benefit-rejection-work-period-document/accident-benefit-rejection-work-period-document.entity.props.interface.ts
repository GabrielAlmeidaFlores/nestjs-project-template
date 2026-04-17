import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/enum/accident-benefit-rejection-work-period-document-type.enum';
import type { AccidentBenefitRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/value-object/accident-benefit-rejection-work-period-document-id.value-object';

export interface AccidentBenefitRejectionWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionWorkPeriodDocumentId> {
  document?: string | null;
  type?: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum | null;
  accidentBenefitRejectionWorkPeriodId?: AccidentBenefitRejectionWorkPeriodId | null;
}
