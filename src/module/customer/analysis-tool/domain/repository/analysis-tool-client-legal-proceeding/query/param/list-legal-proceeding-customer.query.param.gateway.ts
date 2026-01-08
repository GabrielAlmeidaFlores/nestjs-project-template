import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListLegalProceedingCustomerQueryParamGateway extends ListDataInputModel {
  public readonly analysisToolClientId: string | null;

  public readonly status: string | null;

  public readonly legalProceedingNumber: string | null;

  public readonly startDate: Date | null;

  public readonly endDate: Date | null;

  protected override readonly _type =
    ListLegalProceedingCustomerQueryParamGateway.name;
  public constructor(
    props: Partial<ListLegalProceedingCustomerQueryParamGateway>,
  ) {
    super(props);

    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.status = props.status ?? null;
    this.legalProceedingNumber = props.legalProceedingNumber ?? '';
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
  }
}
