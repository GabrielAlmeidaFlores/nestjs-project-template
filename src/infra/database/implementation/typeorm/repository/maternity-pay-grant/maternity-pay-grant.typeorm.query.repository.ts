import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { GetMaternityPayGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/result/get-maternity-pay-grant-with-relations.query.result';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';

@Injectable()
export class MaternityPayGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<MaternityPayGrantTypeormEntity>
  implements MaternityPayGrantQueryRepositoryGateway
{
  protected readonly _type = MaternityPayGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantTypeormEntity)
    repository: Repository<MaternityPayGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByMaternityPayGrantIdOrFailWithRelations(
    id: MaternityPayGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetMaternityPayGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          maternityPayGrantResult: true,
          maternityPayGrantInssBenefit: true,
          maternityPayGrantLegalProceeding: true,
          maternityPayGrantDocument: true,
          maternityPayGrantEarningsHistory: {
            maternityPayGrantPeriod: true,
          },
          maternityPayGrantPeriod: {
            maternityPayGrantPeriodDocument: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      MaternityPayGrantTypeormEntity,
      GetMaternityPayGrantWithRelationsQueryResult,
    );
  }
}
