import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DeathBenefitRejectionDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-class.enum';
import { DeathBenefitRejectionDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitRejectionDependentDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    UpdateDeathBenefitRejectionDependentDocumentRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitRejectionDependentDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoEnumProperty(DeathBenefitRejectionDependentClassEnum)
  public dependentClass: DeathBenefitRejectionDependentClassEnum;

  @RequestDtoEnumProperty(DeathBenefitRejectionDependentTypeEnum)
  public dependentType: DeathBenefitRejectionDependentTypeEnum;

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
    () => UpdateDeathBenefitRejectionDependentDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: UpdateDeathBenefitRejectionDependentDocumentRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitRejectionDependentDto.name;
}

@RequestDto()
export class UpdateDeathBenefitRejectionDependentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => UpdateDeathBenefitRejectionDependentDto, {
    required: false,
    isArray: true,
  })
  public dependents?: UpdateDeathBenefitRejectionDependentDto[];

  protected override readonly _type =
    UpdateDeathBenefitRejectionDependentRequestDto.name;
}
