import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';

@Injectable()
export class RetirementPlanningRgpsResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsResultTypeormEntity>
  implements RetirementPlanningRgpsResultCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsResultTypeormEntity)
    repository: Repository<RetirementPlanningRgpsResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgpsResult(
    id: RetirementPlanningRgpsResultId,
    props: RetirementPlanningRgpsResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsResultEntity,
      RetirementPlanningRgpsResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgpsResult(
    props: RetirementPlanningRgpsResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsResultEntity,
      RetirementPlanningRgpsResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
