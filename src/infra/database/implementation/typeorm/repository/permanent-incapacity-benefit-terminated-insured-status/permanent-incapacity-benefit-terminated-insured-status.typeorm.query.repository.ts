import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-insured-status/query/permanent-incapacity-benefit-terminated-insured-status.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInsuredStatusTypeormQueryRepository
  extends BaseTypeormQueryRepository<PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedInsuredStatusQueryRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByPermanentIncapacityBenefitTerminatedInsuredStatusIdOrFail(
    id: PermanentIncapacityBenefitTerminatedInsuredStatusId,
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
