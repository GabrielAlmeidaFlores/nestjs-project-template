import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DisabilityRetirementPlanningResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/query/disability-retirement-planning-result.query.repository.gateway';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningResultTypeormEntity>
  implements DisabilityRetirementPlanningResultQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningResultTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningResultTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneIdByDisabilityRetirementPlanningId(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<DisabilityRetirementPlanningResultId | null> {
    const result = await this.repository.findOne({
      select: { id: true },
      where: {
        disabilityRetirementPlanning: {
          id: disabilityRetirementPlanningId.toString(),
        },
      },
    });

    if (!result) {
      return null;
    }

    return new DisabilityRetirementPlanningResultId(result.id);
  }
}
