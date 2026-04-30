import { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';
import { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';
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
export class UpdateBpcElderlyCessationFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcElderlyCessationFamilyMemberDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    UpdateBpcElderlyCessationFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class UpdateBpcElderlyCessationFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(BpcElderlyCessationFamilyMemberKinshipEnum, {
    required: true,
  })
  public readonly kinship: BpcElderlyCessationFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(BpcElderlyCessationFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public readonly incomeType?: BpcElderlyCessationFamilyMemberIncomeTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasExpenseProofs?: boolean;

  @RequestDtoObjectProperty(
    () => UpdateBpcElderlyCessationFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: UpdateBpcElderlyCessationFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    UpdateBpcElderlyCessationFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class UpdateBpcElderlyCessationFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateBpcElderlyCessationFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: UpdateBpcElderlyCessationFamilyMemberItemRequestDto[];

  protected override readonly _type =
    UpdateBpcElderlyCessationFamilyMemberRequestDto.name;
}
