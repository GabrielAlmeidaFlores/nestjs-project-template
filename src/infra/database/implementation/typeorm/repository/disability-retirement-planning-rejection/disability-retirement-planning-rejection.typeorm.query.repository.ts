import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/result/get-disability-retirement-planning-rejection-with-relations.query.result';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningRejectionTypeormEntity>
  implements DisabilityRetirementPlanningRejectionQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRejectionTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
    id: DisabilityRetirementPlanningRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          disabilityRetirementPlanningRejectionResult: true,
          disabilityRetirementPlanningRejectionDocument: true,
          disabilityRetirementPlanningRejectionPeriod: {
            disabilityRetirementPlanningRejectionPeriodDocument: true,
            disabilityRetirementPlanningRejectionPeriodEarningsHistory: true,
          },
          disabilityRetirementPlanningRejectionTimeAccelerator: true,
          disabilityRetirementPlanningRejectionInssBenefit: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DisabilityRetirementPlanningRejectionTypeormEntity,
      GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult,
    );
  }
}
