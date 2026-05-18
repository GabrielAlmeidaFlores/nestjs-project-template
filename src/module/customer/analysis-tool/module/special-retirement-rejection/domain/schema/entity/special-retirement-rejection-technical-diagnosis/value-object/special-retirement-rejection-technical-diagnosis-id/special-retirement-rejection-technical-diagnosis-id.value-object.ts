import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionTechnicalDiagnosisId extends Guid {
  protected override readonly _type =
    SpecialRetirementRejectionTechnicalDiagnosisId.name;
}
