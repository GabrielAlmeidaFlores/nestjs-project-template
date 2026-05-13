import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/retirement-permanent-disability-revision-concession-letter-breakdown.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPermanentDisabilityRevisionConcessionLetterBreakdownIdOrFail(
    id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
        relations: {
          retirementPermanentDisabilityRevision: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
      GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult,
    );
  }
}
