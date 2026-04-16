import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/general-urban-retirement-denial-time-accelerator.query.repository.gateway';
import { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/result/get-general-urban-retirement-denial-time-accelerator.query.result';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementDenialTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementDenialTimeAcceleratorIdOrFail(
    id: GeneralUrbanRetirementDenialTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult,
    );
  }
}
