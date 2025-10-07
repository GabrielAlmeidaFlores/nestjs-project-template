import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import type { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import type { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import type { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import type { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import type { LegalPleadingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity.props.interface';
import type { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

export class LegalPleadingEntity extends BaseEntity<LegalPleadingId> {
  @Description('Texto descritivo dos fatos que embasam a peça processual.')
  public readonly statementOfFacts: string;

  @Description('Comentários adicionais sobre a peça processual.')
  public readonly additionalComments: string | null;

  @Description('Análise gerada por IA para a peça processual.')
  public readonly legalPleadingAiAnalysis: string | null;

  @Description('Sistema de seguridade social relacionado à peça processual.')
  public readonly securitySystem: LegalPleadingSocialSecuritySystemEnum;

  @Description('Tipo de benefício relacionado à peça processual.')
  public readonly benefitType: LegalPleadingBenefitTypeEnum;

  @Description('Tipo de petição relacionado à peça processual.')
  public readonly petitionType: LegalPleadingPetitionTypeEnum;

  @Description('Número do benefício relacionado à peça processual.')
  public readonly benefitNumber: BenefitNumber | null;

  @Description(
    'Data de submissão da solicitação relacionada à peça processual.',
  )
  public readonly applicationSubmissionDate: Date | null;

  @Description('Data de término do benefício relacionado à peça processual.')
  public readonly benefitTerminationDate: Date | null;

  @Description(
    'Renda mensal inicial do benefício relacionado à peça processual.',
  )
  public readonly benefitInitialMonthlyIncome: DecimalValue | null;

  @Description('Renda mensal atual do benefício relacionado à peça processual.')
  public readonly benefitCurrentMonthlyIncome: DecimalValue | null;

  @Description('Objetivo de seguridade social relacionado à peça processual.')
  public readonly socialSecurityObjective: LegalPleadingSocialSecurityObjectiveEnum | null;

  @Description(
    'Objetivo do mandado de segurança relacionado à peça processual.',
  )
  public readonly legalPleadingWritOfMandamusObjective: LegalPleadingWritOfMandamusObjectiveEnum | null;

  @Description(
    'Cliente da ferramenta de análise relacionada à peça processual.',
  )
  public readonly analysisToolClient: AnalysisToolClientEntity;

  @Description('Endereço relacionado à peça processual.')
  public readonly legalPleadingAddress: LegalPleadingAddressEntity | null;

  @Description('Membro da organização que criou a peça processual.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a peça processual.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = LegalPleadingEntity.name;

  public constructor(props: LegalPleadingEntityPropsInterface) {
    super(LegalPleadingId, props);

    this.legalPleadingAiAnalysis = props.legalPleadingAiAnalysis ?? null;
    this.statementOfFacts = props.statementOfFacts;
    this.additionalComments = props.additionalComments ?? null;
    this.securitySystem = props.securitySystem;
    this.benefitType = props.benefitType;
    this.petitionType = props.petitionType;
    this.benefitNumber = props.benefitNumber ?? null;
    this.applicationSubmissionDate = props.applicationSubmissionDate ?? null;
    this.benefitTerminationDate = props.benefitTerminationDate ?? null;
    this.benefitInitialMonthlyIncome =
      props.benefitInitialMonthlyIncome ?? null;
    this.benefitCurrentMonthlyIncome =
      props.benefitCurrentMonthlyIncome ?? null;
    this.socialSecurityObjective = props.socialSecurityObjective ?? null;
    this.legalPleadingWritOfMandamusObjective =
      props.legalPleadingWritOfMandamusObjective ?? null;
    this.legalPleadingAddress = props.legalPleadingAddress ?? null;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
