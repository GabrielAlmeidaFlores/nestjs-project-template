import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.entity.props.interface';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity extends BaseEntity<SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId> {
  @Description('Tipo do documento.')
  public readonly documentType: string;

  @Description('Nome do arquivo no bucket de armazenamento.')
  public readonly documentName: string;

  @Description('ID do dependente beneficiário na análise de pensão por morte.')
  public readonly survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId;

  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId, props);
    this.documentType = props.documentType;
    this.documentName = props.documentName;
    this.survivorPensionAnalysisDeceasedBenefitDependentsId =
      props.survivorPensionAnalysisDeceasedBenefitDependentsId;
  }
}
