import { GetLegalProceedingDetailLawyerWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-lawyer-with-relations.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListLegalProceedingDetailLawyerResponseDto extends ListDataResponseDto<GetLegalProceedingDetailLawyerWithRelationsResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetLegalProceedingDetailLawyerWithRelationsResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetLegalProceedingDetailLawyerWithRelationsResponseDto[];

  protected override readonly _type =
    ListLegalProceedingDetailLawyerResponseDto.name;
}
