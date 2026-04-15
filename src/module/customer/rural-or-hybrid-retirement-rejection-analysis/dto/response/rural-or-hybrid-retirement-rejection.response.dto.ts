import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionRequestedBenefitEnum, {
    required: false,
  })
  public requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum;

  @ResponseDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public dateOfRejection?: Date;

  @ResponseDtoDateProperty({ required: false })
  public createdAt?: Date;

  @ResponseDtoDateProperty({ required: false })
  public updatedAt?: Date;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class UpdateRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class DeleteRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected override readonly _type =
    DeleteRuralOrHybridRetirementRejectionResponseDto.name;
}
