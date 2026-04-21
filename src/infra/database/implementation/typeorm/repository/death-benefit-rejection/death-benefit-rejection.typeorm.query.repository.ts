import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { GetDeathBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/result/get-death-benefit-rejection-with-relations.query.result';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';

@Injectable()
export class DeathBenefitRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitRejectionTypeormEntity>
  implements DeathBenefitRejectionQueryRepositoryGateway
{
  protected readonly _type = DeathBenefitRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionTypeormEntity)
    repository: Repository<DeathBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitRejectionIdOrFailWithRelations(
    id: DeathBenefitRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          deathBenefitRejectionResult: true,
          deathBenefitRejectionInssBenefit: true,
          deathBenefitRejectionLegalProceeding: true,
          deathBenefitRejectionLegalRepresentative: true,
          deathBenefitRejectionBenefitInstitutor: {
            deathBenefitRejectionDocument: true,
          },
          deathBenefitRejectionDependent: {
            deathBenefitRejectionDependentDocument: true,
          },
          deathBenefitRejectionPeriod: {
            deathBenefitRejectionPeriodDocument: true,
            deathBenefitRejectionPeriodEarningsHistory: true,
          },
          deathBenefitRejectionTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DeathBenefitRejectionTypeormEntity,
      GetDeathBenefitRejectionWithRelationsQueryResult,
    );
  }
}
