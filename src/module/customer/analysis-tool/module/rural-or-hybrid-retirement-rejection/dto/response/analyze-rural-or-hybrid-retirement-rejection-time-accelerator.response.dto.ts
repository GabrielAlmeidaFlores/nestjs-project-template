import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
  )
  public timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionViabilityEnum)
  public viability: RuralOrHybridRetirementRejectionViabilityEnum;

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
    AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () =>
      AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.name;
}
