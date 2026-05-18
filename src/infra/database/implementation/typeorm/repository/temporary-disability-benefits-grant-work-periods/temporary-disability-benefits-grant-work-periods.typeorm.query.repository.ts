import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods/query/result/get-temporary-disability-benefits-grant-work-periods.query.result';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods/query/temporary-disability-benefits-grant-work-periods.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsGrantWorkPeriodsIdOrFail(
    id: TemporaryDisabilityBenefitsGrantWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult> {
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
      TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
      GetTemporaryDisabilityBenefitsGrantWorkPeriodsQueryResult,
    );
  }
}
