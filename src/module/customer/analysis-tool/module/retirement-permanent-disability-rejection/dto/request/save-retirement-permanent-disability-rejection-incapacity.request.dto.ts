import { RetirementPermanentDisabilityRejectionSeriousDiseaseEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/enum/retirement-permanent-disability-rejection-serious-disease.enum';
import { SaveRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-incapacity-previous-benefit.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public incapacityStartDate?: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public cids?: string[];

  @RequestDtoStringProperty({ required: false })
  public diseaseDescription?: string;

  @RequestDtoBooleanProperty()
  public isIncapacityFromAccident: boolean;

  @RequestDtoStringProperty({ required: false })
  public incapacitatingEventDescription?: string;

  @RequestDtoBooleanProperty()
  public isIncapacityFromSeriousDisease: boolean;

  @RequestDtoEnumProperty(
    RetirementPermanentDisabilityRejectionSeriousDiseaseEnum,
    { required: false },
  )
  public seriousDiseaseType?: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum;

  @RequestDtoStringProperty({ required: false })
  public seriousDiseaseOtherDescription?: string;

  @RequestDtoDateProperty({ required: false })
  public seriousDiseaseStartDate?: Date;

  @RequestDtoBooleanProperty()
  public needsPermanentAssistance: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public permanentAssistanceDocuments?: Base64FileRequestDto[];

  @RequestDtoBooleanProperty()
  public hasPreviousIncapacityBenefit: boolean;

  @RequestDtoObjectProperty(
    () =>
      SaveRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitRequestDto,
    { isArray: true, required: false },
  )
  public previousBenefits?: SaveRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitRequestDto[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public previousBenefitCids?: string[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    isArray: true,
    required: false,
  })
  public previousBenefitDocuments?: Base64FileRequestDto[];

  protected override readonly _type =
    SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto.name;
}
