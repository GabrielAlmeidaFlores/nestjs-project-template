import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';
import { BenefitNumber } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/benefit-number.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class UpdateLegalPleadingAddressDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public city?: string;

  @RequestDtoStringProperty({ required: false })
  public neighborhood?: string;

  @RequestDtoStringProperty({ required: false })
  public street?: string;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public stateCode?: StateCodeEnum;

  @RequestDtoValueObjectProperty(PostalCode, { required: false })
  public postalCode?: PostalCode;

  @RequestDtoNumberProperty({ required: false })
  public addressNumber?: number;

  protected override readonly _type =
    UpdateLegalPleadingAddressDataRequestDto.name;
}

@RequestDto()
export class UpdateLegalPleadingDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public statementOfFacts?: string;

  @RequestDtoStringProperty({ required: false })
  public additionalComments?: string;

  @RequestDtoEnumProperty(LegalPleadingSocialSecuritySystemEnum, {
    required: false,
  })
  public securitySystem?: LegalPleadingSocialSecuritySystemEnum;

  @RequestDtoEnumProperty(LegalPleadingBenefitTypeEnum, { required: false })
  public benefitType?: LegalPleadingBenefitTypeEnum;

  @RequestDtoEnumProperty(LegalPleadingPetitionTypeEnum, { required: false })
  public petitionType?: LegalPleadingPetitionTypeEnum;

  @RequestDtoValueObjectProperty(BenefitNumber, { required: false })
  public benefitNumber?: BenefitNumber;

  @RequestDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public benefitTerminationDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public benefitInitialMonthlyIncome?: DecimalValue;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public benefitCurrentMonthlyIncome?: DecimalValue;

  @RequestDtoEnumProperty(LegalPleadingSocialSecurityObjectiveEnum, {
    required: false,
  })
  public socialSecurityObjective?: LegalPleadingSocialSecurityObjectiveEnum;

  @RequestDtoEnumProperty(LegalPleadingWritOfMandamusObjectiveEnum, {
    required: false,
  })
  public legalPleadingWritOfMandamusObjective?: LegalPleadingWritOfMandamusObjectiveEnum;

  @RequestDtoObjectProperty(() => UpdateLegalPleadingAddressDataRequestDto, {
    required: false,
  })
  public legalPleadingAddress?: UpdateLegalPleadingAddressDataRequestDto;

  protected override readonly _type = UpdateLegalPleadingDataRequestDto.name;
}

@RequestDto()
export class UpdateLegalPleadingRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnis?: FileModel;

  @RequestDtoFileProperty({ isArray: true, required: false })
  public ctps?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public ruralDocument?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public specialWorkPeriodRecognitionDocument?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public personalDocument?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public relevantPriorAdministrativeProceeding?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public relatedCourtCase?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public judicialProcesses?: FileModel[];

  @RequestDtoFileProperty({ isArray: true, required: false })
  public supportingDocument?: FileModel[];

  @RequestDtoObjectProperty(() => UpdateLegalPleadingDataRequestDto)
  public json: UpdateLegalPleadingDataRequestDto;

  protected override readonly _type = UpdateLegalPleadingRequestDto.name;
}
