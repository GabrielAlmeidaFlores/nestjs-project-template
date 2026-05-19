import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/general-urban-retirement-analysis-remuneration.query.repository.gateway';
import { ListGeneralUrbanRetirementAnalysisRemunerationQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/param/list-general-urban-retirement-analysis-remuneration.query.param';
import { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisRemunerationTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity>
  implements GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisRemunerationTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisRemunerationQueryResult[]> {
    const searchParams: FindManyOptions<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity> =
      {
        where: {
          generalUrbanRetirementAnalysis: {
            id: generalUrbanRetirementAnalysisId.toString(),
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
          generalUrbanRetirementAnalysis: true,
        },
      };

    const entities = await this.repository.find(searchParams);

    return this.mapperGateway.mapArray(
      entities,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
    );
  }

  public async listByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    listData: ListGeneralUrbanRetirementAnalysisRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetGeneralUrbanRetirementAnalysisRemunerationQueryResult>
  > {
    const searchParams: FindManyOptions<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity> =
      {
        where: {
          generalUrbanRetirementAnalysis: {
            id: generalUrbanRetirementAnalysisId.toString(),
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
          generalUrbanRetirementAnalysis: true,
        },
      };

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
    );

    return new ListDataOutputModel<GetGeneralUrbanRetirementAnalysisRemunerationQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }
}
