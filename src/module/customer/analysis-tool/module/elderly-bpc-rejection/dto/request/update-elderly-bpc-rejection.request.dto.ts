import { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateElderlyBpcRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoEnumProperty(ElderlyBpcRejectionCategoryEnum, { required: false })
  public category?: ElderlyBpcRejectionCategoryEnum;

  @RequestDtoEnumProperty(ElderlyBpcRejectionMaritalStatusEnum, {
    required: false,
  })
  public maritalStatus?: ElderlyBpcRejectionMaritalStatusEnum;

  @RequestDtoBooleanProperty({ required: false })
  public applicantLivesAlone?: boolean;

  protected override readonly _type = UpdateElderlyBpcRejectionRequestDto.name;
}
