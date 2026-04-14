import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
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
export class DeathBenefitGrantPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(DeathBenefitGrantCategoryEnum)
  public category: DeathBenefitGrantCategoryEnum;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(DeathBenefitGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: DeathBenefitGrantPeriodPendencyReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(DeathBenefitGrantPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: DeathBenefitGrantPeriodConsiderationEnum;

  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoStringProperty({ required: false })
  public impact?: string;

  @RequestDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @RequestDtoBooleanProperty({ required: false })
  public complementViaMyInss?: boolean;

  protected override readonly _type =
    DeathBenefitGrantPeriodItemRequestDto.name;
}

@RequestDto()
export class DeathBenefitGrantPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
    DeathBenefitGrantPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class FileDocumentDeathBenefitGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentDeathBenefitGrantPeriodRequestDto.name;
}

@RequestDto()
export class DeathBenefitGrantPeriodItemWithDocumentsRequestDto extends DeathBenefitGrantPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () => FileDocumentDeathBenefitGrantPeriodRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: FileDocumentDeathBenefitGrantPeriodRequestDto[];

  @RequestDtoObjectProperty(
    () => DeathBenefitGrantPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: DeathBenefitGrantPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    DeathBenefitGrantPeriodItemWithDocumentsRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DeathBenefitGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    CreateDeathBenefitGrantPeriodRequestDto.name;
}
