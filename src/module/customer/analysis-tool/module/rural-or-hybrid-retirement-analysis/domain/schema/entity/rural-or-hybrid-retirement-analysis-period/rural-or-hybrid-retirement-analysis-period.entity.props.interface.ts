import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-production-destination.enum';
import type { RuralOrHybridRetirementAnalysisWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-work-schedule.enum';
import type { RuralOrHybridRetirementAnalysisWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-worker-type.enum';
import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';

export interface RuralOrHybridRetirementAnalysisPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisPeriodId> {
  startDate?: Date | null;
  endDate?: Date | null;
  workerType?: RuralOrHybridRetirementAnalysisWorkerTypeEnum | null;
  workSchedule?: RuralOrHybridRetirementAnalysisWorkScheduleEnum | null;
  propertyName?: string | null;
  propertyCategory?: string | null;
  propertyOwner?: string | null;
  propertyCep?: string | null;
  propertyState?: StateCodeEnum | null;
  propertyCity?: string | null;
  propertyNeighbourhood?: string | null;
  propertyStreet?: string | null;
  propertyNumber?: string | null;
  productionDestination?: RuralOrHybridRetirementAnalysisProductionDestinationEnum | null;
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
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
