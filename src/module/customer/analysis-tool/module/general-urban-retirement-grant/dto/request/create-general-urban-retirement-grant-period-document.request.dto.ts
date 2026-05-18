import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FileDocumentGeneralUrbanRetirementGrantPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentGeneralUrbanRetirementGrantPeriodDocumentRequestDto.name;
}

@RequestDto()
export class DataCreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementGrantPeriodId)
  public generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId;

  protected override readonly _type =
    DataCreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto,
  )
  public json: DataCreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentGeneralUrbanRetirementGrantPeriodDocumentRequestDto,
    { required: true, isArray: true },
  )
  public documents: FileDocumentGeneralUrbanRetirementGrantPeriodDocumentRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto.name;
}
