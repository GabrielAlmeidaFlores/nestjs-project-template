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
export class UpdateInsuranceQualityAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisBenefitNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public analysisBenefitType?: string;

  @RequestDtoDateProperty({ required: false })
  public analysisBenefitConcessionDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public analysisBenefitCessationDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public analysisHasPreviousBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public analysisPreviousBenefitDetails?: string;

  @RequestDtoStringProperty({ required: false })
  public analysisContributionSituation?: string;

  @RequestDtoBooleanProperty({ required: false })
  public analysisHasRuralActivity?: boolean;

  @RequestDtoStringProperty({ required: false })
  public analysisRuralActivityDetails?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  protected override readonly _type =
    UpdateInsuranceQualityAnalysisJsonRequestDto.name;
}

@RequestDto()
export class UpdateInsuranceQualityAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnisDocument?: FileModel;

  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public ruralDocument?: FileModel;

  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public complementaryDocument?: FileModel;

  @RequestDtoObjectProperty(
    () => UpdateInsuranceQualityAnalysisJsonRequestDto,
    { required: false },
  )
  public json?: UpdateInsuranceQualityAnalysisJsonRequestDto;

  protected override readonly _type =
    UpdateInsuranceQualityAnalysisRequestDto.name;
}
