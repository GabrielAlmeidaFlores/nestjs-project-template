import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/general-urban-retirement-grant-special-period.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/result/get-general-urban-retirement-grant-special-period.query.result';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class GeneralUrbanRetirementGrantSpecialPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity>
  implements GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementGrantSpecialPeriodIdOrFail(
    id: GeneralUrbanRetirementGrantSpecialPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString(), deletedAt: IsNull() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult,
    );
  }
}
