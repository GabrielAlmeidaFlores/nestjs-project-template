import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import { TemporaryDisabilityBenefitsGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/enum/temporary-disability-benefits-grant-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsGrantDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsGrantDocumentTypeEnum)
  public type: TemporaryDisabilityBenefitsGrantDocumentTypeEnum;

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantDocumentRequestDto.name;
}

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsGrantCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsGrantCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoObjectProperty(
    () => UpdateTemporaryDisabilityBenefitsGrantDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateTemporaryDisabilityBenefitsGrantDocumentRequestDto[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceeding?: string[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantRequestDto.name;
}
