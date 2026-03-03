import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class FileDocumentRetirementPlanningRgpsPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentRetirementPlanningRgpsPeriodRequestDto.name;
}

@RequestDto()
export class DataRetirementPlanningRgpsPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsPeriodId)
  public retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId;

  protected override readonly _type =
    DataRetirementPlanningRgpsPeriodDocumentRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRgpsPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataRetirementPlanningRgpsPeriodDocumentRequestDto,
  )
  public json: DataRetirementPlanningRgpsPeriodDocumentRequestDto;

  @RequestDtoObjectProperty(
    () => FileDocumentRetirementPlanningRgpsPeriodRequestDto,
    { required: true, isArray: true },
  )
  public documents: FileDocumentRetirementPlanningRgpsPeriodRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRgpsPeriodDocumentRequestDto.name;
}
