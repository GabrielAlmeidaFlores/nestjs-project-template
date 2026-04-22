import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class MaternityPayGrantPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(MaternityPayGrantCategoryEnum)
  public category: MaternityPayGrantCategoryEnum;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(MaternityPayGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: MaternityPayGrantPeriodPendencyReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(MaternityPayGrantPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: MaternityPayGrantPeriodConsiderationEnum;

  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoBooleanProperty({ required: false })
  public complementViaMyInss?: boolean;

  protected override readonly _type =
    MaternityPayGrantPeriodItemRequestDto.name;
}

@RequestDto()
export class MaternityPayGrantPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
    MaternityPayGrantPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class FileDocumentMaternityPayGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentMaternityPayGrantPeriodRequestDto.name;
}

@RequestDto()
export class MaternityPayGrantPeriodItemWithDocumentsRequestDto extends MaternityPayGrantPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () => FileDocumentMaternityPayGrantPeriodRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: FileDocumentMaternityPayGrantPeriodRequestDto[];
  
  protected override readonly _type =
    MaternityPayGrantPeriodItemWithDocumentsRequestDto.name;
}

@RequestDto()
export class CreateMaternityPayGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => MaternityPayGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: MaternityPayGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    CreateMaternityPayGrantPeriodRequestDto.name;
}
