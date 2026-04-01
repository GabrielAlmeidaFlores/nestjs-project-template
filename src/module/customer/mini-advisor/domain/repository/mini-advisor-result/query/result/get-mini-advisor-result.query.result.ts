import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetMiniAdvisorResultQueryResult extends BaseBuildableObject {
  public readonly id: MiniAdvisorResultId;
  public readonly miniAdvisorId: MiniAdvisorId;
  public readonly chosenAnalysis: MiniAdvisorAnalysisTypeEnum;
  public readonly benefitDescription: string | null;
  public readonly attentionNote: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetMiniAdvisorResultQueryResult.name;
}
