import { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DeathBenefitRejectionTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DeathBenefitRejectionTimeAcceleratorTypeEnum)
  public type: DeathBenefitRejectionTimeAcceleratorTypeEnum;

  @RequestDtoEnumProperty(
    DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;

  @RequestDtoEnumProperty(
    DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;

  @RequestDtoEnumProperty(DeathBenefitRejectionTimeAcceleratorViabilityEnum)
  public viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;

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
    DeathBenefitRejectionTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class UpdateDeathBenefitRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitRejectionTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: DeathBenefitRejectionTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitRejectionTimeAcceleratorRequestDto.name;
}
