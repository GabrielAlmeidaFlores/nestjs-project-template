import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DeathBenefitRejectionPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(DeathBenefitRejectionCategoryEnum)
  public category: DeathBenefitRejectionCategoryEnum;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(DeathBenefitRejectionPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: DeathBenefitRejectionPeriodPendencyReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(DeathBenefitRejectionPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: DeathBenefitRejectionPeriodConsiderationEnum;

  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoStringProperty({ required: false })
  public impact?: string;

  @RequestDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @RequestDtoBooleanProperty({ required: false })
  public complementViaMyInss?: boolean;

  protected override readonly _type =
    DeathBenefitRejectionPeriodItemRequestDto.name;
}

@RequestDto()
export class DeathBenefitRejectionPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoStringProperty({ required: false })
  public analysis?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    DeathBenefitRejectionPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class FileDocumentDeathBenefitRejectionPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentDeathBenefitRejectionPeriodRequestDto.name;
}

@RequestDto()
export class DeathBenefitRejectionPeriodItemWithDocumentsRequestDto extends DeathBenefitRejectionPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () => FileDocumentDeathBenefitRejectionPeriodRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: FileDocumentDeathBenefitRejectionPeriodRequestDto[];

  @RequestDtoObjectProperty(
    () => DeathBenefitRejectionPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: DeathBenefitRejectionPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    DeathBenefitRejectionPeriodItemWithDocumentsRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitRejectionPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitRejectionPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DeathBenefitRejectionPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    CreateDeathBenefitRejectionPeriodRequestDto.name;
}
