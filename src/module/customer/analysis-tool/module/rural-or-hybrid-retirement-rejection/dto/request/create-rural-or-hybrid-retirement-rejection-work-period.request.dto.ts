import { RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/enum/rural-or-hybrid-retirement-rejection-work-period-job-type.enum';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/enum/rural-or-hybrid-retirement-rejection-work-period-document-type.enum';
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
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public documentType?: string;

  @RequestDtoStringProperty({ required: false })
  public ownName?: string;

  @RequestDtoNumberProperty({ required: false })
  public documentYear?: number;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum,
  )
  public type: RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto extends BaseBuildableDtoObject {
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
    RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum,
    { required: false },
  )
  public jobType?: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto,
    { required: false, isArray: true },
  )
  public documentAnalyses?: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementRejectionWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto,
    { isArray: true },
  )
  public workPeriods: RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementRejectionWorkPeriodRequestDto.name;
}
