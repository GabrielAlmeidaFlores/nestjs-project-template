import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-query.result';
import { GetGeneralUrbanRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-with-relations.query.result';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantTypeormEntity>
  implements GeneralUrbanRetirementGrantQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
    id: GeneralUrbanRetirementGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          generalUrbanRetirementGrantBenefit: true,
          generalUrbanRetirementGrantResult: true,
          generalUrbanRetirementGrantLegalProceeding: true,
          generalUrbanRetirementGrantPeriod: true,
        },
      },
      err,
    );
    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantTypeormEntity,
      GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
    );
  }

  public async findOneByGeneralUrbanRetirementGrantIdOrFail(
    id: GeneralUrbanRetirementGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );
    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantTypeormEntity,
      GetGeneralUrbanRetirementGrantQueryResult,
    );
  }
}
