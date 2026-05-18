import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';

export interface TemporaryIncapacityBenefitRejectionInsuredStatusEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionInsuredStatusId> {
  involuntaryUnemployment: boolean;
  intentionToProveInvoluntaryUnemployment: boolean;
  ruralInsuredClient: boolean;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  documentsDescription?: string | null;
  temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;
}
