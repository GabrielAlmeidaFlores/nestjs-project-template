import { CreatePermanentIncapacityBenefitTerminatedInsuredStatusDocumentItemRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-insured-status.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  public involuntaryUnemployment: boolean;

  @RequestDtoBooleanProperty()
  public intentionToProveInvoluntaryUnemployment: boolean;

  @RequestDtoBooleanProperty()
  public ruralInsuredClient: boolean;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public documentsDescription?: string;

  @RequestDtoObjectProperty(
    () =>
      CreatePermanentIncapacityBenefitTerminatedInsuredStatusDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreatePermanentIncapacityBenefitTerminatedInsuredStatusDocumentItemRequestDto[];

  protected override readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto.name;
}
