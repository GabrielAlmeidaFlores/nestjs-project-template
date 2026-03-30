import { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/enum/disability-retirement-planning-grant-disability-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DisabilityRetirementPlanningGrantDisabilityPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DisabilityRetirementPlanningGrantDisabilityDegreeEnum)
  public disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityCategoryEnum,
  )
  public disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;

  @RequestDtoStringProperty()
  public disabilityDescription: string;

  @RequestDtoStringProperty()
  public dailyImpact: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public cidTenId?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodItemRequestDto.name;
}

@RequestDto()
export class FileDocumentDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum,
  )
  public type: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum;

  protected override readonly _type =
    FileDocumentDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto.name;
}

@RequestDto()
export class DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto extends DisabilityRetirementPlanningGrantDisabilityPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () =>
      FileDocumentDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
    { required: false, isArray: true },
  )
  public documents?: FileDocumentDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto[];

  protected override readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public disabilityPeriods: DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto.name;
}
