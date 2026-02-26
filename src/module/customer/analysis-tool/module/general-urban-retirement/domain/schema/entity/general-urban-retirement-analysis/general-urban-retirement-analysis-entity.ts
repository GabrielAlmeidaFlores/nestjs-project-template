import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis.entity.props.interface';

export class GeneralUrbanRetirementAnalysisEntity extends BaseEntity<GeneralUrbanRetirementAnalysisId> {
  @Description('Data de início da carreira do cliente')
  public readonly careerStartDate: Date;

  @Description('Data de início do serviço público do cliente')
  public readonly publicServiceStartDate: Date;

  @Description('Análise de benefícios do cliente')
  public readonly generalUrbanRetirementBenefitAnalysis: string | null;

  @Description('Resultado da análise de aposentadoria urbana geral do cliente')
  public generalUrbanRetirementAnalysisResult: GeneralUrbanRetirementAnalysisResultEntity | null;

  @Description('Entidade federativa do cliente')
  public federativeEntity: GeneralUrbanRetirementAnalysisFederativeEntityEnum | null;

  @Description('Sigla do estado do cliente')
  public state: StateCodeEnum | null;

  @Description('Nome do município do cliente')
  public municipality: string | null;

  @Description('Nome da análise')
  public name: string | null;

  @Description('Tipo de benefício do cliente')
  public benefitType: GeneralUrbanRetirementAnalysisBenefitTypeEnum | null;

  protected readonly _type = GeneralUrbanRetirementAnalysisEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisId, props);
    this.careerStartDate = props.careerStartDate;
    this.publicServiceStartDate = props.publicServiceStartDate;
    this.generalUrbanRetirementBenefitAnalysis =
      props.generalUrbanRetirementBenefitAnalysis ?? null;
    this.generalUrbanRetirementAnalysisResult =
      props.generalUrbanRetirementAnalysisResult ?? null;
    this.federativeEntity = props.federativeEntity ?? null;
    this.state = props.state ?? null;
    this.municipality = props.municipality ?? null;
    this.name = props.name ?? null;
    this.benefitType = props.benefitType ?? null;
  }
}
