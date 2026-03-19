import {
  CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto,
  CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
  CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto extends CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto {
  @RequestDtoStringProperty({ required: false })
  public readonly lawyerObservations?: string;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto extends CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto {
  @RequestDtoStringProperty({ required: false })
  public readonly lawyerObservations?: string;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto extends CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () => UpdateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto,
    { required: false },
  )
  public override readonly specialTime?: UpdateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto;

  @RequestDtoObjectProperty(
    () => UpdateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto,
    { required: false },
  )
  public override readonly disability?: UpdateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
    { required: true, isArray: true },
  )
  public readonly periods: UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto.name;
}
