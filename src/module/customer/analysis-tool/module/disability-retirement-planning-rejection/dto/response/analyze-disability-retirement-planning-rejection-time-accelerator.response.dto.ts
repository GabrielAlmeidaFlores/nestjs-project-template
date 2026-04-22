import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum,
  )
  public viability: DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.name;
}
