import { RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementAnalysisViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public institution?: string;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum;

  @RequestDtoBooleanProperty({ required: false })
  public affectsQualifyingPeriod?: boolean;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisViabilityEnum, {
    required: false,
  })
  public viability?: RuralOrHybridRetirementAnalysisViabilityEnum;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: RuralOrHybridRetirementAnalysisTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto.name;
}
