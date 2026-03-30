import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { ClientGenderEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import { HasContributedWithInssEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/has-contributed-with-inss.enum';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetMiniAdvisorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MiniAdvisorResultId)
  public miniAdvisorResultId: MiniAdvisorResultId;

  @ResponseDtoEnumProperty(AnalysisToolRecordTypeEnum)
  public chosenAnalysis: AnalysisToolRecordTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public benefitDescription?: string;

  @ResponseDtoStringProperty({ required: false })
  public attentionNote?: string;

  protected override readonly _type = GetMiniAdvisorResultResponseDto.name;
}

@ResponseDto()
export class GetMiniAdvisorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MiniAdvisorId)
  public miniAdvisorId: MiniAdvisorId;

  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoEnumProperty(ClientSituationEnum)
  public clientSituation: ClientSituationEnum;

  @ResponseDtoNumberProperty()
  public clientAge: number;

  @ResponseDtoEnumProperty(ClientGenderEnum)
  public clientGender: ClientGenderEnum;

  @ResponseDtoEnumProperty(ClientWorkHistoryTypeEnum, { isArray: true })
  public clientWorkHistory: ClientWorkHistoryTypeEnum[];

  @ResponseDtoEnumProperty(HasContributedWithInssEnum)
  public hasContributedWithInss: HasContributedWithInssEnum;

  @ResponseDtoBooleanProperty()
  public clientHasDisabilityOrLimitations: boolean;

  @ResponseDtoObjectProperty(() => GetMiniAdvisorResultResponseDto, {
    required: false,
  })
  public miniAdvisorResult?: GetMiniAdvisorResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetMiniAdvisorResponseDto.name;
}
