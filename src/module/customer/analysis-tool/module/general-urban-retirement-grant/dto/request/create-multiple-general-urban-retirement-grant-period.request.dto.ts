import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto extends BaseBuildableDtoObject {
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
    DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto.name;
}

@RequestDto()
export class CreateMultipleGeneralUrbanRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId;

  @RequestDtoObjectProperty(
    () => DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto,
    { isArray: true },
  )
  public periods: DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto[];

  protected override readonly _type =
    CreateMultipleGeneralUrbanRetirementGrantPeriodRequestDto.name;
}
