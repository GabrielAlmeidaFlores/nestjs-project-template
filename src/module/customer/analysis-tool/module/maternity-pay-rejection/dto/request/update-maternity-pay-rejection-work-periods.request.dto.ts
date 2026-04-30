import { MaternityPayRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-job-type.enum';
import { MaternityPayRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-period-consideration.enum';
import { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateMaternityPayRejectionWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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
  public competenceBelowTheMinimum?: string;

  protected override readonly _type =
    UpdateMaternityPayRejectionWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class UpdateMaternityPayRejectionWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(MaternityPayRejectionWorkPeriodDocumentTypeEnum)
  public type: MaternityPayRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    UpdateMaternityPayRejectionWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class UpdateMaternityPayRejectionWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoEnumProperty(
    MaternityPayRejectionWorkPeriodPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum;

  @RequestDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @RequestDtoStringProperty({ required: false })
  public status?: string;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoEnumProperty(MaternityPayRejectionWorkPeriodJobTypeEnum, {
    required: false,
  })
  public jobType?: MaternityPayRejectionWorkPeriodJobTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoObjectProperty(
    () => UpdateMaternityPayRejectionWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateMaternityPayRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => UpdateMaternityPayRejectionWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: UpdateMaternityPayRejectionWorkPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    UpdateMaternityPayRejectionWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class UpdateMaternityPayRejectionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateMaternityPayRejectionWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: UpdateMaternityPayRejectionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateMaternityPayRejectionWorkPeriodsRequestDto.name;
}
