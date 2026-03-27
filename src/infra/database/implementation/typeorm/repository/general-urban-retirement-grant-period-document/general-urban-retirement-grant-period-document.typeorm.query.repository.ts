import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/query/general-urban-retirement-grant-period-document.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/query/result/get-general-urban-retirement-grant-period-document.query.result';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity>
  implements GeneralUrbanRetirementGrantPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementGrantPeriodDocumentIdOrFail(
    id: GeneralUrbanRetirementGrantPeriodDocumentId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult,
    );
  }

  public async findByGeneralUrbanRetirementGrantPeriodId(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult[]> {
    const data = await this.find({
      where: {
        generalUrbanRetirementGrantPeriod: {
          id: periodId.toString(),
        },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult,
    );
  }
}
