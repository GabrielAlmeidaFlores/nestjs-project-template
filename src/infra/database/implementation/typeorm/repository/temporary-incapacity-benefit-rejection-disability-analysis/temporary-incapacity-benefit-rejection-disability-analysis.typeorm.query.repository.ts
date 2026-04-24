import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis/query/temporary-incapacity-benefit-rejection-disability-analysis.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitRejectionDisabilityAnalysisIdOrFail(
    id: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId,
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
