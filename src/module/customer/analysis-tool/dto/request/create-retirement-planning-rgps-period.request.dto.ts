import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataRetirementPlanningRgpsPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsId)
  public retirementPlanningRgpsId: RetirementPlanningRgpsId;

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
    DataRetirementPlanningRgpsPeriodRequestDto.name;
}

@RequestDto()
export class FileDocumentRetirementPlanningRgpsPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Base64)
  public file: Base64;

  protected override readonly _type =
    FileDocumentRetirementPlanningRgpsPeriodRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRgpsPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => DataRetirementPlanningRgpsPeriodRequestDto)
  public json: DataRetirementPlanningRgpsPeriodRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentRetirementPlanningRgpsPeriodRequestDto,
    { required: false, isArray: true },
  )
  public documents?: FileDocumentRetirementPlanningRgpsPeriodRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRgpsPeriodRequestDto.name;
}
