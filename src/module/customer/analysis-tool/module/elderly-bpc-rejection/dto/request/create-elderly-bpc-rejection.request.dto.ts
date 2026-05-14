import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';
import { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';
import { ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-income-type.enum';
import { ElderlyBpcRejectionFamiliarGroupKinshipEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-kinship.enum';
import { ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/enum/elderly-bpc-rejection-familiar-group-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateElderlyBpcRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(ElderlyBpcRejectionDocumentTypeEnum)
  public type: ElderlyBpcRejectionDocumentTypeEnum;

  protected override readonly _type =
    CreateElderlyBpcRejectionDocumentRequestDto.name;
}

@RequestDto()
export class CreateElderlyBpcRejectionFamiliarGroupDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum)
  public type: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum;

  protected override readonly _type =
    CreateElderlyBpcRejectionFamiliarGroupDocumentRequestDto.name;
}

@RequestDto()
export class CreateElderlyBpcRejectionFamiliarGroupRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public fullName?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupKinshipEnum, {
    required: false,
  })
  public kinship?: ElderlyBpcRejectionFamiliarGroupKinshipEnum;

  @RequestDtoBooleanProperty({ required: false })
  public livesInSameResidence?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasIncome?: boolean;

  @RequestDtoStringProperty({ required: false })
  public monthlyIncome?: string;

  @RequestDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public hasSupportingDocuments?: boolean;

  @RequestDtoObjectProperty(
    () => CreateElderlyBpcRejectionFamiliarGroupDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateElderlyBpcRejectionFamiliarGroupDocumentRequestDto[];

  protected override readonly _type =
    CreateElderlyBpcRejectionFamiliarGroupRequestDto.name;
}

@RequestDto()
export class CreateElderlyBpcRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(ElderlyBpcRejectionCategoryEnum, { required: false })
  public category?: ElderlyBpcRejectionCategoryEnum;

  @RequestDtoEnumProperty(ElderlyBpcRejectionMaritalStatusEnum, {
    required: false,
  })
  public maritalStatus?: ElderlyBpcRejectionMaritalStatusEnum;

  @RequestDtoBooleanProperty({ required: false })
  public applicantLivesAlone?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(() => CreateElderlyBpcRejectionDocumentRequestDto, {
    required: false,
    isArray: true,
  })
  public documents?: CreateElderlyBpcRejectionDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateElderlyBpcRejectionFamiliarGroupRequestDto,
    { required: false, isArray: true },
  )
  public familiarGroups?: CreateElderlyBpcRejectionFamiliarGroupRequestDto[];

  protected override readonly _type = CreateElderlyBpcRejectionRequestDto.name;
}
