import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GetGeneralUrbanRetirementDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/result/get-general-urban-retirement-denial-with-relations.query.result';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementDenialTypeormEntity>
  implements GeneralUrbanRetirementDenialQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
    id: GeneralUrbanRetirementDenialId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementDenialWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          generalUrbanRetirementDenialResult: true,
          generalUrbanRetirementDenialDocument: true,
          generalUrbanRetirementDenialPeriod: {
            generalUrbanRetirementDenialPeriodDocument: true,
            generalUrbanRetirementDenialPeriodEarningsHistory: true,
          },
          generalUrbanRetirementDenialTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementDenialTypeormEntity,
      GetGeneralUrbanRetirementDenialWithRelationsQueryResult,
    );
  }
}
