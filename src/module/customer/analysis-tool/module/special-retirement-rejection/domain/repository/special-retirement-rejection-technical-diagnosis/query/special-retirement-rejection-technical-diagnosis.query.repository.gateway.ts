import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/value-object/special-retirement-rejection-technical-diagnosis-id/special-retirement-rejection-technical-diagnosis-id.value-object';

export abstract class SpecialRetirementRejectionTechnicalDiagnosisQueryRepositoryGateway {
  public abstract existsByIdAndSpecialRetirementRejectionId(
    id: SpecialRetirementRejectionTechnicalDiagnosisId,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<boolean>;
}
