import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListLegalProceedingCustomerQueryParamGateway extends ListDataInputModel {
  public readonly analysisToolClientId: string | null;

  protected override readonly _type =
    ListLegalProceedingCustomerQueryParamGateway.name;
  public constructor(
    props: Partial<ListLegalProceedingCustomerQueryParamGateway>,
  ) {
    super(props);

    this.analysisToolClientId = props.analysisToolClientId ?? null;
  }
}
