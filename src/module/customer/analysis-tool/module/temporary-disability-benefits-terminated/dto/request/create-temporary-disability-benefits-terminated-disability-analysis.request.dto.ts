import { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public benefitNumber: string;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public estimatedDisabilityStartDate: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public cidTenIds?: string[];

  @RequestDtoStringProperty({ required: false })
  public shortDisabilityDescription?: string;

  @RequestDtoBooleanProperty()
  public disabilityFromAccident: boolean;

  @RequestDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @RequestDtoBooleanProperty()
  public disabilityFromSevereDisease: boolean;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum;

  @RequestDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @RequestDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @RequestDtoBooleanProperty()
  public needsConstantAssistanceFromAnotherPerson: boolean;

  @RequestDtoBooleanProperty()
  public previousDisabilityBenefit: boolean;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto,
    { required: false, isArray: true },
  )
  public previousBenefits?: CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto.name;
}
