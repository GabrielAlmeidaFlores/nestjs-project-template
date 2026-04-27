import { MaternityPayGrantEligibilityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-eligibility-status.enum';
import { MaternityPayGrantInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-insured-quality-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MaternityPayGrantCompleteAnalysisApplicableRuleModel extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly ruleName: string;

  @ResponseDtoStringProperty()
  public readonly result: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly estimatedBenefit?: string;

  @ResponseDtoStringProperty()
  public readonly detailedAnalysis: string;

  protected override readonly _type =
    MaternityPayGrantCompleteAnalysisApplicableRuleModel.name;
}

@ResponseDto()
export class MaternityPayGrantCompleteAnalysisModel extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(MaternityPayGrantEligibilityStatusEnum)
  public readonly eligibilityStatus: MaternityPayGrantEligibilityStatusEnum;

  @ResponseDtoEnumProperty(MaternityPayGrantInsuredQualityStatusEnum)
  public readonly insuredQualityStatus: MaternityPayGrantInsuredQualityStatusEnum;

  @ResponseDtoObjectProperty(
    () => MaternityPayGrantCompleteAnalysisApplicableRuleModel,
    { isArray: true },
  )
  public readonly applicableRules: MaternityPayGrantCompleteAnalysisApplicableRuleModel[];

  @ResponseDtoStringProperty()
  public readonly analysisDescription: string;

  protected override readonly _type =
    MaternityPayGrantCompleteAnalysisModel.name;
}
