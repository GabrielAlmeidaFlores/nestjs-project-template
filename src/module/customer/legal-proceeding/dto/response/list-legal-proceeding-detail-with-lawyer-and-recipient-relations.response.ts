import { GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-with-lawyer-and-recipient-relations.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto extends ListDataResponseDto<GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto[];

  protected override readonly _type =
    ListLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto.name;
}
