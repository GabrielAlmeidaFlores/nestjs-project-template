import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

export class ListAnalysisToolClientLegalProceedingQueryParamGateway extends ListDataInputModel {
  public readonly analysisToolClientId: AnalysisToolClientId | null;
  public readonly status: string | null;
  public readonly legalProceedingNumber: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingQueryParamGateway.name;

  public constructor(
    props: Partial<ListAnalysisToolClientLegalProceedingQueryParamGateway>,
  ) {
    super(props);

    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.status = props.status ?? null;
    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
  }
}
