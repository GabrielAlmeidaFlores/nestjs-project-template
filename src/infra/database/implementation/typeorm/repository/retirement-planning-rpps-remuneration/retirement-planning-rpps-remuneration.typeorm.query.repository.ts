import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListRetirementPlanningRppsRemunerationQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/param/list-retirement-planning-rpps-remuneration.query.param';
import { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRppsRemunerationTypeormEntity>
  implements RetirementPlanningRppsRemunerationQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsRemunerationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsRemunerationTypeormEntity)
    repository: Repository<RetirementPlanningRppsRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    listData: ListRetirementPlanningRppsRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetRetirementPlanningRppsRemunerationQueryResult>
  > {
    const searchParams: FindManyOptions<RetirementPlanningRppsRemunerationTypeormEntity> =
      {
        where: {
          retirementPlanningRpps: {
            id: retirementPlanningRppsId.toString(),
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
          retirementPlanningRpps: true,
        },
      };

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      RetirementPlanningRppsRemunerationTypeormEntity,
      GetRetirementPlanningRppsRemunerationQueryResult,
    );

    return new ListDataOutputModel<GetRetirementPlanningRppsRemunerationQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }
}
