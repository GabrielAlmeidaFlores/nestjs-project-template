import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis/query/permanent-incapacity-benefit-terminated-disability-analysis.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByPermanentIncapacityBenefitTerminatedDisabilityAnalysisIdOrFail(
    id: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
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
