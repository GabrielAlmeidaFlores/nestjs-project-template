import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity.props.interface';

export class GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity extends BaseEntity<GeneralUrbanRetirementAnalysisPeriodSpecialTimeId> {
  @Description('Tipo de tempo especial')
  public readonly type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;

  @Description('Data de início do tempo especial')
  public readonly startDate: Date;

  @Description('Data de término do tempo especial')
  public readonly endDate: Date;

  @Description('Observações do advogado sobre o tempo especial')
  public readonly lawyerObservations: string | null;

  @Description('Período associado ao tempo especial')
  public readonly generalUrbanRetirementAnalysisPeriod: GeneralUrbanRetirementAnalysisPeriodEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisPeriodSpecialTimeId, props);
    this.type = props.type;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.lawyerObservations = props.lawyerObservations ?? null;
    this.generalUrbanRetirementAnalysisPeriod =
      props.generalUrbanRetirementAnalysisPeriod ?? null;
  }
}
