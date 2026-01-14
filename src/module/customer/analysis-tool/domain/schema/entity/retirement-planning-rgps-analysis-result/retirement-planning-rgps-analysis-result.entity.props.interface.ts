import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/enum/analysis-type.enum';
import type { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

export interface RetirementPlanningRgpsAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsAnalysisResultId> {
  retirementPlanningRgps: RetirementPlanningRgpsEntity;
  analysisType?: AnalysisTypeEnum | null;
  response: string;
}
