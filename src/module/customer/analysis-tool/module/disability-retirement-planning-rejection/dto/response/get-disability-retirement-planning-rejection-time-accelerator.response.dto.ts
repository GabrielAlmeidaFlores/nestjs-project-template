import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    DisabilityRetirementPlanningRejectionTimeAcceleratorId,
  )
  public id: DisabilityRetirementPlanningRejectionTimeAcceleratorId;

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

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoDateProperty({ required: false })
  public deletedAt?: Date;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.name;
}
