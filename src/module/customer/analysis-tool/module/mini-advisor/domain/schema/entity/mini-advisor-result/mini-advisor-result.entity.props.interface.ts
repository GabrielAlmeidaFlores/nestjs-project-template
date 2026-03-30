import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import type { MiniAdvisorResultId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

export interface MiniAdvisorResultEntityPropsInterface extends BaseEntityPropsInterface<MiniAdvisorResultId> {
  miniAdvisorId: MiniAdvisorId;
  chosenAnalysis: AnalysisToolRecordTypeEnum;
  benefitDescription?: string | null;
  attentionNote?: string | null;
}
