import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.entity.props.interface';
import { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementAnalysisLegalProceedingEntity extends BaseEntity<GeneralUrbanRetirementAnalysisLegalProceedingId> {
  @Description('Número do processo legal associado à análise.')
  public readonly legalProceeding: string;

  @Description(
    'Análise de aposentadoria urbana geral associada ao processo legal.',
  )
  public readonly generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity;

  protected readonly _type =
    GeneralUrbanRetirementAnalysisLegalProceedingEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisLegalProceedingId, props);
    this.legalProceeding = props.legalProceeding;
    this.generalUrbanRetirementAnalysis = props.generalUrbanRetirementAnalysis;
  }
}
