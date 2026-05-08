import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantPeriodBelowTheMinimumEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-below-the-minimum.enum';
import { SpecialRetirementGrantPeriodLeaveDateEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-leave-date.enum';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import { CreateSpecialRetirementGrantEarningRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-earning.request.dto';
import { CreateSpecialRetirementGrantPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period-document.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSpecialRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public employmentRelationshipSource?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public category?: string;

  @RequestDtoEnumProperty(SpecialRetirementGrantPeriodStatusEnum, {
    required: false,
  })
  public status?: SpecialRetirementGrantPeriodStatusEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @RequestDtoBooleanProperty({ required: false })
  public shouldConsiderPeriod?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public shouldConsiderLastRemunerationAsExitDate?: boolean;

  @RequestDtoEnumProperty(SpecialRetirementGrantPeriodBelowTheMinimumEnum, {
    required: false,
  })
  public belowTheMinimum?: SpecialRetirementGrantPeriodBelowTheMinimumEnum;

  @RequestDtoEnumProperty(SpecialRetirementGrantPeriodLeaveDateEnum, {
    required: false,
  })
  public leaveDate?: SpecialRetirementGrantPeriodLeaveDateEnum;

  @RequestDtoObjectProperty(
    () => CreateSpecialRetirementGrantEarningRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public earningsHistory?: CreateSpecialRetirementGrantEarningRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateSpecialRetirementGrantPeriodDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: CreateSpecialRetirementGrantPeriodDocumentRequestDto[];

  protected override readonly _type =
    CreateSpecialRetirementGrantPeriodRequestDto.name;
}
