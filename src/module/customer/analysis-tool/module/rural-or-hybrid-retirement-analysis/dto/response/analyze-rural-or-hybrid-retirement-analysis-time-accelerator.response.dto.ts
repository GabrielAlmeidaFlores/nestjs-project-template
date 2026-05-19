import { TimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-analysis-type.enum';
import { TimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-recognition-inss.enum';
import { TimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(TimeAcceleratorAnalysisTypeEnum)
  public timeType: TimeAcceleratorAnalysisTypeEnum;

  @ResponseDtoEnumProperty(TimeAcceleratorRecognitionInssEnum)
  public recognitionInss: TimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(TimeAcceleratorViabilityEnum)
  public viability: TimeAcceleratorViabilityEnum;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto.name;
}
