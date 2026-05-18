import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis/query/temporary-disability-benefits-terminated-disability-analysis.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisIdOrFail(
    id: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId,
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
