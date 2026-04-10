import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitGrantInstitorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public cpf?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @RequestDtoDateProperty({ required: false })
  public deathDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public wasRetired?: boolean;

  protected override readonly _type =
    UpdateDeathBenefitGrantInstitorRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitGrantLegalRepresentativeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public cpf?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public isMinorUnderGuardianship?: boolean;

  @RequestDtoStringProperty({ required: false })
  public legalRepresentativeRelationship?: string;

  protected override readonly _type =
    UpdateDeathBenefitGrantLegalRepresentativeRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(() => UpdateDeathBenefitGrantInstitorRequestDto, {
    required: false,
  })
  public institutor?: UpdateDeathBenefitGrantInstitorRequestDto;

  @RequestDtoObjectProperty(
    () => UpdateDeathBenefitGrantLegalRepresentativeRequestDto,
    { required: false },
  )
  public legalRepresentative?: UpdateDeathBenefitGrantLegalRepresentativeRequestDto;

  protected override readonly _type = UpdateDeathBenefitGrantRequestDto.name;
}
