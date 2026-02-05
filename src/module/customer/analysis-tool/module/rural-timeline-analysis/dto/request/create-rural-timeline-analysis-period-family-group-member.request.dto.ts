import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoStringProperty()
  public federalDocument: string;

  @RequestDtoEnumProperty(
    RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum,
  )
  public kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @RequestDtoBooleanProperty()
  public receivesRuralBenefit: boolean;

  @RequestDtoStringProperty()
  public benefitNumber: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false })
  public cnisDocument?: Base64FileRequestDto;

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto.name;
}
