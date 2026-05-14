import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-work-periods/query/permanent-incapacity-benefit-terminated-work-periods.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByPermanentIncapacityBenefitTerminatedWorkPeriodsIdOrFail(
    id: PermanentIncapacityBenefitTerminatedWorkPeriodsId,
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
