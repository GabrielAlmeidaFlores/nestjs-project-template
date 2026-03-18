import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum)
  public type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;

  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty({
    description: 'Nome original do arquivo',
  })
  public originalFileName: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CidTenId)
  public id: CidTenId;

  @ResponseDtoStringProperty()
  public code: string;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeId,
  )
  public id: GeneralUrbanRetirementAnalysisPeriodSpecialTimeId;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum,
  )
  public type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityId,
  )
  public id: GeneralUrbanRetirementAnalysisPeriodDisabilityId;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum,
  )
  public type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum,
  )
  public degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum,
  )
  public category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoStringProperty()
  public dailyImpact: string;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto,
  )
  public cid: GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementAnalysisPeriodId)
  public id: GeneralUrbanRetirementAnalysisPeriodId;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public jobPosition: string;

  @ResponseDtoStringProperty()
  public career: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum)
  public serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;

  @ResponseDtoStringProperty()
  public department: string;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto,
    { required: false },
  )
  public specialTimePeriod?: GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto,
    { required: false },
  )
  public disabilityPeriod?: GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodResponseDto.name;
}
