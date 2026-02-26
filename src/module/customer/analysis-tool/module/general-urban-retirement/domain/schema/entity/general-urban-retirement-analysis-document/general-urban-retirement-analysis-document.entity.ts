import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';
import { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import type { GeneralUrbanRetirementAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.entity.props.interface';

export class GeneralUrbanRetirementAnalysisDocumentEntity extends BaseEntity<GeneralUrbanRetirementAnalysisDocumentId> {
  @Description(
    'Tipo do documento: CNIS (Cadastro Nacional de Informações Sociais) contendo histórico de contribuições previdenciárias.',
  )
  public readonly type: GeneralUrbanRetirementAnalysisDocumentTypeEnum;

  @Description('Nome do arquivo do documento enviado para análise.')
  public readonly document: string;

  @Description(
    'Análise de aposentadoria urbana geral à qual este documento pertence.',
  )
  public readonly generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId;

  protected readonly _type = GeneralUrbanRetirementAnalysisDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisDocumentId, props);
    this.type = props.type;
    this.document = props.document;
    this.generalUrbanRetirementAnalysisId =
      props.generalUrbanRetirementAnalysisId;
  }
}
