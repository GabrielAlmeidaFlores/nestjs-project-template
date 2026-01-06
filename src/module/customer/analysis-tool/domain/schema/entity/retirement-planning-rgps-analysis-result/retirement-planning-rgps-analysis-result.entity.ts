import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity.props.interface';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsAnalysisResultEntity extends BaseEntity<RetirementPlanningRgpsAnalysisResultId> {
  @Description(
    'Planejamento de aposentadoria RGPS associado ao benefício INSS.',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity;

  @Description(
    'Tipo de análise realizada no planejamento de aposentadoria RGPS.',
  )
  public readonly analysisType: string;

  @Description(
    'Resposta da análise realizada no planejamento de aposentadoria RGPS.',
  )
  public readonly response: string;

  public constructor(
    props: RetirementPlanningRgpsAnalysisResultEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsAnalysisResultId, props);

    this.retirementPlanningRgps = props.retirementPlanningRgps;
    this.analysisType = props.analysisType;
    this.response = props.response;
  }

  protected readonly _type = RetirementPlanningRgpsAnalysisResultEntity.name;
}
