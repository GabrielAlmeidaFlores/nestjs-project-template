import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/enum/death-benefit-rejection-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateDeathBenefitRejectionInstitorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public cpf?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @RequestDtoDateProperty({ required: false })
  public deathDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public wasRetired?: boolean;

  protected override readonly _type =
    CreateDeathBenefitRejectionInstitorRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitRejectionLegalRepresentativeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public cpf?: string;

  @RequestDtoDateProperty({ required: false })
  public birthDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public isMinorUnderGuardianship?: boolean;

  @RequestDtoStringProperty({ required: false })
  public legalRepresentativeRelationship?: string;

  protected override readonly _type =
    CreateDeathBenefitRejectionLegalRepresentativeRequestDto.name;
}

@RequestDto()
export class CreateDeathBenefitRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(DeathBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: DeathBenefitRejectionCategoryEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(() => CreateDeathBenefitRejectionInstitorRequestDto)
  public institutor: CreateDeathBenefitRejectionInstitorRequestDto;

  @RequestDtoObjectProperty(
    () => CreateDeathBenefitRejectionLegalRepresentativeRequestDto,
    { required: false },
  )
  public legalRepresentative?: CreateDeathBenefitRejectionLegalRepresentativeRequestDto;

  protected override readonly _type =
    CreateDeathBenefitRejectionRequestDto.name;
}
