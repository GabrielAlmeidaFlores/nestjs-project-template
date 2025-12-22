import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway extends ListDataInputModel {
  public readonly legalProceedingNumber: string;

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway.name;

  public constructor(
    props: Partial<ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway>,
  ) {
    super(props);

    if (props.legalProceedingNumber === undefined) {
      throw new Error('legalProceedingNumber is required');
    }

    this.legalProceedingNumber = props.legalProceedingNumber;
  }
}
