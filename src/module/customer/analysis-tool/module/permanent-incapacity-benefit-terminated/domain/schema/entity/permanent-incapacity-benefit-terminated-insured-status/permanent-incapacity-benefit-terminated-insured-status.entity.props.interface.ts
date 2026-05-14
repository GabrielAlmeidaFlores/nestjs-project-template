import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';

export interface PermanentIncapacityBenefitTerminatedInsuredStatusEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedInsuredStatusId> {
  involuntaryUnemployment: boolean;
  intentionToProveInvoluntaryUnemployment: boolean;
  ruralInsuredClient: boolean;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  documentsDescription?: string | null;
  permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;
}
