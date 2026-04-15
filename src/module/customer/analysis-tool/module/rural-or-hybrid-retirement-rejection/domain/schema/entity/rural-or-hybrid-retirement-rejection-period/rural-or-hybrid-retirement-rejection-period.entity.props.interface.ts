import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-production-destination.enum';
import type { RuralOrHybridRetirementRejectionWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-work-schedule.enum';
import type { RuralOrHybridRetirementRejectionWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-worker-type.enum';
import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';

export interface RuralOrHybridRetirementRejectionPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionPeriodId> {
  startDate?: Date | null;
  endDate?: Date | null;
  workerType?: RuralOrHybridRetirementRejectionWorkerTypeEnum | null;
  workSchedule?: RuralOrHybridRetirementRejectionWorkScheduleEnum | null;
  propertyName?: string | null;
  propertyCategory?: string | null;
  propertyOwner?: string | null;
  propertyCep?: string | null;
  propertyState?: StateCodeEnum | null;
  propertyCity?: string | null;
  propertyNeighbourhood?: string | null;
  propertyStreet?: string | null;
  propertyNumber?: string | null;
  productionDestination?: RuralOrHybridRetirementRejectionProductionDestinationEnum | null;
  employee?: boolean | null;
  employeeAmount?: number | null;
  agriculturalMachinery?: boolean | null;
  agriculturalMachineryDescription?: string | null;
  farmVehicles?: boolean | null;
  farmVehiclesDescription?: string | null;
  incomeBesidesRuralProduction?: boolean | null;
  incomeBesidesRuralProductionDescription?: string | null;
  clientHasOrHadCnpj?: boolean | null;
  clientHasOrHadCnpjDescription?: string | null;
  clientLivesInUrbanArea?: boolean | null;
  clientMunicipality?: string | null;
  clientState?: StateCodeEnum | null;
  distance?: string | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
