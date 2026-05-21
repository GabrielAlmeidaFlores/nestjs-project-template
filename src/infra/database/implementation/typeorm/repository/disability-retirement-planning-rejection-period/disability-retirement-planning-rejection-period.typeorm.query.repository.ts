import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/disability-retirement-planning-rejection-period.query.repository.gateway';
import { ListDisabilityRetirementPlanningRejectionPeriodQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/param/list-disability-retirement-planning-rejection-period.query.param';
import { GetDisabilityRetirementPlanningRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/result/get-disability-retirement-planning-rejection-period.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningRejectionPeriodTypeormEntity>
  implements DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRejectionPeriodTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRejectionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByDisabilityRetirementPlanningRejectionId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListDisabilityRetirementPlanningRejectionPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetDisabilityRetirementPlanningRejectionPeriodQueryResult>
  > {
    const where = listData.disabilityRetirementPlanningRejection
      ? {
          disabilityRetirementPlanningRejection: {
            id: listData.disabilityRetirementPlanningRejection.toString(),
          },
        }
      : {};

    const result = await this.list(listData, { where });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
      GetDisabilityRetirementPlanningRejectionPeriodQueryResult,
    );

    return new ListDataOutputModel<GetDisabilityRetirementPlanningRejectionPeriodQueryResult>(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        resource,
      },
    );
  }
}
