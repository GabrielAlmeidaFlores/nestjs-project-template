import { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DeathBenefitGrantTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DeathBenefitGrantTimeAcceleratorTypeEnum)
  public type: DeathBenefitGrantTimeAcceleratorTypeEnum;

  @RequestDtoEnumProperty(DeathBenefitGrantTimeAcceleratorRecognitionInssEnum)
  public recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;

  @RequestDtoEnumProperty(
    DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;

  @RequestDtoEnumProperty(DeathBenefitGrantTimeAcceleratorViabilityEnum)
  public viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public institution?: string;

  @RequestDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    DeathBenefitGrantTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitGrantTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitGrantTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: DeathBenefitGrantTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitGrantTimeAcceleratorRequestDto.name;
}
