import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/special-retirement-rejection-technical-diagnosis.entity';

export abstract class SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionTechnicalDiagnosis(
    props: SpecialRetirementRejectionTechnicalDiagnosisEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementRejectionTechnicalDiagnosis(
    props: SpecialRetirementRejectionTechnicalDiagnosisEntity,
  ): TransactionType;

  public abstract deleteAllBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
