import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { DisabilityRetirementPlanningCompleteAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning/model/generic/disability-retirement-planning-complete-analysis.model';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDisabilityRetirementPlanningResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningCompleteAnalysisModel,
    { required: false },
  )
  public disabilityRetirementPlanningCompleteAnalysis?: DisabilityRetirementPlanningCompleteAnalysisModel;

  @ResponseDtoStringProperty({ required: false })
  public disabilityRetirementPlanningSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public disabilityRetirementPlanningCompleteAnalysisDownload?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetDisabilityRetirementPlanningResultResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CidTenId)
  public id: CidTenId;

  @ResponseDtoStringProperty()
  public code: string;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningCidResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty({
    description: 'Nome original do arquivo',
  })
  public originalFileName: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty({
    description: 'Nome original do arquivo',
  })
  public originalFileName: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningPeriodDisabilityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(RetirementPlanningDisabilityTimeTypeEnum)
  public disabilityType: RetirementPlanningDisabilityTimeTypeEnum;

  @ResponseDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum)
  public disabilityDegree: RetirementPlanningDisabilityDegreeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
  )
  public disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty()
  public disabilityDescription: string;

  @ResponseDtoStringProperty()
  public activityImpact: string;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningCidResponseDto,
    {
      required: false,
    },
  )
  public cid?: GetDisabilityRetirementPlanningCidResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty()
  public jobPosition: string;

  @ResponseDtoStringProperty()
  public careerName: string;

  @ResponseDtoEnumProperty(RetirementPlanningPeriodServiceTypeEnum)
  public serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @ResponseDtoStringProperty()
  public department: string;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningPeriodDisabilityResponseDto,
    { required: false, isArray: true },
  )
  public disabilities?: GetDisabilityRetirementPlanningPeriodDisabilityResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto,
    { required: false, isArray: true },
  )
  public specialTimes?: GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(DisabilityRetirementPlanningDocumentTypeEnum, {
    required: false,
  })
  public type?: DisabilityRetirementPlanningDocumentTypeEnum;

  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty({
    description: 'Nome original do arquivo',
  })
  public originalFileName: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityRetirementPlanningId)
  public id: DisabilityRetirementPlanningId;

  @ResponseDtoStringProperty()
  public currentPosition: string;

  @ResponseDtoEnumProperty(FederativeEntityEnum)
  public federativeEntity: FederativeEntityEnum;

  @ResponseDtoEnumProperty(StateCodeEnum, { required: false })
  public state?: StateCodeEnum;

  @ResponseDtoStringProperty({ required: false })
  public municipality?: string;

  @ResponseDtoBooleanProperty()
  public longTimeDisability: boolean;

  @ResponseDtoDateProperty()
  public publicServiceStartDate: Date;

  @ResponseDtoDateProperty()
  public careerStartDate: Date;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoStringProperty({ required: false })
  public administrativeProcessAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoNumberProperty({ required: false })
  public totalRemunerations?: number;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningResultResponseDto,
    { required: false },
  )
  public disabilityRetirementPlanningResult?: GetDisabilityRetirementPlanningResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetDisabilityRetirementPlanningDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningPeriodResponseDto,
    { required: false, isArray: true },
  )
  public periods?: GetDisabilityRetirementPlanningPeriodResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningResponseDto.name;
}
