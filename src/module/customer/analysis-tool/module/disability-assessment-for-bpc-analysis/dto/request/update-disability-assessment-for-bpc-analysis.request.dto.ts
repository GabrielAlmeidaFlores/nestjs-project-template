import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class UpdateDisabilityAssessmentForBpcAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoDateProperty({ required: false })
  public estimatedDisabilityStartDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public attendsSchoolOrTechnicalCourse?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public performsLaborActivity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public needsThirdPartyHelp?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasAccessToBasicServices?: boolean;

  @RequestDtoStringProperty({ required: false })
  public otherBarriersDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdateDisabilityAssessmentForBpcAnalysisJsonRequestDto.name;
}

@RequestDto()
export class UpdateDisabilityAssessmentForBpcAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public medicalAndSocialDocuments?: FileModel[];

  @RequestDtoObjectProperty(
    () => UpdateDisabilityAssessmentForBpcAnalysisJsonRequestDto,
    { required: false },
  )
  public json?: UpdateDisabilityAssessmentForBpcAnalysisJsonRequestDto;

  protected override readonly _type =
    UpdateDisabilityAssessmentForBpcAnalysisRequestDto.name;
}
