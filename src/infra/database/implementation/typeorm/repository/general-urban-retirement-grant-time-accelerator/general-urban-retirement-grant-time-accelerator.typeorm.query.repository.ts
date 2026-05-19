import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/general-urban-retirement-grant-time-accelerator.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/result/get-general-urban-retirement-grant-time-accelerator.query.result';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementGrantTimeAcceleratorIdOrFail(
    id: GeneralUrbanRetirementGrantTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult,
    );
  }

  public async findByGeneralUrbanRetirementGrantId(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult[]> {
    const data = await this.find({
      where: {
        generalUrbanRetirementGrant: {
          id: generalUrbanRetirementGrantId.toString(),
        },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult,
    );
  }
}
