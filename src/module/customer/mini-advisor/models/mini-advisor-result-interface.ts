import { MiniAdvisorAnalysisTypeEnum } from "@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum";

export interface IMiniAdvisorAiResult {
  chosenAnalysis: MiniAdvisorAnalysisTypeEnum;
}