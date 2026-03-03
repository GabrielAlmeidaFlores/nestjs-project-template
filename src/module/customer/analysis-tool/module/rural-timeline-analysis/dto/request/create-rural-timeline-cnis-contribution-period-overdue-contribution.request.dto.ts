import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description: 'Data em que a contribuição ficou em atraso.',
    required: true,
  })
  public overdueDate: Date;

  @RequestDtoDateProperty({
    description:
      'Data em que a contribuição em atraso foi paga (opcional, será preenchido posteriormente).',
    required: false,
  })
  public paymentDate?: Date;

  protected override readonly _type =
    CreateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto.name;
}
