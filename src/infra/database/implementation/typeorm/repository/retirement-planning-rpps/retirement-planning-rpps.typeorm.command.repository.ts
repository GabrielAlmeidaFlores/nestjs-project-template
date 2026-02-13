import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

@Injectable()
export class RetirementPlanningRppsTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsTypeormEntity>
  implements RetirementPlanningRppsCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsTypeormEntity)
    repository: Repository<RetirementPlanningRppsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRetirementPlanningRpps(
    id: RetirementPlanningRppsId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public updateRetirementPlanningRpps(
    id: RetirementPlanningRppsId,
    props: RetirementPlanningRppsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsEntity,
      RetirementPlanningRppsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRpps(
    props: RetirementPlanningRppsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsEntity,
      RetirementPlanningRppsTypeormEntity,
    );

    return this.create(mappedData);
  }
}
