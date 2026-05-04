import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcElderlyCessationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public readonly decisionDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public readonly previousInssBenefitNumber?: string;

  @RequestDtoEnumProperty(BpcElderlyCessationCategoryEnum, {
    required: false,
  })
  public readonly category?: BpcElderlyCessationCategoryEnum;

  @RequestDtoEnumProperty(BpcElderlyCessationCessationReasonEnum, {
    required: false,
  })
  public readonly cessationReason?: BpcElderlyCessationCessationReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly cessationReasonDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public readonly isAppealDeadlineExpired?: boolean;

  @RequestDtoStringProperty({ required: false })
  public readonly myInssPassword?: string;

  @RequestDtoEnumProperty(BpcElderlyCessationCivilStatusEnum, {
    required: false,
  })
  public readonly civilStatus?: BpcElderlyCessationCivilStatusEnum;

  @RequestDtoEnumProperty(BpcElderlyCessationEducationLevelEnum, {
    required: false,
  })
  public readonly educationLevel?: BpcElderlyCessationEducationLevelEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly currentAddress?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly previousAddress?: string;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasAddressChangedSinceDecision?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public readonly livesAlone?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumbers?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumbers?: string[];

  protected override readonly _type = CreateBpcElderlyCessationRequestDto.name;
}
