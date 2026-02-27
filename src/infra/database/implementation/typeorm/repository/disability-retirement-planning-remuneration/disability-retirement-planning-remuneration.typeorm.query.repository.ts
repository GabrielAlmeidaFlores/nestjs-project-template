import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { ListDisabilityRetirementPlanningRemunerationQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/param/list-disability-retirement-planning-remuneration.query.param';
import { GetDisabilityRetirementPlanningRemunerationListQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration-list.query.result';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRemunerationTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningRemunerationTypeormEntity>
  implements DisabilityRetirementPlanningRemunerationQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRemunerationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRemunerationTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    listData: ListDisabilityRetirementPlanningRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetDisabilityRetirementPlanningRemunerationListQueryResult>
  > {
    const searchParams: FindManyOptions<DisabilityRetirementPlanningRemunerationTypeormEntity> =
      {
        where: {
          disabilityRetirementPlanning: {
            id: disabilityRetirementPlanningId.toString(),
            analysisToolRecord: {
              createdBy: {
                customer: {
                  authIdentity: { id: authIdentityId.toString() },
                },
                organization: { id: organizationId.toString() },
              },
            },
          },
        },
        relations: {
          disabilityRetirementPlanning: true,
        },
      };

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      GetDisabilityRetirementPlanningRemunerationListQueryResult,
    );

    return new ListDataOutputModel<GetDisabilityRetirementPlanningRemunerationListQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findByDisabilityRetirementPlanningId(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningRemunerationListQueryResult[]> {
    const data = await this.repository.find({
      where: {
        disabilityRetirementPlanning: {
          id: disabilityRetirementPlanningId.toString(),
        },
      },
      relations: {
        disabilityRetirementPlanning: true,
      },
    });

    return this.mapperGateway.mapArray(
      data,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      GetDisabilityRetirementPlanningRemunerationListQueryResult,
    );
  }
}
