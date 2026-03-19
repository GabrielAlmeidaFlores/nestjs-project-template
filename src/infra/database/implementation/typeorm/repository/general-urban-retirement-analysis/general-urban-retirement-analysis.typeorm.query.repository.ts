import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis-with-relations.query.result';
import { GetGeneralUrbanRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementAnalysisTypeormEntity>
  implements GeneralUrbanRetirementAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
    id: GeneralUrbanRetirementAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          generalUrbanRetirementAnalysisResult: true,
          remunerations: true,
          documents: true,
          legalProceedings: true,
          periods: {
            specialTimePeriod: { specialTimeDocuments: true },
            disabilityPeriod: { disabilityDocuments: true, cid: true },
          },
        },
        relationLoadStrategy: 'query',
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult,
    );
  }

  public async findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdOrFail(
    id: GeneralUrbanRetirementAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementAnalysisQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GetGeneralUrbanRetirementAnalysisQueryResult,
    );
  }
}
