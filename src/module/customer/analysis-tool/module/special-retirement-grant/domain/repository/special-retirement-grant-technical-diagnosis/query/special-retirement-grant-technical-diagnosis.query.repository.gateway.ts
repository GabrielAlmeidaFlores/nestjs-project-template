import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import type { SpecialRetirementGrantTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/value-object/special-retirement-grant-technical-diagnosis-id/special-retirement-grant-technical-diagnosis-id.value-object';

export abstract class SpecialRetirementGrantTechnicalDiagnosisQueryRepositoryGateway {
  public abstract existsByIdAndSpecialRetirementGrantId(
    id: SpecialRetirementGrantTechnicalDiagnosisId,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<boolean>;
}
