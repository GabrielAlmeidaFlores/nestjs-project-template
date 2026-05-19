import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

export interface TemporaryDisabilityBenefitsGrantInsuredStatusEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantInsuredStatusId> {
  involuntaryUnemployment: boolean;
  intentionToProveInvoluntaryUnemployment: boolean;
  ruralInsuredClient: boolean;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  documentsDescription?: string | null;
  temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
}
