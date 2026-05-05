import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/result/get-retirement-permanent-disability-revision-with-relations.query.result';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPermanentDisabilityRevisionTypeormEntity>
  implements RetirementPermanentDisabilityRevisionQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRevisionTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRevisionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
    id: RetirementPermanentDisabilityRevisionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          retirementPermanentDisabilityRevisionResult: true,
          retirementPermanentDisabilityRevisionInssBenefit: true,
          retirementPermanentDisabilityRevisionLegalProceeding: true,
          retirementPermanentDisabilityRevisionDocument: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
    );
  }
}
