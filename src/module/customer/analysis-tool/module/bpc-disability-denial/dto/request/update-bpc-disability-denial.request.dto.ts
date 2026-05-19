import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateBpcDisabilityDenialRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public readonly analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public readonly requestEntryDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly denialDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public readonly requestedBenefitType?: string;

  @RequestDtoEnumProperty(BpcDisabilityDenialCategoryEnum, { required: false })
  public readonly category?: BpcDisabilityDenialCategoryEnum;

  @RequestDtoEnumProperty(BpcDisabilityDenialDenialReasonEnum, {
    required: false,
  })
  public readonly denialReason?: BpcDisabilityDenialDenialReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly denialReasonDescription?: string;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
    { required: false },
  )
  public readonly disabilityType?: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum, {
    required: false,
  })
  public readonly disabilityDegree?: RetirementPlanningDisabilityDegreeEnum;

  @RequestDtoDateProperty({ required: false })
  public readonly estimatedDisabilityStartDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public readonly attendsSchoolOrTechnicalCourse?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly performsLaborActivity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly needsThirdPartyHelp?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasAccessToBasicServices?: boolean;

  @RequestDtoStringProperty({ required: false })
  public readonly otherBarriersDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public readonly livesAlone?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumbers?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumbers?: string[];

  protected override readonly _type = UpdateBpcDisabilityDenialRequestDto.name;
}
