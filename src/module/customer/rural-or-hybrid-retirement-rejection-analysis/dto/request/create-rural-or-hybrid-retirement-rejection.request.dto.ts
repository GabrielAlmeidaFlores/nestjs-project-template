import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionRequestedBenefitEnum,
    { required: false },
  )
  public requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum;

  @RequestDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public dateOfRejection?: Date;

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionRequestDto.name;
}
