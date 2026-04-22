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
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateBpcElderlyAnalysisFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcElderlyAnalysisFamilyMemberDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcElderlyAnalysisFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class CreateBpcElderlyAnalysisFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
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
    () => CreateBpcElderlyAnalysisFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateBpcElderlyAnalysisFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    CreateBpcElderlyAnalysisFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class CreateBpcElderlyAnalysisFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcElderlyAnalysisFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: CreateBpcElderlyAnalysisFamilyMemberItemRequestDto[];

  protected override readonly _type =
    CreateBpcElderlyAnalysisFamilyMemberRequestDto.name;
}
