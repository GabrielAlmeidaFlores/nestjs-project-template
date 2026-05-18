import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { DeathBenefitRejectionDependentQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-dependent-quality-status.enum';
import { DeathBenefitRejectionEligibilityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-eligibility-status.enum';
import { DeathBenefitRejectionInsuredQualityStatusEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/enum/death-benefit-rejection-insured-quality-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDeathBenefitRejectionResultClientDataResponseDto extends BaseBuildableDtoObject {
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
    CreateDeathBenefitRejectionResultClientDataResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitRejectionResultApplicableRuleResponseDto extends BaseBuildableDtoObject {
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
    CreateDeathBenefitRejectionResultApplicableRuleResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitRejectionResultDependentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public dependentName: string;

  @ResponseDtoStringProperty()
  public dependencyDegree: string;

  @ResponseDtoEnumProperty(DeathBenefitRejectionDependentQualityStatusEnum)
  public dependentQualityStatus: DeathBenefitRejectionDependentQualityStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public quotaValue?: string;

  @ResponseDtoStringProperty({ required: false })
  public pensionStartDate?: string;

  @ResponseDtoStringProperty()
  public estimatedPensionDuration: string;

  protected override readonly _type =
    CreateDeathBenefitRejectionResultDependentAnalysisResponseDto.name;
}

@ResponseDto()
export class CreateDeathBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitRejectionResultClientDataResponseDto,
  )
  public clientData: CreateDeathBenefitRejectionResultClientDataResponseDto;

  @ResponseDtoEnumProperty(DeathBenefitRejectionEligibilityStatusEnum)
  public eligibilityStatus: DeathBenefitRejectionEligibilityStatusEnum;

  @ResponseDtoEnumProperty(DeathBenefitRejectionInsuredQualityStatusEnum)
  public insuredQualityStatus: DeathBenefitRejectionInsuredQualityStatusEnum;

  @ResponseDtoEnumProperty(DeathBenefitRejectionDependentQualityStatusEnum)
  public dependentQualityStatus: DeathBenefitRejectionDependentQualityStatusEnum;

  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitRejectionResultApplicableRuleResponseDto,
    { isArray: true },
  )
  public applicableRules: CreateDeathBenefitRejectionResultApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => CreateDeathBenefitRejectionResultDependentAnalysisResponseDto,
    { isArray: true },
  )
  public dependentAnalysis: CreateDeathBenefitRejectionResultDependentAnalysisResponseDto[];

  @ResponseDtoStringProperty()
  public analysisDescription: string;

  protected override readonly _type =
    CreateDeathBenefitRejectionResultResponseDto.name;
}
