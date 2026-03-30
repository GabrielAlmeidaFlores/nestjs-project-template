import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { ClientGenderEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import { HasContributedWithInssEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/has-contributed-with-inss.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateMiniAdvisorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoEnumProperty(ClientSituationEnum)
  public clientSituation: ClientSituationEnum;

  @RequestDtoNumberProperty()
  public clientAge: number;

  @RequestDtoEnumProperty(ClientGenderEnum)
  public clientGender: ClientGenderEnum;

  @RequestDtoEnumProperty(ClientWorkHistoryTypeEnum, { isArray: true })
  public clientWorkHistory: ClientWorkHistoryTypeEnum[];

  @RequestDtoEnumProperty(HasContributedWithInssEnum)
  public hasContributedWithInss: HasContributedWithInssEnum;

  @RequestDtoBooleanProperty()
  public clientHasDisabilityOrLimitations: boolean;

  protected override readonly _type = CreateMiniAdvisorRequestDto.name;
}
