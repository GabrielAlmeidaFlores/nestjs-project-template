import { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DeathBenefitGrantDocumentTypeEnum)
  public type: DeathBenefitGrantDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitGrantInstitutorDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty({ required: false })
  public wasRetired?: boolean;

  @RequestDtoStringProperty({ required: false })
  public retirementBenefitNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public isDeathDeclarantChildOrSpouse?: boolean;

  @RequestDtoStringProperty({ required: false })
  public deathDeclarantRelationshipDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToProveWorkPeriodNotInCnis?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public wasRuralInsured?: boolean;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public ruralPeriodDocumentDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public wasUnemployedAtDeath?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToProveDisabilityBeforeDeath?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToProveUnemploymentByWitness?: boolean;

  @RequestDtoObjectProperty(
    () => UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitGrantInstitutorDataRequestDto.name;
}
