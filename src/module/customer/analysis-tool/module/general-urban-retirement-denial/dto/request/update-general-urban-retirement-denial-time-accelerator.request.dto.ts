import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GeneralUrbanRetirementDenialTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum)
  public type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;

  @RequestDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;

  @RequestDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;

  @RequestDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum,
  )
  public viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public institution?: string;

  @RequestDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => GeneralUrbanRetirementDenialTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: GeneralUrbanRetirementDenialTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto.name;
}
