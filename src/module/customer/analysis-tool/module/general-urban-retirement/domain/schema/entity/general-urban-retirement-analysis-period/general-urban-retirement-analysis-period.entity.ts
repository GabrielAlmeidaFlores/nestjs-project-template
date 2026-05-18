import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity.props.interface';

export class GeneralUrbanRetirementAnalysisPeriodEntity extends BaseEntity<GeneralUrbanRetirementAnalysisPeriodId> {
  @Description('Data de início do período')
  public readonly startDate: Date;

  @Description('Data de término do período')
  public readonly endDate: Date;

  @Description('Cargo ocupado durante o período')
  public readonly jobPosition: string;

  @Description('Informações sobre a carreira durante o período')
  public readonly career: string;

  @Description('Tipo de serviço durante o período')
  public readonly serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;

  @Description('Departamento associado ao período')
  public readonly department: string;

  @Description('Análise de aposentadoria urbana geral associada ao período')
  public readonly generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;

  protected readonly _type = GeneralUrbanRetirementAnalysisPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.jobPosition = props.jobPosition;
    this.career = props.career;
    this.serviceType = props.serviceType;
    this.department = props.department;
    this.generalUrbanRetirementAnalysis = props.generalUrbanRetirementAnalysis;
  }
}
