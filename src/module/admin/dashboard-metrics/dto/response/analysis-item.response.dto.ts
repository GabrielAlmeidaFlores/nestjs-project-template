import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalysisItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolRecordId)
  public analysisToolRecordId: AnalysisToolRecordId;

  @ResponseDtoValueObjectProperty(AnalysisToolRecordCode)
  public analysisToolRecordCode: AnalysisToolRecordCode;

  @ResponseDtoEnumProperty(AnalysisToolRecordTypeEnum)
  public analysisToolRecordType: AnalysisToolRecordTypeEnum;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public analysisStatus: AnalysisStatusEnum;

  @ResponseDtoStringProperty()
  public clientName: string;

  @ResponseDtoStringProperty()
  public organizationName: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = AnalysisItemResponseDto.name;
}
