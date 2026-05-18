import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { GetDisabilityRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningTypeormEntity>
  implements DisabilityRetirementPlanningQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneDisabilityRetirementPlanningByIdWithRelations(
    id: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        disabilityRetirementPlanningResult: true,
        disabilityRetirementPlanningPeriod: {
          disabilityRetirementPlanningPeriodDisability: {
            cidTen: true,
            disabilityRetirementPlanningPeriodDisabilityDocument: true,
          },
          disabilityRetirementPlanningPeriodSpecialTime: {
            disabilityRetirementPlanningPeriodSpecialTimeDocument: true,
          },
        },
        disabilityRetirementPlanningDocument: true,
        disabilityRetirementPlanningInssBenefit: true,
        disabilityRetirementPlanningLegalProceeding: true,
        disabilityRetirementPlanningRemuneration: true,
      },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      DisabilityRetirementPlanningTypeormEntity,
      GetDisabilityRetirementPlanningWithRelationsQueryResult,
    );
  }
}
