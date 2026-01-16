import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-with-relations.query.result';

import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<AdministrativeProcedureInssAnalysisTypeormEntity>
  implements AdministrativeProcedureInssAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AdministrativeProcedureInssAnalysisTypeormEntity)
    repository: Repository<AdministrativeProcedureInssAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
        updatedBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
      },
      relations: {
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
        administrativeProcedureInssAnalysisBenefit: true,
        administrativeProcedureInssAnalysisLegalProceeding: true,
        administrativeProcedureInssAnalysisDocument: true,
        administrativeProcedureInssAnalysisResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByAdministrativeProcedureInssAnalysisIdAndOrganizationIdOrFail(
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: administrativeProcedureInssAnalysisId.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        relations: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          administrativeProcedureInssAnalysisBenefit: true,
          administrativeProcedureInssAnalysisLegalProceeding: true,
          administrativeProcedureInssAnalysisDocument: true,
          administrativeProcedureInssAnalysisResult: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      GetAdministrativeProcedureInssAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
