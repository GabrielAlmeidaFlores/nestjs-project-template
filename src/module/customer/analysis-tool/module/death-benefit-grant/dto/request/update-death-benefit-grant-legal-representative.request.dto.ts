import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitGrantLegalRepresentativeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public cpf?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public legalRepresentativeRelationship?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isMinorUnderGuardianship?: boolean;

  protected override readonly _type =
    UpdateDeathBenefitGrantLegalRepresentativeRequestDto.name;
}
