import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public clientName?: string;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @RequestDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @RequestDtoEnumProperty(GenderEnum, { required: false })
  public clientGender?: GenderEnum;

  @RequestDtoDateProperty({ required: false })
  public deathDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public federativeEntity?: string;

  @RequestDtoStringProperty({ required: false })
  public stateCode?: string;

  @RequestDtoBooleanProperty({ required: false })
  public beneficiaryWasRetired?: boolean;

  protected override readonly _type =
    UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto.name;
}
