import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.entity.props.interface';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity extends BaseEntity<SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId> {
  @Description('Tipo do documento.')
  public readonly documentType: string;

  @Description('Nome do arquivo no bucket de armazenamento.')
  public readonly documentName: string;

  @Description(
    'ID da identificação do instituidor do benefício na análise de pensão por morte.',
  )
  public readonly survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId;

  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityPropsInterface,
  ) {
    super(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId,
      props,
    );
    this.documentType = props.documentType;
    this.documentName = props.documentName;
    this.survivorPensionAnalysisBenefitOriginatorIdentificationId =
      props.survivorPensionAnalysisBenefitOriginatorIdentificationId;
  }
}
