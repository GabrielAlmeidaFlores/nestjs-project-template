import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FileDocumentAccidentAssistanceTerminatedPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentAccidentAssistanceTerminatedPeriodRequestDto.name;
}

@RequestDto()
export class CreateAccidentAssistanceTerminatedPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ example: 1 })
  public sequencial: number;

  @RequestDtoStringProperty({ example: 'Trabalho Formal' })
  public periodName: string;

  @RequestDtoDateProperty({ example: '2025-01-01' })
  public periodStart: Date;

  @RequestDtoDateProperty({ example: '2025-12-31', required: false })
  public periodEnd?: Date;

  @RequestDtoStringProperty({ example: 'Empregado' })
  public category: string;

  @RequestDtoBooleanProperty({ example: false })
  public isPendency: boolean;

  @RequestDtoBooleanProperty({ example: false })
  public competenceBelowTheMinimum: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoStringProperty({ example: 'Urbano' })
  public typeOfContribution: string;

  @RequestDtoBooleanProperty({ example: true })
  public status: boolean;

  @RequestDtoObjectProperty(
    () => FileDocumentAccidentAssistanceTerminatedPeriodRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: FileDocumentAccidentAssistanceTerminatedPeriodRequestDto[];

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedPeriodRequestDto.name;
}
