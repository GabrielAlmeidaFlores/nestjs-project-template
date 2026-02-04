import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';
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
export class CreatePerCapitaIncomeForBpcAnalysisFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum,
    {
      required: true,
    },
  )
  public readonly type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class CreatePerCapitaIncomeForBpcAnalysisFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(
    PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum,
    { required: true },
  )
  public readonly kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(
    PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum,
    { required: false },
  )
  public readonly incomeType?: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum;

  @RequestDtoObjectProperty(
    () => CreatePerCapitaIncomeForBpcAnalysisFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(PerCapitaIncomeForBpcAnalysisId)
  public readonly perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId;

  @RequestDtoObjectProperty(
    () => CreatePerCapitaIncomeForBpcAnalysisFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberItemRequestDto[];

  protected override readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto.name;
}
