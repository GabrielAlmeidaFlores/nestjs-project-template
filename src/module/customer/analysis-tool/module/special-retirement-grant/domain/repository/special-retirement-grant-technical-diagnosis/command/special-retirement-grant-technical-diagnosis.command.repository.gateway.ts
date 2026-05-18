import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import type { SpecialRetirementGrantTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/special-retirement-grant-technical-diagnosis.entity';

export abstract class SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantTechnicalDiagnosis(
    props: SpecialRetirementGrantTechnicalDiagnosisEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementGrantTechnicalDiagnosis(
    props: SpecialRetirementGrantTechnicalDiagnosisEntity,
  ): TransactionType;

  public abstract deleteAllBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): TransactionType;
}
