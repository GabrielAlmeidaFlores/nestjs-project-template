import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AdministrativeProcedureInssAnalysisBenefitId extends Guid {
  protected override readonly _type =
    AdministrativeProcedureInssAnalysisBenefitId.name;
}
