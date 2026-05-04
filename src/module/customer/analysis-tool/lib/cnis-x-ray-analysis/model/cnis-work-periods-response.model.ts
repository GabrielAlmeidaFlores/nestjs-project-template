import { CnisWorkPeriodModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-period.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CnisWorkPeriodsResponseModel extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => CnisWorkPeriodModel, { isArray: true })
  public workPeriods: CnisWorkPeriodModel[];

  protected override readonly _type = CnisWorkPeriodsResponseModel.name;
}
