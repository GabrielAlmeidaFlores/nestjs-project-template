import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/maternity-pay-grant-period.query.repository.gateway';
import { GetMaternityPayGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/result/get-maternity-pay-grant-period.query.result';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class MaternityPayGrantPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<MaternityPayGrantPeriodTypeormEntity>
  implements MaternityPayGrantPeriodQueryRepositoryGateway
{
  protected readonly _type = MaternityPayGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantPeriodTypeormEntity)
    repository: Repository<MaternityPayGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByMaternityPayGrantPeriodIdOrFail(
    id: MaternityPayGrantPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetMaternityPayGrantPeriodQueryResult> {
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
      MaternityPayGrantPeriodTypeormEntity,
      GetMaternityPayGrantPeriodQueryResult,
    );
  }
}
