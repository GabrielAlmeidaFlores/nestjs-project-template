import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryIncapacityBenefitRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public denialDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitRejectionCategoryEnum;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitRejectionDenialReasonEnum, {
    required: false,
  })
  public denialReason?: TemporaryIncapacityBenefitRejectionDenialReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @RequestDtoEnumProperty(TemporaryIncapacityBenefitRejectionConditionEnum, {
    required: false,
  })
  public condition?: TemporaryIncapacityBenefitRejectionConditionEnum;

  @RequestDtoStringProperty({ required: false })
  public conditionDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdateTemporaryIncapacityBenefitRejectionRequestDto.name;
}
