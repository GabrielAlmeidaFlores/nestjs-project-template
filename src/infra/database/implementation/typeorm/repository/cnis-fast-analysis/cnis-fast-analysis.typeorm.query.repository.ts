import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class CnisFastAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<CnisFastAnalysisTypeormEntity>
  implements CnisFastAnalysisQueryRepositoryGateway
{
  protected readonly _type = CnisFastAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisTypeormEntity)
    repository: Repository<CnisFastAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdWithRelationsOrFail(
    id: CnisFastAnalysisId,
    err: Constructor<NotFoundError>,
  ): Promise<GetCnisFastAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: {
          cnisFastAnalysisClient: {
            cnisFastAnalysisClientInssBenefit: true,
            cnisFastAnalysisClientLegalProceeding: true,
          },
          cnisFastAnalysisResult: true,
          createdBy: true,
          updatedBy: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
