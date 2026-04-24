import { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';
import { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';
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
export class CreateBpcDisabilityDenialFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(BpcDisabilityDenialFamilyMemberDocumentTypeEnum, {
    required: true,
  })
  public readonly type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateBpcDisabilityDenialFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityDenialFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(BpcDisabilityDenialFamilyMemberKinshipEnum, {
    required: true,
  })
  public readonly kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(BpcDisabilityDenialFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public readonly incomeType?: BpcDisabilityDenialFamilyMemberIncomeTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasExpenseProofs?: boolean;

  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityDenialFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateBpcDisabilityDenialFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityDenialFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class CreateBpcDisabilityDenialFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateBpcDisabilityDenialFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: CreateBpcDisabilityDenialFamilyMemberItemRequestDto[];

  protected override readonly _type =
    CreateBpcDisabilityDenialFamilyMemberRequestDto.name;
}
