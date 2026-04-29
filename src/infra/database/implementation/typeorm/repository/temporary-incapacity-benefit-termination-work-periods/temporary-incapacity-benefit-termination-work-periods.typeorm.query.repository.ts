import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-work-periods/query/temporary-incapacity-benefit-termination-work-periods.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitTerminationWorkPeriodsIdOrFail(
    id: TemporaryIncapacityBenefitTerminationWorkPeriodsId,
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
