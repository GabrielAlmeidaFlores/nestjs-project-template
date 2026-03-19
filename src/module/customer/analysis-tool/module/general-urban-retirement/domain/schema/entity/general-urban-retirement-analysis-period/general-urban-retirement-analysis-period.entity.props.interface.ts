import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';

export interface GeneralUrbanRetirementAnalysisPeriodEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisPeriodId> {
  startDate: Date;
  endDate: Date;
  jobPosition: string;
  career: string;
  serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;
  department: string;
  generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;
}
