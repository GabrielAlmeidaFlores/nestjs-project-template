import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({
    description: 'Data em que a contribuição ficou em atraso.',
    required: false,
  })
  public overdueDate?: Date;

  @RequestDtoDateProperty({
    description:
      'Data em que a contribuição em atraso foi paga. Quando preenchido, aciona a IA para gerar análise de impacto.',
    required: false,
  })
  public paymentDate?: Date;

  @RequestDtoStringProperty({
    description:
      'Análise de impacto gerada pela IA quando o pagamento é registrado (preenchido automaticamente).',
    required: false,
  })
  public impactAnalysis?: string;

  protected override readonly _type =
    UpdateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto.name;
}
