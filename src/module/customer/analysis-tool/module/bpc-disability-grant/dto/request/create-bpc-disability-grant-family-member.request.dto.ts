import { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';
import { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';
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
export class CreateBpcDisabilityGrantFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcDisabilityGrantFamilyMemberDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcDisabilityGrantFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityGrantFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(BpcDisabilityGrantFamilyMemberKinshipEnum, {
    required: true,
  })
  public readonly kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(BpcDisabilityGrantFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public readonly incomeType?: BpcDisabilityGrantFamilyMemberIncomeTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasExpenseProofs?: boolean;

  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityGrantFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateBpcDisabilityGrantFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityGrantFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityGrantFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityGrantFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: CreateBpcDisabilityGrantFamilyMemberItemRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityGrantFamilyMemberRequestDto.name;
}
