import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedInsuredStatusId> {
  involuntaryUnemployment: boolean;
  intentionToProveInvoluntaryUnemployment: boolean;
  ruralInsuredClient: boolean;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  documentsDescription?: string | null;
  temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;
}
