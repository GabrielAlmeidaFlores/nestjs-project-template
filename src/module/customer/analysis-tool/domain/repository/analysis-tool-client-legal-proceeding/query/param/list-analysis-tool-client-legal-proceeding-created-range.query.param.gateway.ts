import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';

export class ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway extends ListDataInputModel {
  public readonly createdAtStart: Date | null;
  public readonly createdAtEnd: Date | null;
  public readonly status: LegalProceedingStatusEnum | null;

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway.name;

  public constructor(
    props: Partial<ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway>,
  ) {
    super(props);

    this.createdAtStart = props.createdAtStart ?? null;
    this.createdAtEnd = props.createdAtEnd ?? null;
    this.status = props.status ?? null;
  }
}
