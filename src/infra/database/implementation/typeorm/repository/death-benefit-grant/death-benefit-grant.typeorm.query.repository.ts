import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { GetDeathBenefitGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/result/get-death-benefit-grant-with-relations.query.result';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';

@Injectable()
export class DeathBenefitGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitGrantTypeormEntity>
  implements DeathBenefitGrantQueryRepositoryGateway
{
  protected readonly _type = DeathBenefitGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantTypeormEntity)
    repository: Repository<DeathBenefitGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitGrantIdOrFailWithRelations(
    id: DeathBenefitGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          deathBenefitGrantResult: true,
          deathBenefitGrantInssBenefit: true,
          deathBenefitGrantLegalProceeding: true,
          deathBenefitGrantLegalRepresentative: true,
          deathBenefitGrantBenefitInstitutor: {
            deathBenefitGrantDocument: true,
          },
          deathBenefitGrantDependent: {
            deathBenefitGrantDependentDocument: true,
          },
          deathBenefitGrantPeriod: {
            deathBenefitGrantPeriodDocument: true,
            deathBenefitGrantPeriodEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DeathBenefitGrantTypeormEntity,
      GetDeathBenefitGrantWithRelationsQueryResult,
    );
  }
}
