import { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import {
  CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto,
  CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated-disability-analysis.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public estimatedDisabilityStartDate: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public cidTenIds?: string[];

  @RequestDtoStringProperty({ required: false })
  public shortDisabilityDescription?: string;

  @RequestDtoBooleanProperty()
  public disabilityFromAccident: boolean;

  @RequestDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @RequestDtoBooleanProperty()
  public disabilityFromSevereDisease: boolean;

  @RequestDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum;

  @RequestDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @RequestDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @RequestDtoBooleanProperty()
  public needsConstantAssistanceFromAnotherPerson: boolean;

  @RequestDtoBooleanProperty()
  public previousDisabilityBenefit: boolean;

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto,
    { required: false, isArray: true },
  )
  public previousBenefits?: CreateTemporaryDisabilityBenefitsTerminatedPreviousBenefitItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto.name;
}
