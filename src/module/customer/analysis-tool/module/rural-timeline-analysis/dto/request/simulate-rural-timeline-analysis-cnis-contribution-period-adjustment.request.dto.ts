import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description: 'Data de início do período original (CNIS).',
  })
  public originalPeriodStartDate: Date;

  @RequestDtoDateProperty({
    description: 'Data de término do período original (CNIS).',
  })
  public originalPeriodEndDate: Date;

  @RequestDtoDateProperty({
    description: 'Data de início do período convencional proposto.',
  })
  public conventionalPeriodStartDate: Date;

  @RequestDtoDateProperty({
    description: 'Data de término do período convencional proposto.',
  })
  public conventionalPeriodEndDate: Date;

  protected override readonly _type =
    SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto.name;
}
