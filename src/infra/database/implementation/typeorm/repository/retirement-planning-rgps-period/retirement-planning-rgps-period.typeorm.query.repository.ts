import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListRetirementPlanningRgpsPeriodQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/param/list-retirement-planning-rgps-period.query.param';
import { GetRetirementPlanningRgpsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/result/get-retirement-planning-rgps-period-query.result';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class RetirementPlanningRgpsPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsPeriodTypeormEntity>
  implements RetirementPlanningRgpsPeriodQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsPeriodTypeormEntity)
    repository: Repository<RetirementPlanningRgpsPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByRetirementPlanningRgpsId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListRetirementPlanningRgpsPeriodQueryParam,
  ): Promise<ListDataOutputModel<GetRetirementPlanningRgpsPeriodQueryResult>> {
    const where = listData.retirementPlanningRgps
      ? {
          retirementPlanningRgps: {
            id: listData.retirementPlanningRgps.toString(),
          },
        }
      : {};

    const result = await this.list(listData, { where });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      RetirementPlanningRgpsPeriodTypeormEntity,
      GetRetirementPlanningRgpsPeriodQueryResult,
    );

    return new ListDataOutputModel<GetRetirementPlanningRgpsPeriodQueryResult>({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      resource,
    });
  }
}
