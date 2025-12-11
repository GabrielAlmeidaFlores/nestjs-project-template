import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

export class ListLegalProceedingDetailQueryParam extends ListDataInputModel {
  public readonly analysisToolClientId: AnalysisToolClientId | null;
  public readonly analysisToolClientLegalProceedingId: AnalysisToolClientLegalProceedingId | null;

  protected override readonly _type = ListLegalProceedingDetailQueryParam.name;

  public constructor(props: Partial<ListLegalProceedingDetailQueryParam>) {
    super(props);

    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.analysisToolClientLegalProceedingId =
      props.analysisToolClientLegalProceedingId ?? null;
  }
}
