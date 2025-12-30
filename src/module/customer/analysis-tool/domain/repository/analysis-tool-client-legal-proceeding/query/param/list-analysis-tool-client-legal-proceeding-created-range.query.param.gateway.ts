import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway extends ListDataInputModel {
  public readonly createdAtStart: Date | null;
  public readonly createdAtEnd: Date | null;

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway.name;

  public constructor(
    props: Partial<ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway>,
  ) {
    super(props);

    this.createdAtStart = props.createdAtStart ?? null;
    this.createdAtEnd = props.createdAtEnd ?? null;
  }
}
