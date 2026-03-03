import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult extends BaseBuildableObject {
  @Description('ID único do benefício INSS.')
  public readonly id: Guid;

  @Description('Número do benefício INSS.')
  public readonly inssBenefitNumber: string;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult.name;
}
