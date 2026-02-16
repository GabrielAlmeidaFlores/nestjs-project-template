import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'ID do período de contribuição CNIS criado.',
  })
  public contributionPeriodId: string;

  protected override readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto.name;

  public static buildFromEntity(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto {
    return CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
      contributionPeriodId: contributionPeriodId.toString(),
    });
  }
}
