import { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/enum/temporary-disability-benefits-grant-period-document-type.enum';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/enum/temporary-disability-benefits-grant-previous-benefits-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantPeriodDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantPeriodDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public benefitNumber: string;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoStringProperty({ required: false })
  public cidTenId?: string;

  @RequestDtoStringProperty({ required: false })
  public description?: string;

  @RequestDtoBooleanProperty()
  public jobDerivatedDisability: boolean;

  @RequestDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @RequestDtoBooleanProperty()
  public disabilityFromSevereDisease: boolean;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsGrantSevereDiseaseEnum, {
    required: false,
  })
  public severeDisease?: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum;

  @RequestDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @RequestDtoBooleanProperty()
  public needsConstantAssistanceFromAnotherPerson: boolean;

  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsGrantPeriodDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsGrantPeriodDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsItemRequestDto,
    { required: false, isArray: true },
  )
  public previousBenefits?: CreateTemporaryDisabilityBenefitsGrantPreviousBenefitsItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantPeriodRequestDto.name;
}
