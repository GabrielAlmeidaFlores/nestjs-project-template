import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MaternityPayGrantFirstAnalysisAnalysisSectionModel extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly isConfirmed: boolean;

  @ResponseDtoStringProperty()
  public readonly description: string;

  protected override readonly _type =
    MaternityPayGrantFirstAnalysisAnalysisSectionModel.name;
}

@ResponseDto()
export class MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public readonly contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public readonly contributionValue: DecimalValue;

  protected override readonly _type =
    MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel.name;
}

@ResponseDto()
export class MaternityPayGrantFirstAnalysisPeriodModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly name: string;

  @ResponseDtoDateProperty()
  public readonly startDate: Date;

  @ResponseDtoDateProperty()
  public readonly endDate: Date;

  @ResponseDtoEnumProperty(MaternityPayGrantCategoryEnum)
  public readonly category: MaternityPayGrantCategoryEnum;

  @ResponseDtoNumberProperty({ required: false })
  public readonly gracePeriod?: number;

  @ResponseDtoBooleanProperty()
  public readonly status: boolean;

  @ResponseDtoBooleanProperty()
  public readonly isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public readonly competenceBelowTheMinimum: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public readonly contributionAverage?: DecimalValue;

  @ResponseDtoObjectProperty(
    () => MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel,
    { isArray: true },
  )
  public readonly belowMinimumContributions: MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel[];

  @ResponseDtoEnumProperty(MaternityPayGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public readonly reasonPendency?: MaternityPayGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bondOrigin?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public readonly complementViaMyInss?: boolean;

  protected override readonly _type =
    MaternityPayGrantFirstAnalysisPeriodModel.name;
}

@ResponseDto()
export class MaternityPayGrantFirstAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => MaternityPayGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly insuredQualityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => MaternityPayGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly carenciaAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(
    () => MaternityPayGrantFirstAnalysisAnalysisSectionModel,
  )
  public readonly benefitEligibilityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionModel;

  @ResponseDtoObjectProperty(() => MaternityPayGrantFirstAnalysisPeriodModel, {
    isArray: true,
  })
  public readonly periods: MaternityPayGrantFirstAnalysisPeriodModel[];

  protected override readonly _type = MaternityPayGrantFirstAnalysisModel.name;
}
