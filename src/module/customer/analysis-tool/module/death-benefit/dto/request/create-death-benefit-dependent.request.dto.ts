import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DeathBenefitDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-class.enum';
import { DeathBenefitDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateDeathBenefitDependentDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    CreateDeathBenefitDependentDocumentRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitDependentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoEnumProperty(DeathBenefitDependentClassEnum)
  public dependentClass: DeathBenefitDependentClassEnum;

  @RequestDtoEnumProperty(DeathBenefitDependentTypeEnum)
  public dependentType: DeathBenefitDependentTypeEnum;

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
    () => CreateDeathBenefitDependentDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateDeathBenefitDependentDocumentRequestDto[];

  protected override readonly _type =
    CreateDeathBenefitDependentRequestDto.name;
}
