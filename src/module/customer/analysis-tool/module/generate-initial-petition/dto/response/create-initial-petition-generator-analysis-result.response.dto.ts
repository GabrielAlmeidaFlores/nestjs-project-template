import { InitialPetitionGeneratorId } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateInitialPetitionGeneratorResponseDto extends BaseBuildableDtoObject {
    @ResponseDtoValueObjectProperty(
      InitialPetitionGeneratorId,
    )
  public initialPetitionGeneratorId: InitialPetitionGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public initialPetitionGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreateInitialPetitionGeneratorResponseDto.name;
}
