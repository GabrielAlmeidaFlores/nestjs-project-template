import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto extends BaseBuildableDtoObject {
  protected override readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto.name;
}
