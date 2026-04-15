import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';

import type { RuralOrHybridRetirementRejectionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity.props.interface';
import type { RuralOrHybridRetirementRejectionProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-production-destination.enum';
import type { RuralOrHybridRetirementRejectionWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-worker-type.enum';
import type { RuralOrHybridRetirementRejectionWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-work-schedule.enum';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export class RuralOrHybridRetirementRejectionPeriodEntity extends BaseEntity<RuralOrHybridRetirementRejectionPeriodId> {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly workerType: RuralOrHybridRetirementRejectionWorkerTypeEnum | null;
  public readonly workSchedule: RuralOrHybridRetirementRejectionWorkScheduleEnum | null;
  public readonly propertyName: string | null;
  public readonly propertyCategory: string | null;
  public readonly propertyOwner: string | null;
  public readonly propertyCep: string | null;
  public readonly propertyState: StateCodeEnum | null;
  public readonly propertyCity: string | null;
  public readonly propertyNeighbourhood: string | null;
  public readonly propertyStreet: string | null;
  public readonly propertyNumber: string | null;
  public readonly productionDestination: RuralOrHybridRetirementRejectionProductionDestinationEnum | null;
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
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type = RuralOrHybridRetirementRejectionPeriodEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionPeriodEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionPeriodId, props);
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
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
