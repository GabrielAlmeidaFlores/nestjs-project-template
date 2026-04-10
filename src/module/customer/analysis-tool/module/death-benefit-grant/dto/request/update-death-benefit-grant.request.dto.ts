import { CreateDeathBenefitGrantDocumentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitGrantRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(() => CreateDeathBenefitGrantDocumentRequestDto, {
    required: false,
    isArray: true,
  })
  public documents?: CreateDeathBenefitGrantDocumentRequestDto[];

  protected override readonly _type = UpdateDeathBenefitGrantRequestDto.name;
}
