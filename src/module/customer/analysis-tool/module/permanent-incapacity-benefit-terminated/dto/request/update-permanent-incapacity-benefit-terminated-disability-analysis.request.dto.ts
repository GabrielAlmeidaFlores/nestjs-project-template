import { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentItemRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-disability-analysis.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto extends BaseBuildableDtoObject {
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
    PermanentIncapacityBenefitTerminatedSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum;

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
      CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentItemRequestDto[];

  protected override readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto.name;
}
