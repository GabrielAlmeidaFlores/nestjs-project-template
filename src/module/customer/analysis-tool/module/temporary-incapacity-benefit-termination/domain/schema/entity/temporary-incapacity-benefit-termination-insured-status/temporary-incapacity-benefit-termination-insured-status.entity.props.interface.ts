import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';

export interface TemporaryIncapacityBenefitTerminationInsuredStatusEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationInsuredStatusId> {
  involuntaryUnemployment: boolean;
  intentionToProveInvoluntaryUnemployment: boolean;
  ruralInsuredClient: boolean;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  documentsDescription?: string | null;
  temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;
}
