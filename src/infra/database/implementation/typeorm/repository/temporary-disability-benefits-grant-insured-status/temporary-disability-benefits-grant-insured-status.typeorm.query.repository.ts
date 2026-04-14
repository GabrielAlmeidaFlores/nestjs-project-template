import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status/query/result/get-temporary-disability-benefits-grant-insured-status.query.result';
import { TemporaryDisabilityBenefitsGrantInsuredStatusQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status/query/temporary-disability-benefits-grant-insured-status.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInsuredStatusTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantInsuredStatusQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsGrantInsuredStatusIdOrFail(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult> {
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
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
      GetTemporaryDisabilityBenefitsGrantInsuredStatusQueryResult,
    );
  }
}
