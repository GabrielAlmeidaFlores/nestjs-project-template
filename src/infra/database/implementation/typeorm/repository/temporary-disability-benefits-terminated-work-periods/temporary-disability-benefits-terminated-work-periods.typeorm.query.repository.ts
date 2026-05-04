import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods/query/temporary-disability-benefits-terminated-work-periods.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsTerminatedWorkPeriodsIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
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
