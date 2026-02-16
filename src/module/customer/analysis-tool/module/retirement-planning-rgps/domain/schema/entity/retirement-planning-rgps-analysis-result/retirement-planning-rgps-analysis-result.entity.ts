import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/enum/analysis-type.enum';
import { RetirementPlanningRgpsAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity.props.interface';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsAnalysisResultEntity extends BaseEntity<RetirementPlanningRgpsAnalysisResultId> {
  @Description(
    'Planejamento de aposentadoria RGPS associado ao benefício INSS.',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity;

  @Description(
    'Tipo de análise realizada no planejamento de aposentadoria RGPS.',
  )
  public readonly analysisType: AnalysisTypeEnum | null;

  @Description(
    'Resposta da análise realizada no planejamento de aposentadoria RGPS.',
  )
  public readonly response: string;

  protected readonly _type = RetirementPlanningRgpsAnalysisResultEntity.name;

  public constructor(
    props: RetirementPlanningRgpsAnalysisResultEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsAnalysisResultId, props);

    this.retirementPlanningRgps = props.retirementPlanningRgps;
    this.analysisType = props.analysisType ?? null;
    this.response = props.response;
  }
}
