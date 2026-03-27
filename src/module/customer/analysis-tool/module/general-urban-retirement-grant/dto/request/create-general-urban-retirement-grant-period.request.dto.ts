import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
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
export class DataCreateGeneralUrbanRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  @RequestDtoStringProperty({ example: 'Trabalho Formal' })
  public periodName: string;

  @RequestDtoDateProperty({ example: '2025-12-12' })
  public periodStart: Date;

  @RequestDtoDateProperty({ example: '2025-12-12', required: false })
  public periodEnd?: Date;

  @RequestDtoStringProperty({ example: 'Empregado Doméstico' })
  public category: string;

  @RequestDtoBooleanProperty({ example: true })
  public isPendency: boolean;

  @RequestDtoBooleanProperty({ example: true })
  public competenceBelowTheMinimum: boolean;

  @RequestDtoNumberProperty({ example: 1000 })
  public contributionAverage: number;

  @RequestDtoStringProperty({ example: 'Urbano' })
  public typeOfContribution: string;

  @RequestDtoBooleanProperty({ example: true })
  public status: boolean;

  protected override readonly _type =
    DataCreateGeneralUrbanRetirementGrantPeriodRequestDto.name;
}

@RequestDto()
export class FileDocumentGeneralUrbanRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentGeneralUrbanRetirementGrantPeriodRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateGeneralUrbanRetirementGrantPeriodRequestDto,
  )
  public json: DataCreateGeneralUrbanRetirementGrantPeriodRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentGeneralUrbanRetirementGrantPeriodRequestDto,
    { required: false, isArray: true },
  )
  public documents?: FileDocumentGeneralUrbanRetirementGrantPeriodRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementGrantPeriodRequestDto.name;
}
