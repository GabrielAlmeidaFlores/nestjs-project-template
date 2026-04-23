import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateAccidentAssistanceTerminatedJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoDateProperty()
  public der: Date;

  @RequestDtoDateProperty()
  public denialDate: Date;

  @RequestDtoEnumProperty(AccidentAssistanceTerminatedCategoryEnum)
  public category: AccidentAssistanceTerminatedCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public inssPassword?: string;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoStringProperty()
  public benefitCessationReason: string;

  @RequestDtoBooleanProperty()
  public hadPreviousIncapacityBenefit: boolean;

  @RequestDtoStringProperty({ required: false })
  public previousIncapacityBenefitNumber?: string;

  @RequestDtoDateProperty({ required: false })
  public previousIncapacityBenefitStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public previousIncapacityBenefitEndDate?: Date;

  @RequestDtoEnumProperty(
    AccidentAssistanceTerminatedExtensionRequestStatusEnum,
    { required: false },
  )
  public extensionRequestStatus?: AccidentAssistanceTerminatedExtensionRequestStatusEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedJsonRequestDto.name;
}

@RequestDto()
export class CreateAccidentAssistanceTerminatedRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateAccidentAssistanceTerminatedJsonRequestDto,
  )
  public json: CreateAccidentAssistanceTerminatedJsonRequestDto;

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedRequestDto.name;
}
