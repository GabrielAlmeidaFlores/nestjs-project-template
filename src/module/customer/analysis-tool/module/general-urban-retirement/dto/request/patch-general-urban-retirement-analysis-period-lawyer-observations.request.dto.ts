import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: true })
  public readonly periodId: string;

  @RequestDtoStringProperty({ required: false })
  public readonly specialTimeObservations?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly disabilityObservations?: string;

  protected override readonly _type =
    PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsItemRequestDto.name;
}

@RequestDto()
export class PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsItemRequestDto,
    { required: true, isArray: true },
  )
  public readonly periods: PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsItemRequestDto[];

  protected override readonly _type =
    PatchGeneralUrbanRetirementAnalysisPeriodLawyerObservationsRequestDto.name;
}
