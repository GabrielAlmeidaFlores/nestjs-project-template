import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description:
      'Nome completo do familiar que participou da atividade rural em regime de economia familiar.',
    required: false,
  })
  public name?: string;

  @RequestDtoStringProperty({
    description:
      'CPF do membro do grupo familiar envolvido na atividade rural.',
    required: false,
  })
  public federalDocument?: string;

  @RequestDtoEnumProperty(
    RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum,
    {
      description:
        'Grau de parentesco com o cliente: Cônjuge, Filho(a), Pai/Mãe ou Irmão/Irmã.',
      required: false,
    },
  )
  public kinship?: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @RequestDtoBooleanProperty({
    description:
      'Indica se este familiar recebe ou recebeu benefício previdenciário rural do INSS.',
    required: false,
  })
  public receivesRuralBenefit?: boolean;

  @RequestDtoStringProperty({
    description:
      'Número do benefício rural (NB) recebido pelo familiar, caso aplicável.',
    required: false,
  })
  public benefitNumber?: string;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    description:
      'Documento CNIS do familiar para comprovação de vínculo rural.',
    required: false,
  })
  public cnisDocument?: Base64FileRequestDto;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto.name;
}
