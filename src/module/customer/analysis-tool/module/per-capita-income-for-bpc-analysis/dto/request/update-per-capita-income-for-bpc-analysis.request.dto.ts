import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class UpdatePerCapitaIncomeForBpcAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdatePerCapitaIncomeForBpcAnalysisJsonRequestDto.name;
}

@RequestDto()
export class UpdatePerCapitaIncomeForBpcAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cnisDocument?: FileModel;

  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
  })
  public cadUnicoDocument?: FileModel;

  @RequestDtoObjectProperty(
    () => UpdatePerCapitaIncomeForBpcAnalysisJsonRequestDto,
    { required: false },
  )
  public json?: UpdatePerCapitaIncomeForBpcAnalysisJsonRequestDto;

  protected override readonly _type =
    UpdatePerCapitaIncomeForBpcAnalysisRequestDto.name;
}
