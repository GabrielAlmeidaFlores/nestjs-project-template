import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/enum/temporary-incapacity-benefit-rejection-insured-status-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTemporaryIncapacityBenefitRejectionInsuredStatusDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum,
  )
  public type: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionInsuredStatusDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto extends BaseBuildableDtoObject {
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
      CreateTemporaryIncapacityBenefitRejectionInsuredStatusDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryIncapacityBenefitRejectionInsuredStatusDocumentItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto.name;
}
