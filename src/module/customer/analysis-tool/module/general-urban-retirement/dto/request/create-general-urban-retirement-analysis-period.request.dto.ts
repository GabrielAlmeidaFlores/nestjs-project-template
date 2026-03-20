import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

/** Documentos do tempo especial: cada tipo é um array de arquivos */
@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly ppp?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly ctps?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly ltcat?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly judicial?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly outros?: Base64FileRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeDocumentsRequestDto.name;
}

/** Tempo especial: todo o período ou parte dele */
@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum,
    { required: true },
  )
  public readonly type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;

  @RequestDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoObjectProperty(
    () =>
      CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeDocumentsRequestDto,
    { required: false },
  )
  public readonly documents?: CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeDocumentsRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto.name;
}

/** Documentos PCD: cada tipo é um array de arquivos (médicos obrigatórios, outros opcionais) */
@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodDisabilityDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly medico?: Base64FileRequestDto[];

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public readonly outrosMedicos?: Base64FileRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodDisabilityDocumentsRequestDto.name;
}

/** Período PCD: todo o período ou parte dele como pessoa com deficiência */
@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum,
    { required: true },
  )
  public readonly type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;

  @RequestDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum,
    { required: true },
  )
  public readonly degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;

  @RequestDtoEnumProperty(
    GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum,
    { required: true },
  )
  public readonly category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;

  @RequestDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoStringProperty({ required: true })
  public readonly description: string;

  @RequestDtoStringProperty({ required: true })
  public readonly dailyImpact: string;

  @RequestDtoValueObjectProperty(CidTenId, { required: true })
  public readonly cidTenId: CidTenId;

  @RequestDtoObjectProperty(
    () =>
      CreateGeneralUrbanRetirementAnalysisPeriodDisabilityDocumentsRequestDto,
    { required: false },
  )
  public readonly documents?: CreateGeneralUrbanRetirementAnalysisPeriodDisabilityDocumentsRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoStringProperty({ required: true })
  public readonly jobPosition: string;

  @RequestDtoStringProperty({ required: true })
  public readonly career: string;

  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum, {
    required: true,
  })
  public readonly serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly department: string;

  @RequestDtoObjectProperty(
    () => CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto,
    { required: false },
  )
  public readonly specialTime?: CreateGeneralUrbanRetirementAnalysisPeriodSpecialTimeRequestDto;

  @RequestDtoObjectProperty(
    () => CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto,
    { required: false },
  )
  public readonly disability?: CreateGeneralUrbanRetirementAnalysisPeriodDisabilityRequestDto;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateGeneralUrbanRetirementAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
    { required: true, isArray: true },
  )
  public readonly periods: CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto[];

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisPeriodRequestDto.name;
}
