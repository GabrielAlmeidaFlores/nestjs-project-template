import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRppsRemunerationCalculationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/result/get-retirement-planning-rpps-remuneration-calculation.query.result';
import { RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/retirement-planning-rpps-remuneration-calculation.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationCalculationTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRppsRemunerationCalculationTypeormEntity>
  implements RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsRemunerationCalculationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    )
    repository: Repository<RetirementPlanningRppsRemunerationCalculationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRppsId(
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationCalculationQueryResult | null> {
    const data = await this.findOne({
      where: {
        retirementPlanningRpps: {
          id: retirementPlanningRppsId.toString(),
        },
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
      GetRetirementPlanningRppsRemunerationCalculationQueryResult,
    );

    return mappedData;
  }
}
