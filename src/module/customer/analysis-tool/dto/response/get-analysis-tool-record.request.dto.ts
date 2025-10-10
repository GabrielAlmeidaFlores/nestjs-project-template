import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAnalysisToolRecordResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetAnalysisToolRecordResponsibleResponseDto.name;
}

@ResponseDto()
export class GetAnalysisToolRecordResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolRecordId)
  public readonly id: AnalysisToolRecordId;

  @ResponseDtoValueObjectProperty(AnalysisToolRecordCode)
  public readonly code: AnalysisToolRecordCode;

  @ResponseDtoEnumProperty(AnalysisToolRecordTypeEnum)
  public readonly type: AnalysisToolRecordTypeEnum;

  @ResponseDtoEnumProperty(Guid)
  public readonly analysisId: Guid;

  @ResponseDtoObjectProperty(() => GetAnalysisToolRecordResponsibleResponseDto)
  public readonly createdBy: GetAnalysisToolRecordResponsibleResponseDto;

  @ResponseDtoObjectProperty(() => GetAnalysisToolRecordResponsibleResponseDto)
  public readonly updatedBy: GetAnalysisToolRecordResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public readonly createdAt: Date;

  @ResponseDtoDateProperty()
  public readonly updatedAt: Date;

  protected override readonly _type = GetAnalysisToolRecordResponseDto.name;
}
