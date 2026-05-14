import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FileDocumentRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto.name;
}

@RequestDto()
export class DataCreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPermanentDisabilityRevisionWorkPeriodsId)
  public retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId;

  protected override readonly _type =
    DataCreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto.name;
}

@RequestDto()
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto,
  )
  public json: DataCreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto,
    { required: true, isArray: true },
  )
  public documents: FileDocumentRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto[];

  protected override readonly _type =
    CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto.name;
}
