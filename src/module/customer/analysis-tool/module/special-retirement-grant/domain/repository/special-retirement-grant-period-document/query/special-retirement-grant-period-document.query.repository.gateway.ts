import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import type { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

export abstract class SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway {
  public abstract listIdsBySpecialRetirementGrantPeriodId(
    specialRetirementGrantPeriodId: SpecialRetirementGrantPeriodId,
  ): Promise<SpecialRetirementGrantPeriodDocumentId[]>;
}
