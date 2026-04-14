import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/enum/temporary-disability-benefits-grant-insured-status-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantInsuredStatusDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum;

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantInsuredStatusDocumentItemRequestDto.name;
}

@RequestDto()
export class CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto extends BaseBuildableDtoObject {
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
      CreateTemporaryDisabilityBenefitsGrantInsuredStatusDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsGrantInsuredStatusDocumentItemRequestDto[];

  protected override readonly _type =
    CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto.name;
}
