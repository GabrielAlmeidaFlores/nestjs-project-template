import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetMiniAdvisorResultQueryResult extends BaseBuildableObject {
  public readonly id: MiniAdvisorResultId;
  public readonly miniAdvisorId: MiniAdvisorId;
  public readonly chosenAnalysis: AnalysisToolRecordTypeEnum;
  public readonly benefitDescription: string | null;
  public readonly attentionNote: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetMiniAdvisorResultQueryResult.name;
}
