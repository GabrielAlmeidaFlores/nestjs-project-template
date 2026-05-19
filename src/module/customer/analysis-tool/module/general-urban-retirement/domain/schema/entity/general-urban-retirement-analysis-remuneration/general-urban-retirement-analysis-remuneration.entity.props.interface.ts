import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

export interface GeneralUrbanRetirementAnalysisRemunerationEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisRemunerationId> {
  remunerationDate: Date;
  remunerationAmount: DecimalValue;
  generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;
}
