import { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';
import { ElderlyBpcRejectionDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/value-object/elderly-bpc-rejection-document-id/elderly-bpc-rejection-document-id.value-object';
import { ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-income-type.enum';
import { ElderlyBpcRejectionFamiliarGroupKinshipEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-kinship.enum';
import { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';
import { ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/enum/elderly-bpc-rejection-familiar-group-document-type.enum';
import { ElderlyBpcRejectionFamiliarGroupDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/value-object/elderly-bpc-rejection-familiar-group-document-id/elderly-bpc-rejection-familiar-group-document-id.value-object';
import { ElderlyBpcRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/interface/elderly-bpc-rejection-complete-analysis.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetElderlyBpcRejectionInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssBenefit?: string;

  protected override readonly _type =
    GetElderlyBpcRejectionInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public legalProceedingNumber?: string;

  protected override readonly _type =
    GetElderlyBpcRejectionLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ElderlyBpcRejectionDocumentId)
  public elderlyBpcRejectionDocumentId: ElderlyBpcRejectionDocumentId;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionDocumentTypeEnum, {
    required: false,
  })
  public type?: ElderlyBpcRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetElderlyBpcRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ElderlyBpcRejectionFamiliarGroupDocumentId)
  public elderlyBpcRejectionFamiliarGroupDocumentId: ElderlyBpcRejectionFamiliarGroupDocumentId;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum, {
    required: false,
  })
  public type?: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum;

  protected override readonly _type =
    GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionFamiliarGroupResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ElderlyBpcRejectionFamiliarGroupId)
  public elderlyBpcRejectionFamiliarGroupId: ElderlyBpcRejectionFamiliarGroupId;

  @ResponseDtoStringProperty({ required: false })
  public fullName?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupKinshipEnum, {
    required: false,
  })
  public kinship?: ElderlyBpcRejectionFamiliarGroupKinshipEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public livesInSameResidence?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasIncome?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public monthlyIncome?: string;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum, {
    required: false,
  })
  public incomeType?: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasSupportingDocuments?: boolean;

  @ResponseDtoObjectProperty(
    () => GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto[];

  protected override readonly _type =
    GetElderlyBpcRejectionFamiliarGroupResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public elderlyBpcRejectionCompleteAnalysis?: ElderlyBpcRejectionCompleteAnalysisInterface;

  @ResponseDtoStringProperty({ required: false })
  public elderlyBpcRejectionSimplifiedAnalysis?: string;

  protected override readonly _type =
    GetElderlyBpcRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetElderlyBpcRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ElderlyBpcRejectionId)
  public elderlyBpcRejectionId: ElderlyBpcRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionCategoryEnum, { required: false })
  public category?: ElderlyBpcRejectionCategoryEnum;

  @ResponseDtoEnumProperty(ElderlyBpcRejectionMaritalStatusEnum, {
    required: false,
  })
  public maritalStatus?: ElderlyBpcRejectionMaritalStatusEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public applicantLivesAlone?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public createdAt?: Date;

  @ResponseDtoObjectProperty(
    () => GetElderlyBpcRejectionInssBenefitResponseDto,
    { required: false, isArray: true },
  )
  public elderlyBpcRejectionInssBenefit?: GetElderlyBpcRejectionInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetElderlyBpcRejectionLegalProceedingResponseDto,
    { required: false, isArray: true },
  )
  public elderlyBpcRejectionLegalProceeding?: GetElderlyBpcRejectionLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(() => GetElderlyBpcRejectionDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public elderlyBpcRejectionDocument?: GetElderlyBpcRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetElderlyBpcRejectionFamiliarGroupResponseDto,
    { required: false, isArray: true },
  )
  public elderlyBpcRejectionFamiliarGroup?: GetElderlyBpcRejectionFamiliarGroupResponseDto[];

  @ResponseDtoObjectProperty(() => GetElderlyBpcRejectionResultResponseDto, {
    required: false,
  })
  public elderlyBpcRejectionResult?: GetElderlyBpcRejectionResultResponseDto;

  protected override readonly _type = GetElderlyBpcRejectionResponseDto.name;
}
