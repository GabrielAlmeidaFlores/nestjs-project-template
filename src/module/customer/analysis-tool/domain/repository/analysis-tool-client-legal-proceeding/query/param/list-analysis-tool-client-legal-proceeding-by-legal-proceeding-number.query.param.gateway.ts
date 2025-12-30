import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway extends ListDataInputModel {
  public readonly legalProceedingNumber: string | null;

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway.name;

  public constructor(
    props: Partial<ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway>,
  ) {
    super(props);

    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
  }
}
