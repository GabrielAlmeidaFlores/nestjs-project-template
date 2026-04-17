import { MaternityPayGrantEligibilityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-eligibility-status.enum';
import { MaternityPayGrantInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/enum/maternity-pay-grant-insured-quality-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMaternityPayGrantResultApplicableRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ruleName: string;

  @ResponseDtoStringProperty()
  public result: string;

  @ResponseDtoStringProperty({ required: false })
  public estimatedBenefit?: string;

  @ResponseDtoStringProperty()
  public detailedAnalysis: string;

  protected override readonly _type =
    CreateMaternityPayGrantResultApplicableRuleResponseDto.name;
}

@ResponseDto()
export class CreateMaternityPayGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(MaternityPayGrantEligibilityStatusEnum)
  public eligibilityStatus: MaternityPayGrantEligibilityStatusEnum;

  @ResponseDtoEnumProperty(MaternityPayGrantInsuredQualityStatusEnum)
  public insuredQualityStatus: MaternityPayGrantInsuredQualityStatusEnum;

  @ResponseDtoObjectProperty(
    () => CreateMaternityPayGrantResultApplicableRuleResponseDto,
    { isArray: true },
  )
  public applicableRules: CreateMaternityPayGrantResultApplicableRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisDescription: string;

  protected override readonly _type =
    CreateMaternityPayGrantResultResponseDto.name;
}
