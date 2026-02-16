import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/query/result/get-retirement-planning-rgps-period-document.query.result';
import { RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/query/retirement-planning-rgps-period-document.query.repository.gateway';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPlanningRgpsPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsPeriodDocumentTypeormEntity>
  implements RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsPeriodDocumentTypeormEntity)
    repository: Repository<RetirementPlanningRgpsPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsPeriodDocumentIdOrFail(
    id: RetirementPlanningRgpsPeriodDocumentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsPeriodDocumentQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    const mapped = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
      GetRetirementPlanningRgpsPeriodDocumentQueryResult,
    );

    return mapped;
  }

  public async findByRetirementPlanningRgpsPeriodId(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodDocumentQueryResult[]> {
    const data = await this.find({
      where: {
        retirementPlanningRgpsPeriod: {
          id: retirementPlanningRgpsPeriodId.toString(),
        },
      },
    });

    const mapped = this.mapperGateway.mapArray(
      data,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
      GetRetirementPlanningRgpsPeriodDocumentQueryResult,
    );

    return mapped;
  }
}
