import { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(DeathBenefitRejectionTimeAcceleratorTypeEnum)
  public type: DeathBenefitRejectionTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(
    DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(DeathBenefitRejectionTimeAcceleratorViabilityEnum)
  public viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto.name;
}
