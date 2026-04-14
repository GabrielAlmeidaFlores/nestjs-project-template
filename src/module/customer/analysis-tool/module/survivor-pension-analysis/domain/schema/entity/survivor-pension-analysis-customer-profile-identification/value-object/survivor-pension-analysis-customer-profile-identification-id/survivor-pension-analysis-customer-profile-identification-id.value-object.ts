import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisCustomerProfileIdentificationId extends Guid {
  protected override readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationId.name;
}
