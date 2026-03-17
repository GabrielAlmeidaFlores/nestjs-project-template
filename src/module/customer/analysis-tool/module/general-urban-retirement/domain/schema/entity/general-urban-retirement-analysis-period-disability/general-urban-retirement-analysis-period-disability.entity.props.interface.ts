import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import type { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';

export interface GeneralUrbanRetirementAnalysisPeriodDisabilityEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisPeriodDisabilityId> {
  type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;
  degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;
  startDate: Date;
  endDate: Date;
  category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;
  description: string;
  dailyImpact: string;
  cidTen: CidTenEntity;
  generalUrbanRetirementAnalysisPeriod: GeneralUrbanRetirementAnalysisPeriodEntity;
}
