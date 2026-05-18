import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/query/general-urban-retirement-grant-result.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/query/result/get-general-urban-retirement-grant-result.query.result';
import { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantResultTypeormEntity>
  implements GeneralUrbanRetirementGrantResultQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementGrantResultIdOrFail(
    id: GeneralUrbanRetirementGrantResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantResultQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantResultTypeormEntity,
      GetGeneralUrbanRetirementGrantResultQueryResult,
    );
  }
}
