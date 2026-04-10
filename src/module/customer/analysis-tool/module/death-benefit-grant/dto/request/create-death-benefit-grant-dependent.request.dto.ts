import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DeathBenefitGrantDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-class.enum';
import { DeathBenefitGrantDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateDeathBenefitGrantDependentDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    CreateDeathBenefitGrantDependentDocumentRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitGrantDependentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoEnumProperty(DeathBenefitGrantDependentClassEnum)
  public dependentClass: DeathBenefitGrantDependentClassEnum;

  @RequestDtoEnumProperty(DeathBenefitGrantDependentTypeEnum)
  public dependentType: DeathBenefitGrantDependentTypeEnum;

  @RequestDtoEnumProperty(GenderEnum)
  public sex: GenderEnum;

  @RequestDtoDateProperty()
  public birthDate: Date;

  @RequestDtoBooleanProperty()
  public hasDisabilityOrInvalidism: boolean;

  @RequestDtoBooleanProperty()
  public isMinorUnder16: boolean;

  @RequestDtoDateProperty({ required: false })
  public stableUnionOrMarriageStartDate?: Date;

  @RequestDtoObjectProperty(
    () => CreateDeathBenefitGrantDependentDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateDeathBenefitGrantDependentDocumentRequestDto[];

  protected override readonly _type =
    CreateDeathBenefitGrantDependentRequestDto.name;
}
