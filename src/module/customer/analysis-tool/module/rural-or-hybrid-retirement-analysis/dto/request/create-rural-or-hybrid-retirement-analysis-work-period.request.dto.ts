import { RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/enum/rural-or-hybrid-retirement-analysis-work-period-job-type.enum';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/enum/rural-or-hybrid-retirement-analysis-work-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public documentType?: string;

  @RequestDtoStringProperty({ required: false })
  public ownName?: string;

  @RequestDtoNumberProperty({ required: false })
  public documentYear?: number;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum,
  )
  public type: RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public remuneration?: string;

  @RequestDtoStringProperty({ required: false })
  public indicators?: string;

  @RequestDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public contribution?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowMinimum?: boolean;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public category?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @RequestDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @RequestDtoStringProperty({ required: false })
  public periodConsideration?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @RequestDtoStringProperty({ required: false })
  public status?: string;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum,
    { required: false },
  )
  public jobType?: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementAnalysisWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto,
    { required: false, isArray: true },
  )
  public documentAnalyses?: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto.name;
}
