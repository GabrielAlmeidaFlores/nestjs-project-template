import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/result/get-temporary-incapacity-benefit-rejection-with-relations.query.result';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitRejectionTypeormEntity>
  implements TemporaryIncapacityBenefitRejectionQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitRejectionTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
    id: TemporaryIncapacityBenefitRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          temporaryIncapacityBenefitRejectionResult: true,
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
      TemporaryIncapacityBenefitRejectionTypeormEntity,
      GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
    );
  }
}
