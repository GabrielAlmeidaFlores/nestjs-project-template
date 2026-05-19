import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { CreateRuralOrHybridRetirementRejectionDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralOrHybridRetirementRejectionRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateRuralOrHybridRetirementRejectionDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateRuralOrHybridRetirementRejectionDocumentRequestDto[];

  protected override readonly _type =
    UpdateRuralOrHybridRetirementRejectionRequestDto.name;
}
