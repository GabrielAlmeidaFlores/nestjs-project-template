import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { CreateDisabilityRetirementPlanningGrantDocumentRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDisabilityRetirementPlanningGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum, {
    required: false,
  })
  public category?: DisabilityRetirementPlanningGrantCategoryEnum;

  @RequestDtoBooleanProperty({ required: false })
  public longPrizeDisability?: boolean;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningGrantDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateDisabilityRetirementPlanningGrantDocumentRequestDto[];

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningGrantRequestDto.name;
}
