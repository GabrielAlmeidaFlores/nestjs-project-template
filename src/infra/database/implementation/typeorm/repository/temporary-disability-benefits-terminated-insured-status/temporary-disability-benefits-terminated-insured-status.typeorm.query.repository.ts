import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-insured-status/query/temporary-disability-benefits-terminated-insured-status.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedInsuredStatusQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsTerminatedInsuredStatusIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedInsuredStatusId,
    err: ConstructorType<NotFoundError>,
  ): Promise<void> {
    await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );
  }
}
