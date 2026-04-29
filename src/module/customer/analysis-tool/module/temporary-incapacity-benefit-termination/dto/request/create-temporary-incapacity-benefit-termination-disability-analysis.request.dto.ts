import { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum,
  )
  public type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto extends BaseBuildableDtoObject {
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
    TemporaryIncapacityBenefitTerminationSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum;

  @RequestDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @RequestDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @RequestDtoBooleanProperty()
  public needsConstantAssistanceFromAnotherPerson: boolean;

  @RequestDtoBooleanProperty()
  public previousDisabilityBenefit: boolean;

  @RequestDtoStringProperty({ required: false })
  public previousBenefitNumber?: string;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto.name;
}
