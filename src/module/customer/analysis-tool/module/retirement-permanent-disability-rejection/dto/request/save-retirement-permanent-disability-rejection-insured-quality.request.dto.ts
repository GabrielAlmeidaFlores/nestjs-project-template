import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  public isInvoluntaryUnemployed: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public intendsToProveInvoluntaryUnemployment?: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public involuntaryUnemploymentProofDocuments?: Base64FileRequestDto[];

  @RequestDtoBooleanProperty()
  public isRuralInsuredAtGeneratingFact: boolean;

  @RequestDtoDateProperty({ required: false })
  public ruralInsuredStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public ruralInsuredEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public ruralInsuredDescription?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public ruralActivityDocuments?: Base64FileRequestDto[];

  protected override readonly _type =
    SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto.name;
}
