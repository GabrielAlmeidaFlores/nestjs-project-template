import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-production-destination.enum';
import type { RuralOrHybridRetirementAnalysisWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-work-schedule.enum';
import type { RuralOrHybridRetirementAnalysisWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-worker-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.entity.props.interface';

export class RuralOrHybridRetirementAnalysisPeriodEntity extends BaseEntity<RuralOrHybridRetirementAnalysisPeriodId> {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly workerType: RuralOrHybridRetirementAnalysisWorkerTypeEnum | null;
  public readonly workSchedule: RuralOrHybridRetirementAnalysisWorkScheduleEnum | null;
  public readonly propertyName: string | null;
  public readonly propertyCategory: string | null;
  public readonly propertyOwner: string | null;
  public readonly propertyCep: string | null;
  public readonly propertyState: StateCodeEnum | null;
  public readonly propertyCity: string | null;
  public readonly propertyNeighbourhood: string | null;
  public readonly propertyStreet: string | null;
  public readonly propertyNumber: string | null;
  public readonly productionDestination: RuralOrHybridRetirementAnalysisProductionDestinationEnum | null;
  public readonly employee: boolean | null;
  public readonly employeeAmount: number | null;
  public readonly agriculturalMachinery: boolean | null;
  public readonly agriculturalMachineryDescription: string | null;
  public readonly farmVehicles: boolean | null;
  public readonly farmVehiclesDescription: string | null;
  public readonly incomeBesidesRuralProduction: boolean | null;
  public readonly incomeBesidesRuralProductionDescription: string | null;
  public readonly clientHasOrHadCnpj: boolean | null;
  public readonly clientHasOrHadCnpjDescription: string | null;
  public readonly clientLivesInUrbanArea: boolean | null;
  public readonly clientMunicipality: string | null;
  public readonly clientState: StateCodeEnum | null;
  public readonly distance: string | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type = RuralOrHybridRetirementAnalysisPeriodEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisPeriodEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisPeriodId, props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.workerType = props.workerType ?? null;
    this.workSchedule = props.workSchedule ?? null;
    this.propertyName = props.propertyName ?? null;
    this.propertyCategory = props.propertyCategory ?? null;
    this.propertyOwner = props.propertyOwner ?? null;
    this.propertyCep = props.propertyCep ?? null;
    this.propertyState = props.propertyState ?? null;
    this.propertyCity = props.propertyCity ?? null;
    this.propertyNeighbourhood = props.propertyNeighbourhood ?? null;
    this.propertyStreet = props.propertyStreet ?? null;
    this.propertyNumber = props.propertyNumber ?? null;
    this.productionDestination = props.productionDestination ?? null;
    this.employee = props.employee ?? null;
    this.employeeAmount = props.employeeAmount ?? null;
    this.agriculturalMachinery = props.agriculturalMachinery ?? null;
    this.agriculturalMachineryDescription =
      props.agriculturalMachineryDescription ?? null;
    this.farmVehicles = props.farmVehicles ?? null;
    this.farmVehiclesDescription = props.farmVehiclesDescription ?? null;
    this.incomeBesidesRuralProduction =
      props.incomeBesidesRuralProduction ?? null;
    this.incomeBesidesRuralProductionDescription =
      props.incomeBesidesRuralProductionDescription ?? null;
    this.clientHasOrHadCnpj = props.clientHasOrHadCnpj ?? null;
    this.clientHasOrHadCnpjDescription =
      props.clientHasOrHadCnpjDescription ?? null;
    this.clientLivesInUrbanArea = props.clientLivesInUrbanArea ?? null;
    this.clientMunicipality = props.clientMunicipality ?? null;
    this.clientState = props.clientState ?? null;
    this.distance = props.distance ?? null;
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
