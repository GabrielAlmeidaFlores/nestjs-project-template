import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { GetDisabilityRetirementPlanningGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/result/get-disability-retirement-planning-grant-with-relations.query.result';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningGrantTypeormEntity>
  implements DisabilityRetirementPlanningGrantQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
    id: DisabilityRetirementPlanningGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          disabilityRetirementPlanningGrantResult: true,
          disabilityRetirementPlanningGrantDocument: true,
          disabilityRetirementPlanningGrantInssBenefit: true,
          disabilityRetirementPlanningGrantLegalProceeding: true,
          disabilityRetirementPlanningGrantPeriod: {
            disabilityRetirementPlanningGrantPeriodDocument: true,
          },
          disabilityRetirementPlanningGrantDisabilityPeriod: {
            disabilityRetirementPlanningGrantDisabilityPeriodDocument: true,
          },
          disabilityRetirementPlanningGrantTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DisabilityRetirementPlanningGrantTypeormEntity,
      GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
    );
  }
}
