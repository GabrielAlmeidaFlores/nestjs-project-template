import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period/command/rural-or-hybrid-retirement-rejection-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionPeriodTypeormEntity>
  implements RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionPeriodTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionPeriod(
    props: RuralOrHybridRetirementRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionPeriod(
    id: RuralOrHybridRetirementRejectionPeriodId,
    props: RuralOrHybridRetirementRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionPeriod(
    id: RuralOrHybridRetirementRejectionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionPeriodEntity,
  ): RuralOrHybridRetirementRejectionPeriodTypeormEntity {
    return RuralOrHybridRetirementRejectionPeriodTypeormEntity.build({
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
      ruralOrHybridRetirementRejection:
        RuralOrHybridRetirementRejectionTypeormEntity.build({
          id: props.ruralOrHybridRetirementRejectionId.toString(),
        } as RuralOrHybridRetirementRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionPeriodTypeormEntity);
  }
}
