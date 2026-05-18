import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-work-periods/query/temporary-incapacity-benefit-rejection-work-periods.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitRejectionWorkPeriodsIdOrFail(
    id: TemporaryIncapacityBenefitRejectionWorkPeriodsId,
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
