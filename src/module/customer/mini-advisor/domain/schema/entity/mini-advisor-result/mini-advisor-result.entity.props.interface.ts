import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import type { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import type { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

export interface MiniAdvisorResultEntityPropsInterface extends BaseEntityPropsInterface<MiniAdvisorResultId> {
  miniAdvisorId: MiniAdvisorId;
  chosenAnalysis: MiniAdvisorAnalysisTypeEnum;
  benefitDescription?: string | null;
  attentionNote?: string | null;
}
