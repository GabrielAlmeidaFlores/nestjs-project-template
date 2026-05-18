import { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(DeathBenefitGrantTimeAcceleratorTypeEnum)
  public type: DeathBenefitGrantTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(DeathBenefitGrantTimeAcceleratorRecognitionInssEnum)
  public recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(DeathBenefitGrantTimeAcceleratorViabilityEnum)
  public viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;

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
    AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto.name;
}

@ResponseDto()
export class AnalyzeDeathBenefitGrantTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto,
    { isArray: true },
  )
  public timeAccelerators: AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto[];

  protected override readonly _type =
    AnalyzeDeathBenefitGrantTimeAcceleratorResponseDto.name;
}
