import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description:
      'Data original em que a contribuição deveria ter sido realizada.',
    required: true,
  })
  public originalContributionDate: Date;

  @RequestDtoDateProperty({
    description:
      'Data efetiva em que o pagamento da contribuição foi realizado (em atraso).',
    required: true,
  })
  public actualPaymentDate: Date;

  protected override readonly _type =
    SyncRuralTimelineAnalysisCnisContributionPeriodLateContributionItemRequestDto.name;
}
