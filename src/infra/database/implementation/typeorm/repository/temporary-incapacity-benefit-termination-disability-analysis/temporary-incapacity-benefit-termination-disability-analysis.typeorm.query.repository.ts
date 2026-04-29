import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis/query/temporary-incapacity-benefit-termination-disability-analysis.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryIncapacityBenefitTerminationDisabilityAnalysisIdOrFail(
    id: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId,
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
