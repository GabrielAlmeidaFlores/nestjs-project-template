import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePermanentIncapacityBenefitTerminatedRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public benefitTerminationDate?: Date;

  @RequestDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum, {
    required: false,
  })
  public category?: PermanentIncapacityBenefitTerminatedCategoryEnum;

  @RequestDtoEnumProperty(PermanentIncapacityBenefitTerminatedReasonEnum, {
    required: false,
  })
  public terminationReason?: PermanentIncapacityBenefitTerminatedReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public terminationReasonDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedRequestDto.name;
}
