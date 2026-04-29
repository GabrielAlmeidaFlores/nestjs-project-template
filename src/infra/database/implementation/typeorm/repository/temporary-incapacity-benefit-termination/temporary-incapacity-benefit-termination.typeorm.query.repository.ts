import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/result/get-temporary-incapacity-benefit-termination-with-relations.query.result';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitTerminationTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitTerminationTypeormEntity>
  implements TemporaryIncapacityBenefitTerminationQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitTerminationTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitTerminationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
    id: TemporaryIncapacityBenefitTerminationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          temporaryIncapacityBenefitTerminationResult: true,
          documents: true,
          insuredStatus: {
            documents: true,
          },
          disabilityAnalysis: {
            cids: true,
            documents: true,
          },
          workPeriods: {
            earningsHistory: true,
          },
          inssBenefits: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
      GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
    );
  }
}
