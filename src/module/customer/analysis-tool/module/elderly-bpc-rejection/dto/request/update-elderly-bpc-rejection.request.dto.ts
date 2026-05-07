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
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateElderlyBpcRejectionDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(ElderlyBpcRejectionDocumentTypeEnum)
  public type: ElderlyBpcRejectionDocumentTypeEnum;

  protected override readonly _type =
    UpdateElderlyBpcRejectionDocumentRequestDto.name;
}

@RequestDto()
export class UpdateElderlyBpcRejectionFamiliarGroupDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum)
  public type: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum;

  protected override readonly _type =
    UpdateElderlyBpcRejectionFamiliarGroupDocumentRequestDto.name;
}

@RequestDto()
export class UpdateElderlyBpcRejectionFamiliarGroupRequestDto extends BaseBuildableDtoObject {
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
    () => UpdateElderlyBpcRejectionFamiliarGroupDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateElderlyBpcRejectionFamiliarGroupDocumentRequestDto[];

  protected override readonly _type =
    UpdateElderlyBpcRejectionFamiliarGroupRequestDto.name;
}

@RequestDto()
export class UpdateElderlyBpcRejectionRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoObjectProperty(() => UpdateElderlyBpcRejectionDocumentRequestDto, {
    required: false,
    isArray: true,
  })
  public documents?: UpdateElderlyBpcRejectionDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => UpdateElderlyBpcRejectionFamiliarGroupRequestDto,
    { required: false, isArray: true },
  )
  public familiarGroups?: UpdateElderlyBpcRejectionFamiliarGroupRequestDto[];

  protected override readonly _type = UpdateElderlyBpcRejectionRequestDto.name;
}
