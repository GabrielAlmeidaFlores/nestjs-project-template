import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRuralTimelineAnalysisCnisContributionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisCnisContributionPeriodId)
  public id: RuralTimelineAnalysisCnisContributionPeriodId;

  @ResponseDtoStringProperty({ required: false })
  public employmentRelationshipSource?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoNumberProperty({ required: false })
  public qualifyingPeriod?: number;

  @ResponseDtoEnumProperty(
    RuralTimelineAnalysisCnisContributionPeriodStatusEnum,
    { required: false },
  )
  public status?: RuralTimelineAnalysisCnisContributionPeriodStatusEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @ResponseDtoEnumProperty(ContributionAdjustmentIntentTypeEnum)
  public contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @ResponseDtoBooleanProperty()
  public externalSupplementationIntent: boolean;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodResponseDto.name;
}
