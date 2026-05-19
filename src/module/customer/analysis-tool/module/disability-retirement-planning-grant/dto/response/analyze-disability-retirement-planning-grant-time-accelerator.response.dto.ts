import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantViabilityEnum)
  public viability: DisabilityRetirementPlanningGrantViabilityEnum;

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
    AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto.name;
}
