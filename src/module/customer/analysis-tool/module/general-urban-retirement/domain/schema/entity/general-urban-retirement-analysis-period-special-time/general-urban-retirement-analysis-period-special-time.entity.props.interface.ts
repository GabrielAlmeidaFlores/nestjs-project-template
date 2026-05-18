import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';

export interface GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisPeriodSpecialTimeId> {
  type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;
  startDate: Date;
  endDate: Date;
  lawyerObservations?: string | null;
  generalUrbanRetirementAnalysisPeriod?: GeneralUrbanRetirementAnalysisPeriodEntity | null;
}
