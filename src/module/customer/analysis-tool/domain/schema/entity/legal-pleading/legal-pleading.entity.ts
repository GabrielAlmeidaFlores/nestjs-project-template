import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidInputError } from '@core/error/invalid-input.error';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { InvalidLegalPleadingApplicationSubmitDateError } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/error/invalid-legal-pleading-application-submit-date.error';
import { InvalidLegalPleadingBenefitTerminalDateError } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/error/invalid-legal-pleading-bennefit-terminal-date.error';
import { LegalPleadingCode } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
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

export class LegalPleadingEntity extends BaseEntity<LegalPleadingId> {
  @Description('Status da solicitação de análise CNIS rápida.')
  public readonly status: AnalysisStatusEnum;

  @Description('Código da peça processual.')
  public readonly code: LegalPleadingCode;

  @Description('Texto descritivo dos fatos que embasam a peça processual.')
  public readonly statementOfFacts: string | null;

  @Description('Comentários adicionais sobre a peça processual.')
  public readonly additionalComments: string | null;

  @Description('Sistema de seguridade social relacionado à peça processual.')
  public readonly securitySystem: LegalPleadingSocialSecuritySystemEnum | null;

  @Description('Tipo de benefício relacionado à peça processual.')
  public readonly benefitType: LegalPleadingBenefitTypeEnum | null;

  @Description('Tipo de petição relacionado à peça processual.')
  public readonly petitionType: LegalPleadingPetitionTypeEnum | null;

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

  @Description('Resultado da análise da peça processual.')
  public readonly legalPleadingResult: LegalPleadingResultEntity | null;

  @Description('Membro da organização que criou a peça processual.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou a peça processual.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = LegalPleadingEntity.name;

  public constructor(props: LegalPleadingEntityPropsInterface) {
    super(LegalPleadingId, props);

    LegalPleadingEntity.validateApplicationSubmissionDate(
      props.applicationSubmissionDate,
    );
    LegalPleadingEntity.validateBenefitTerminationDate(
      props.benefitTerminationDate,
    );

    this.code = props.code;
    this.status = props.status;
    this.statementOfFacts = props.statementOfFacts ?? null;
    this.additionalComments = props.additionalComments ?? null;
    this.securitySystem = props.securitySystem ?? null;
    this.benefitType = props.benefitType ?? null;
    this.petitionType = props.petitionType ?? null;
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
    this.legalPleadingResult = props.legalPleadingResult ?? null;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }

  public static validateApplicationSubmissionDate(date?: Date | null): void {
    if (!date) {
      return;
    }

    LegalPleadingEntity.validateDate(
      date,
      () => new InvalidLegalPleadingApplicationSubmitDateError(),
    );
  }

  public static validateBenefitTerminationDate(date?: Date | null): void {
    if (!date) {
      return;
    }

    LegalPleadingEntity.validateDate(
      date,
      () => new InvalidLegalPleadingBenefitTerminalDateError(),
    );
  }

  private static validateDate(
    date: Date,
    error: () => InvalidInputError,
  ): void {
    const currentDate = new Date();

    const dateWithoutTime = new Date(date.setHours(0, 0, 0, 0));
    const currentWithoutTime = new Date(currentDate.setHours(0, 0, 0, 0));

    const isEqualOrFuture =
      dateWithoutTime.getTime() >= currentWithoutTime.getTime();

    this.validateAllOrThrow([!isEqualOrFuture], error);
  }
}
