import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { DeathBenefitGrantDependentQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-dependent-quality-status.enum';
import { DeathBenefitGrantEligibilityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-eligibility-status.enum';
import { DeathBenefitGrantInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/enum/death-benefit-grant-insured-quality-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitGrantResultClientDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public gender?: string;

  @ResponseDtoStringProperty({ required: false })
  public email?: string;

  @ResponseDtoStringProperty({ required: false })
  public phoneNumber?: string;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public category?: AnalysisToolClientTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public nb?: string;

  @ResponseDtoStringProperty({ required: false })
  public legalProceedingNumber?: string;

  protected override readonly _type =
    CreateDeathBenefitGrantResultClientDataResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitGrantResultApplicableRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ruleName: string;

  @ResponseDtoStringProperty()
  public result: string;

  @ResponseDtoStringProperty({ required: false })
  public rightDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public estimatedRmi?: string;

  @ResponseDtoNumberProperty({ required: false })
  public quotaQuantity?: number;

  @ResponseDtoStringProperty({ required: false })
  public quotaValue?: string;

  @ResponseDtoStringProperty()
  public detailedAnalysis: string;

  protected override readonly _type =
    CreateDeathBenefitGrantResultApplicableRuleResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitGrantResultDependentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public dependentName: string;

  @ResponseDtoStringProperty()
  public dependencyDegree: string;

  @ResponseDtoEnumProperty(DeathBenefitGrantDependentQualityStatusEnum)
  public dependentQualityStatus: DeathBenefitGrantDependentQualityStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public quotaValue?: string;

  @ResponseDtoStringProperty({ required: false })
  public pensionStartDate?: string;

  @ResponseDtoStringProperty()
  public estimatedPensionDuration: string;

  protected override readonly _type =
    CreateDeathBenefitGrantResultDependentAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitGrantResultClientDataResponseDto,
  )
  public clientData: CreateDeathBenefitGrantResultClientDataResponseDto;

  @ResponseDtoEnumProperty(DeathBenefitGrantEligibilityStatusEnum)
  public eligibilityStatus: DeathBenefitGrantEligibilityStatusEnum;

  @ResponseDtoEnumProperty(DeathBenefitGrantInsuredQualityStatusEnum)
  public insuredQualityStatus: DeathBenefitGrantInsuredQualityStatusEnum;

  @ResponseDtoEnumProperty(DeathBenefitGrantDependentQualityStatusEnum)
  public dependentQualityStatus: DeathBenefitGrantDependentQualityStatusEnum;

  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitGrantResultApplicableRuleResponseDto,
    { isArray: true },
  )
  public applicableRules: CreateDeathBenefitGrantResultApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitGrantResultDependentAnalysisResponseDto,
    { isArray: true },
  )
  public dependentAnalysis: CreateDeathBenefitGrantResultDependentAnalysisResponseDto[];

  @ResponseDtoStringProperty()
  public analysisDescription: string;

  protected override readonly _type =
    CreateDeathBenefitGrantResultResponseDto.name;
}
