import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

@Injectable()
export class RetirementPlanningRppsResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsResultTypeormEntity>
  implements RetirementPlanningRppsResultCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsResultTypeormEntity)
    repository: Repository<RetirementPlanningRppsResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsResult(
    id: RetirementPlanningRppsResultId,
    props: RetirementPlanningRppsResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsResultEntity,
      RetirementPlanningRppsResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsResult(
    props: RetirementPlanningRppsResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsResultEntity,
      RetirementPlanningRppsResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
