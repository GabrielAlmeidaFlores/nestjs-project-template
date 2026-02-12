import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import { CreateRuralTimelineAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-document.request.dto';
import { CreateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-economic-aspects.request.dto';
import { CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-family-group-member.request.dto';
import { CreateRuralTimelineAnalysisPeriodPropertyRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-property.request.dto';
import { CreateRuralTimelineAnalysisPeriodResidenceRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-residence.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRuralTimelineAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodWorkerTypeEnum, {
    required: false,
  })
  public workerType?: RuralTimelineAnalysisPeriodWorkerTypeEnum;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodWorkRegimeTypeEnum, {
    required: false,
  })
  public workRegimeType?: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum;

  @RequestDtoEnumProperty(ProductionDestinationEnum, { required: false })
  public productionDestination?: ProductionDestinationEnum;

  @RequestDtoObjectProperty(
    () => CreateRuralTimelineAnalysisPeriodResidenceRequestDto,
    { required: false },
  )
  public residence?: CreateRuralTimelineAnalysisPeriodResidenceRequestDto;

  @RequestDtoObjectProperty(
    () => CreateRuralTimelineAnalysisPeriodPropertyRequestDto,
    { required: false },
  )
  public property?: CreateRuralTimelineAnalysisPeriodPropertyRequestDto;

  @RequestDtoObjectProperty(
    () => CreateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto,
    { isArray: true, required: false },
  )
  public economicAspects?: CreateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateRuralTimelineAnalysisPeriodDocumentRequestDto,
    { isArray: true, required: false },
  )
  public documents?: CreateRuralTimelineAnalysisPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto,
    { isArray: true, required: false },
  )
  public familyGroupMembers?: CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto[];

  protected override readonly _type =
    CreateRuralTimelineAnalysisPeriodRequestDto.name;
}
