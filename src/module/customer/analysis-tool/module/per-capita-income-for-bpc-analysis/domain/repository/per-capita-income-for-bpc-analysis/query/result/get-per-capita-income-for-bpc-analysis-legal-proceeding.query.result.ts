import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  @Description('ID único do processo judicial.')
  public readonly id: Guid;

  @Description('Número do processo judicial.')
  public readonly legalProceedingNumber: string;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult.name;
}
