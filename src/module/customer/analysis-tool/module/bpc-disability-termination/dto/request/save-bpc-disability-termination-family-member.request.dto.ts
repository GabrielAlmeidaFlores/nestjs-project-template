import { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';
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
export class SaveBpcDisabilityTerminationFamilyMemberDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    BpcDisabilityTerminationFamilyMemberDocumentTypeEnum,
    {
      required: true,
    },
  )
  public readonly type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    SaveBpcDisabilityTerminationFamilyMemberDocumentRequestDto.name;
}

@RequestDto()
export class SaveBpcDisabilityTerminationFamilyMemberItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly fullName: string;

  @RequestDtoDateProperty({ required: true })
  public readonly birthDate: Date;

  @RequestDtoEnumProperty(BpcDisabilityTerminationFamilyMemberKinshipEnum, {
    required: true,
  })
  public readonly kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;

  @RequestDtoBooleanProperty({ required: true })
  public readonly livesInSameResidence: boolean;

  @RequestDtoBooleanProperty({ required: true })
  public readonly hasIncome: boolean;

  @RequestDtoNumberProperty({ required: false })
  public readonly monthlyIncomeAmount?: number;

  @RequestDtoEnumProperty(BpcDisabilityTerminationFamilyMemberIncomeTypeEnum, {
    required: false,
  })
  public readonly incomeType?: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public readonly hasExpenseProofs?: boolean;

  @RequestDtoObjectProperty(
    () => SaveBpcDisabilityTerminationFamilyMemberDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: SaveBpcDisabilityTerminationFamilyMemberDocumentRequestDto[];

  protected override readonly _type =
    SaveBpcDisabilityTerminationFamilyMemberItemRequestDto.name;
}

@RequestDto()
export class SaveBpcDisabilityTerminationFamilyMemberRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SaveBpcDisabilityTerminationFamilyMemberItemRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly familyMembers: SaveBpcDisabilityTerminationFamilyMemberItemRequestDto[];

  protected override readonly _type =
    SaveBpcDisabilityTerminationFamilyMemberRequestDto.name;
}
