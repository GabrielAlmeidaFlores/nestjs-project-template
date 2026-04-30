import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period/command/rural-or-hybrid-retirement-analysis-period.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.entity';
import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisPeriodTypeormEntity>
  implements RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisPeriodTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisPeriod(
    props: RuralOrHybridRetirementAnalysisPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisPeriod(
    id: RuralOrHybridRetirementAnalysisPeriodId,
    props: RuralOrHybridRetirementAnalysisPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisPeriod(
    id: RuralOrHybridRetirementAnalysisPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisPeriodEntity,
  ): RuralOrHybridRetirementAnalysisPeriodTypeormEntity {
    return RuralOrHybridRetirementAnalysisPeriodTypeormEntity.build({
      id: props.id.toString(),
      startDate: props.startDate,
      endDate: props.endDate,
      workerType: props.workerType,
      workSchedule: props.workSchedule,
      propertyName: props.propertyName,
      propertyCategory: props.propertyCategory,
      propertyOwner: props.propertyOwner,
      propertyCep: props.propertyCep,
      propertyState: props.propertyState,
      propertyCity: props.propertyCity,
      propertyNeighbourhood: props.propertyNeighbourhood,
      propertyStreet: props.propertyStreet,
      propertyNumber: props.propertyNumber,
      productionDestination: props.productionDestination,
      employee: props.employee,
      employeeAmount: props.employeeAmount,
      agriculturalMachinery: props.agriculturalMachinery,
      agriculturalMachineryDescription: props.agriculturalMachineryDescription,
      farmVehicles: props.farmVehicles,
      farmVehiclesDescription: props.farmVehiclesDescription,
      incomeBesidesRuralProduction: props.incomeBesidesRuralProduction,
      incomeBesidesRuralProductionDescription:
        props.incomeBesidesRuralProductionDescription,
      clientHasOrHadCnpj: props.clientHasOrHadCnpj,
      clientHasOrHadCnpjDescription: props.clientHasOrHadCnpjDescription,
      clientLivesInUrbanArea: props.clientLivesInUrbanArea,
      clientMunicipality: props.clientMunicipality,
      clientState: props.clientState,
      distance: props.distance,
      ruralOrHybridRetirementAnalysis:
        RuralOrHybridRetirementAnalysisTypeormEntity.build({
          id: props.ruralOrHybridRetirementAnalysisId.toString(),
        } as RuralOrHybridRetirementAnalysisTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisPeriodTypeormEntity);
  }
}
