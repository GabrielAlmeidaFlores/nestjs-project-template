import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryDisabilityBenefitsGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period/query/result/get-temporary-disability-benefits-grant-period.query.result';
import { TemporaryDisabilityBenefitsGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period/query/temporary-disability-benefits-grant-period.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsGrantPeriodTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantPeriodQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantPeriodTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsGrantPeriodIdOrFail(
    id: TemporaryDisabilityBenefitsGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantPeriodQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
      GetTemporaryDisabilityBenefitsGrantPeriodQueryResult,
    );
  }
}
