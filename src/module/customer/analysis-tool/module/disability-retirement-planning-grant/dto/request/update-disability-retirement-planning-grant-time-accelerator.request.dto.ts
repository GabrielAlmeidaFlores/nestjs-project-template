import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DisabilityRetirementPlanningGrantTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;

  @RequestDtoEnumProperty(DisabilityRetirementPlanningGrantViabilityEnum)
  public viability: DisabilityRetirementPlanningGrantViabilityEnum;

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
    DisabilityRetirementPlanningGrantTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: DisabilityRetirementPlanningGrantTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto.name;
}
