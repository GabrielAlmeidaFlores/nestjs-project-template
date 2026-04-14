import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity.props.interface';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisCustomerProfileIdentificationEntity extends BaseEntity<SurvivorPensionAnalysisCustomerProfileIdentificationId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('ID do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId | null;

  @Description('Cargo/função do cliente.')
  public readonly clientJobTitle: string | null;

  @Description('Número do processo judicial.')
  public readonly legalProceedingNumber: string | null;

  @Description('Número do benefício INSS.')
  public readonly inssBenefitNumber: string | null;

  @Description('Nome da análise.')
  public readonly analysisName: string | null;

  @Description('Finalidade da análise.')
  public readonly analysisPurpose: string | null;

  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisCustomerProfileIdentificationId, props);
    this.survivorPensionAnalysisId = props.survivorPensionAnalysisId;
    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.clientJobTitle = props.clientJobTitle ?? null;
    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
    this.inssBenefitNumber = props.inssBenefitNumber ?? null;
    this.analysisName = props.analysisName ?? null;
    this.analysisPurpose = props.analysisPurpose ?? null;
  }
}
