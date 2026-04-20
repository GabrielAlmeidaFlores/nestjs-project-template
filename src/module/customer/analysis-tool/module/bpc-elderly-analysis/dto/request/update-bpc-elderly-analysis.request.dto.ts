import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import { BpcElderlyAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-income-type.enum';
import { BpcElderlyAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-kinship.enum';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateBpcElderlyAnalysisFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcElderlyAnalysisFamilyMemberDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    UpdateBpcElderlyAnalysisFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class UpdateBpcElderlyAnalysisFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(BpcElderlyAnalysisFamilyMemberKinshipEnum, {
    required: true,
  })
  public readonly kinship: BpcElderlyAnalysisFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(BpcElderlyAnalysisFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public readonly incomeType?: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum;

  @RequestDtoObjectProperty(
    () => UpdateBpcElderlyAnalysisFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: UpdateBpcElderlyAnalysisFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    UpdateBpcElderlyAnalysisFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class UpdateBpcElderlyAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public readonly analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoEnumProperty(BpcElderlyAnalysisCategoryEnum, { required: false })
  public readonly category?: BpcElderlyAnalysisCategoryEnum;

  @RequestDtoObjectProperty(
    () => UpdateBpcElderlyAnalysisFamilyMemberItemRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly familyMembers?: UpdateBpcElderlyAnalysisFamilyMemberItemRequestDto[];

  protected override readonly _type = UpdateBpcElderlyAnalysisRequestDto.name;
}
