import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
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
export class CreateLegalPleadingAddressDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public city: string;

  @RequestDtoStringProperty()
  public neighborhood: string;

  @RequestDtoStringProperty()
  public street: string;

  @RequestDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @RequestDtoValueObjectProperty(PostalCode)
  public postalCode: PostalCode;

  @RequestDtoNumberProperty()
  public addressNumber: number;

  protected override readonly _type =
    CreateLegalPleadingAddressDataRequestDto.name;
}

@RequestDto()
export class CreateLegalPleadingDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public statementOfFacts: string;

  @RequestDtoStringProperty({ required: false })
  public additionalComments?: string;

  @RequestDtoEnumProperty(LegalPleadingSocialSecuritySystemEnum)
  public securitySystem: LegalPleadingSocialSecuritySystemEnum;

  @RequestDtoEnumProperty(LegalPleadingBenefitTypeEnum)
  public benefitType: LegalPleadingBenefitTypeEnum;

  @RequestDtoEnumProperty(LegalPleadingPetitionTypeEnum)
  public petitionType: LegalPleadingPetitionTypeEnum;

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

  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoObjectProperty(() => CreateLegalPleadingAddressDataRequestDto, {
    required: false,
  })
  public legalPleadingAddress?: CreateLegalPleadingAddressDataRequestDto;

  protected override readonly _type = CreateLegalPleadingDataRequestDto.name;
}

@RequestDto()
export class CreateLegalPleadingRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnis?: FileModel;

  @RequestDtoFileProperty({ required: false })
  public ctps?: FileModel;

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
  public supportingDocument?: FileModel[];

  @RequestDtoObjectProperty(() => CreateLegalPleadingDataRequestDto)
  public json: CreateLegalPleadingDataRequestDto;

  protected override readonly _type = CreateLegalPleadingRequestDto.name;
}
