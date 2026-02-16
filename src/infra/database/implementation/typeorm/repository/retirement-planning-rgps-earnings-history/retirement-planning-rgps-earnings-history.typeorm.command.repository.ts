import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/command/retirement-planning-rgps-earnings-history.command.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';

@Injectable()
export class RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsEarningsHistoryTypeormEntity>
  implements RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsEarningsHistoryTypeormEntity)
    repository: Repository<RetirementPlanningRgpsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPlanningRgpsEarningsHistory(
    props: RetirementPlanningRgpsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsEarningsHistoryEntity,
      RetirementPlanningRgpsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRgpsEarningsHistory(
    id: RetirementPlanningRgpsEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
