import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public institution?: string;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum;

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

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionViabilityEnum,
    { required: false },
  )
  public viability?: RuralOrHybridRetirementRejectionViabilityEnum;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: RuralOrHybridRetirementRejectionTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto.name;
}
