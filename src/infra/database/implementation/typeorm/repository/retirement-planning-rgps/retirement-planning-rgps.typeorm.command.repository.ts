import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

@Injectable()
export class RetirementPlanningRgpsTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsTypeormEntity>
  implements RetirementPlanningRgpsCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsTypeormEntity)
    repository: Repository<RetirementPlanningRgpsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgps(
    id: RetirementPlanningRgpsId,
    props: RetirementPlanningRgpsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsEntity,
      RetirementPlanningRgpsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgps(
    props: RetirementPlanningRgpsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsEntity,
      RetirementPlanningRgpsTypeormEntity,
    );

    return this.create(mappedData);
  }
}
