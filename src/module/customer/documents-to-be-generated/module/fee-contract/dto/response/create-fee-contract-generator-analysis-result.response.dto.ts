import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateFeeContractGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(FeeContractGeneratorId)
  public feeContractGeneratorId: FeeContractGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public feeContractGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreateFeeContractGeneratorResponseDto.name;
}
