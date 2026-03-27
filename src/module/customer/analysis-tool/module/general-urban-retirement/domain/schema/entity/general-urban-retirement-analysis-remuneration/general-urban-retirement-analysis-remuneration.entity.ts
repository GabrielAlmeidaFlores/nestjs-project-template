import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.entity.props.interface';

export class GeneralUrbanRetirementAnalysisRemunerationEntity extends BaseEntity<GeneralUrbanRetirementAnalysisRemunerationId> {
  @Description('Data da remuneração')
  public readonly remunerationDate: Date;

  @Description('Valor da remuneração')
  public readonly remunerationAmount: DecimalValue;

  @Description('Análise de aposentadoria urbana geral associada à remuneração')
  public readonly generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;

  protected readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisRemunerationEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisRemunerationId, props);
    this.remunerationDate = props.remunerationDate;
    this.remunerationAmount = props.remunerationAmount;
    this.generalUrbanRetirementAnalysis = props.generalUrbanRetirementAnalysis;
  }
}
