import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataAnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
  )
  public timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum;

  protected override readonly _type =
    DataAnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      DataAnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  )
  public json: DataAnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public document: Base64FileRequestDto;

  protected override readonly _type =
    AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto.name;
}
