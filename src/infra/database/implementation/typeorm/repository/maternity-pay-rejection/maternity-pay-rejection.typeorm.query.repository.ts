import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class MaternityPayRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<MaternityPayRejectionTypeormEntity>
  implements MaternityPayRejectionQueryRepositoryGateway
{
  protected readonly _type = MaternityPayRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionTypeormEntity)
    repository: Repository<MaternityPayRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByMaternityPayRejectionIdOrFailWithRelations(
    id: MaternityPayRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMaternityPayRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          maternityPayRejectionResult: true,
          maternityPayRejectionDocument: true,
          maternityPayRejectionInssBenefit: true,
          maternityPayRejectionLegalProceeding: true,
          maternityPayRejectionWorkPeriod: {
            maternityPayRejectionWorkPeriodDocument: true,
            maternityPayRejectionWorkPeriodEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      MaternityPayRejectionTypeormEntity,
      GetMaternityPayRejectionWithRelationsQueryResult,
    );
  }
}
