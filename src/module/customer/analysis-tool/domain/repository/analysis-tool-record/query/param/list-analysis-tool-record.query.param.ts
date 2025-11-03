import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { DeepPartialType } from '@shared/system/type/deep-partial.type';

export class ListAnalysisToolRecordQueryParam extends ListDataInputModel {
  public readonly type: AnalysisToolRecordTypeEnum | null;
  public readonly searchBy: string | null;
  public readonly analysisToolClientId: AnalysisToolClientId | null;

  protected override readonly _type = ListAnalysisToolRecordQueryParam.name;

  public constructor(props: DeepPartialType<ListAnalysisToolRecordQueryParam>) {
    super(props);

    this.type = props.type ?? null;
    this.searchBy = props.searchBy ?? null;
    this.analysisToolClientId =
      props.analysisToolClientId instanceof AnalysisToolClientId
        ? props.analysisToolClientId
        : props.analysisToolClientId
          ? new AnalysisToolClientId(props.analysisToolClientId as string)
          : null;
  }
}
