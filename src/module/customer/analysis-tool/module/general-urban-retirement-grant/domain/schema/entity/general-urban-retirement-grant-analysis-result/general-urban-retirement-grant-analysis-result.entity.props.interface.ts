import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/enum/analysis-type.enum';
import type { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

export interface GeneralUrbanRetirementGrantAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantAnalysisResultId> {
  generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;
  analysisType?: AnalysisTypeEnum | null;
  response: string;
}
