import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/death-benefit.query.repository.gateway';
import { GetDeathBenefitWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/result/get-death-benefit-with-relations.query.result';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitTypeormEntity>
  implements DeathBenefitQueryRepositoryGateway
{
  protected readonly _type = DeathBenefitTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitTypeormEntity)
    repository: Repository<DeathBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitIdOrFailWithRelations(
    id: DeathBenefitId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          deathBenefitResult: true,
          deathBenefitDocument: true,
          deathBenefitInssBenefit: true,
          deathBenefitLegalProceeding: true,
          deathBenefitLegalRepresentative: true,
          deathBenefitBenefitInstitutor: true,
          deathBenefitDependent: {
            deathBenefitDependentDocument: true,
          },
          deathBenefitPeriod: {
            deathBenefitPeriodDocument: true,
            deathBenefitPeriodEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DeathBenefitTypeormEntity,
      GetDeathBenefitWithRelationsQueryResult,
    );
  }
}
