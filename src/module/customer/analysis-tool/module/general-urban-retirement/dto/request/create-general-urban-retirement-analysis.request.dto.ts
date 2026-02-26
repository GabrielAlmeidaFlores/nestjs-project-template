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
export class CreateGeneralUrbanRetirementAnalysisJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public careerStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public publicServiceStartDate: Date;

  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false, isArray: false })
  public legalProceedingNumber?: string;

  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisFederativeEntityEnum, {
    required: false,
  })
  public federativeEntity?: GeneralUrbanRetirementAnalysisFederativeEntityEnum;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public state?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public municipality?: string;

  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public generalUrbanRetirementBenefitAnalysis?: string;

  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisBenefitTypeEnum, {
    required: true,
  })
  public benefitType: GeneralUrbanRetirementAnalysisBenefitTypeEnum;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisJsonRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public certificateContributionPeriodFiles?: FileModel[];

  @RequestDtoObjectProperty(
    () => CreateGeneralUrbanRetirementAnalysisJsonRequestDto,
  )
  public json: CreateGeneralUrbanRetirementAnalysisJsonRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisRequestDto.name;
}
