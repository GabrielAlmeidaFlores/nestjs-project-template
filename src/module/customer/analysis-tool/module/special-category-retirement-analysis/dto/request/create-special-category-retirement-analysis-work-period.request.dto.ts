import { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(SpecialCategoryRetirementAnalysisId)
  public specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;

  @RequestDtoDateProperty({ required: false })
  public publicServiceAdmissionDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public publicServiceCareerStartDate?: Date;

  @RequestDtoDateProperty()
  public workPeriodStartDate: Date;

  @RequestDtoDateProperty()
  public workPeriodEndDate: Date;

  @RequestDtoStringProperty({ required: false })
  public jobPositionTitle?: string;

  @RequestDtoStringProperty({ required: false })
  public careerPathName?: string;

  @RequestDtoEnumProperty(PublicServiceTypeCategoryEnum, { required: false })
  public publicServiceTypeCategory?: PublicServiceTypeCategoryEnum;

  @RequestDtoEnumProperty(SpecialTimeRegistrationTypeEnum)
  public specialTimeRegistrationType: SpecialTimeRegistrationTypeEnum;

  @RequestDtoDateProperty({ required: false })
  public effectiveSpecialWorkStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public effectiveSpecialWorkEndDate?: Date;

  protected override readonly _type =
    CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto.name;
}
