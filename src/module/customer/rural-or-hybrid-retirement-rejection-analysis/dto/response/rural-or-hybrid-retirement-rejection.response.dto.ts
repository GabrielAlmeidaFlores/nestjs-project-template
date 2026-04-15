import { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public id: RuralOrHybridRetirementRejectionId;

  @ResponseDtoStringProperty()
  public analysisName: string;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public id: RuralOrHybridRetirementRejectionId;

  @ResponseDtoStringProperty()
  public analysisName: string;

  @ResponseDtoStringProperty()
  public federativeEntity: string;

  @ResponseDtoStringProperty({ required: false })
  public state?: string;

  @ResponseDtoStringProperty({ required: false })
  public municipality?: string;

  @ResponseDtoStringProperty({ required: false })
  public currentPosition?: string;

  @ResponseDtoStringProperty({ required: false })
  public activityType?: string;

  @ResponseDtoDateProperty({ required: false })
  public publicServiceStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public careerStartDate?: Date;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class UpdateRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public id: RuralOrHybridRetirementRejectionId;

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionResponseDto.name;
}

@ResponseDto()
export class DeleteRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public id: RuralOrHybridRetirementRejectionId;

  protected override readonly _type =
    DeleteRuralOrHybridRetirementRejectionResponseDto.name;
}
