import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-insured-status/query/temporary-incapacity-benefit-termination-insured-status.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInsuredStatusTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationInsuredStatusQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitTerminationInsuredStatusIdOrFail(
    id: TemporaryIncapacityBenefitTerminationInsuredStatusId,
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
