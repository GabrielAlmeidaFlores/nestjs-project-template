import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { PreviousBenefitRequestDto } from './previous-benefit.request.dto';

@RequestDto()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public estimatedIncapacityStartDate?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public associatedCids?: string[];

  @RequestDtoStringProperty({ required: false })
  public medicalDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isAccidentRelated?: boolean;

  @RequestDtoStringProperty({ required: false })
  public accidentDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isSevereDisease?: boolean;

  @RequestDtoStringProperty({ required: false })
  public severeDiseaseType?: string;

  @RequestDtoStringProperty({ required: false })
  public severeDiseaseName?: string;

  @RequestDtoStringProperty({ required: false })
  public diseaseStartDate?: string;

  @RequestDtoBooleanProperty({ required: false })
  public needsPermanentAssistance?: boolean;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public medicalDocuments?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public previousMedicalReports?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public benefitDeclarations?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => PreviousBenefitRequestDto, {
    required: false,
    isArray: true,
  })
  public benefits?: PreviousBenefitRequestDto[];

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto.name;
}
