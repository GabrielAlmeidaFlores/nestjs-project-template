import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { RuralOrHybridRetirementAnalysisProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-production-destination.enum';
import { RuralOrHybridRetirementAnalysisWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-work-schedule.enum';
import { RuralOrHybridRetirementAnalysisWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-worker-type.enum';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/enum/rural-or-hybrid-retirement-analysis-period-document-type.enum';
import { RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period-member.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class RuralOrHybridRetirementAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum)
  public type: RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodDocumentRequestDto.name;
}

@RequestDto()
export class RuralOrHybridRetirementAnalysisPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisWorkerTypeEnum, {
    required: false,
  })
  public workerType?: RuralOrHybridRetirementAnalysisWorkerTypeEnum;

  @RequestDtoEnumProperty(RuralOrHybridRetirementAnalysisWorkScheduleEnum, {
    required: false,
  })
  public workSchedule?: RuralOrHybridRetirementAnalysisWorkScheduleEnum;

  @RequestDtoStringProperty({ required: false })
  public propertyName?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyCategory?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyOwner?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyCep?: string;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public propertyState?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public propertyCity?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyNeighbourhood?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyStreet?: string;

  @RequestDtoStringProperty({ required: false })
  public propertyNumber?: string;

  @RequestDtoEnumProperty(
    RuralOrHybridRetirementAnalysisProductionDestinationEnum,
    { required: false },
  )
  public productionDestination?: RuralOrHybridRetirementAnalysisProductionDestinationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public employee?: boolean;

  @RequestDtoNumberProperty({ required: false })
  public employeeAmount?: number;

  @RequestDtoBooleanProperty({ required: false })
  public agriculturalMachinery?: boolean;

  @RequestDtoStringProperty({ required: false })
  public agriculturalMachineryDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public farmVehicles?: boolean;

  @RequestDtoStringProperty({ required: false })
  public farmVehiclesDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public incomeBesidesRuralProduction?: boolean;

  @RequestDtoStringProperty({ required: false })
  public incomeBesidesRuralProductionDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public clientHasOrHadCnpj?: boolean;

  @RequestDtoStringProperty({ required: false })
  public clientHasOrHadCnpjDescription?: string;

  @RequestDtoBooleanProperty({ required: false })
  public clientLivesInUrbanArea?: boolean;

  @RequestDtoStringProperty({ required: false })
  public clientMunicipality?: string;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public clientState?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public distance?: string;

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: RuralOrHybridRetirementAnalysisPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto,
    { required: false, isArray: true },
  )
  public members?: RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto[];

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateRuralOrHybridRetirementAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => RuralOrHybridRetirementAnalysisPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: RuralOrHybridRetirementAnalysisPeriodItemRequestDto[];

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisPeriodRequestDto.name;
}
