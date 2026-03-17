import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/general-urban-retirement-analysis-period-document.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity';

export class GeneralUrbanRetirementAnalysisPeriodDocumentEntity extends BaseEntity<GeneralUrbanRetirementAnalysisPeriodDocumentId> {
  @Description('URL do documento do período no bucket')
  public readonly document: string;

  @Description('Tipo do documento do período')
  public readonly documentType: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;

  @Description('Tempo especial associado ao documento')
  public readonly generalUrbanRetirementAnalysisPeriodSpecialTime: GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity | null;

  @Description('Deficiência associada ao documento')
  public readonly generalUrbanRetirementAnalysisPeriodDisability: GeneralUrbanRetirementAnalysisPeriodDisabilityEntity | null;

  @Description('Análise de aposentadoria urbana geral associada ao documento')
  public readonly generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity | null;

  protected readonly _type = GeneralUrbanRetirementAnalysisPeriodDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisPeriodDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisPeriodDocumentId, props);
    this.document = props.document;
    this.documentType = props.documentType;
    this.generalUrbanRetirementAnalysisPeriodSpecialTime =
      props.generalUrbanRetirementAnalysisPeriodSpecialTime ?? null;
    this.generalUrbanRetirementAnalysisPeriodDisability =
      props.generalUrbanRetirementAnalysisPeriodDisability ?? null;
    this.generalUrbanRetirementAnalysis =
      props.generalUrbanRetirementAnalysis ?? null;
  }
}
