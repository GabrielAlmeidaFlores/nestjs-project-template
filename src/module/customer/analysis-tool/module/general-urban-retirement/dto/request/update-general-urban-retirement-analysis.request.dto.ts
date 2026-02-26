import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly careerStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly publicServiceStartDate: Date;

  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisFederativeEntityEnum, {
    required: false,
  })
  public readonly federativeEntity?: GeneralUrbanRetirementAnalysisFederativeEntityEnum;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public readonly state?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly municipality?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly name?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly generalUrbanRetirementBenefitAnalysis?: string;

  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisBenefitTypeEnum, {
    required: false,
  })
  public readonly benefitType?: GeneralUrbanRetirementAnalysisBenefitTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly legalProceedingNumber?: string;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisJsonRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public readonly certificateContributionPeriodFiles?: FileModel[];

  @RequestDtoObjectProperty(
    () => UpdateGeneralUrbanRetirementAnalysisJsonRequestDto,
  )
  public readonly json: UpdateGeneralUrbanRetirementAnalysisJsonRequestDto;

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisRequestDto.name;
}
