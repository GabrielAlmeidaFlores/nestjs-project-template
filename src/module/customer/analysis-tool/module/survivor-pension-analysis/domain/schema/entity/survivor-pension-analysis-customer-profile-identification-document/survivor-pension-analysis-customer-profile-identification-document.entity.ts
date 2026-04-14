import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.entity.props.interface';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity extends BaseEntity<SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId> {
  @Description('Tipo do documento.')
  public readonly documentType: string;

  @Description('Nome do arquivo no bucket de armazenamento.')
  public readonly documentName: string;

  @Description(
    'ID da identificação do perfil do cliente na análise de pensão por morte.',
  )
  public readonly survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId;

  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityPropsInterface,
  ) {
    super(
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId,
      props,
    );
    this.documentType = props.documentType;
    this.documentName = props.documentName;
    this.survivorPensionAnalysisCustomerProfileIdentificationId =
      props.survivorPensionAnalysisCustomerProfileIdentificationId;
  }
}
