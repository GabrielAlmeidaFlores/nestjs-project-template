import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-insured-status/query/temporary-incapacity-benefit-rejection-insured-status.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInsuredStatusTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionInsuredStatusQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitRejectionInsuredStatusIdOrFail(
    id: TemporaryIncapacityBenefitRejectionInsuredStatusId,
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
