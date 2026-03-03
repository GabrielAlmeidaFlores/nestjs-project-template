import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { GetJudicialCaseAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-with-relations.query.result';

import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

@Injectable()
export class JudicialCaseAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<JudicialCaseAnalysisTypeormEntity>
  implements JudicialCaseAnalysisQueryRepositoryGateway
{
  protected readonly _type = JudicialCaseAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisTypeormEntity)
    repository: Repository<JudicialCaseAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetJudicialCaseAnalysisWithRelationsQueryResult>
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
        judicialCaseAnalysisBenefit: true,
        judicialCaseAnalysisLegalProceeding: true,
        judicialCaseAnalysisDocument: true,
        judicialCaseAnalysisResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      JudicialCaseAnalysisTypeormEntity,
      GetJudicialCaseAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetJudicialCaseAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetJudicialCaseAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: judicialCaseAnalysisId.toString(),
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
          judicialCaseAnalysisBenefit: true,
          judicialCaseAnalysisLegalProceeding: true,
          judicialCaseAnalysisDocument: true,
          judicialCaseAnalysisResult: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      JudicialCaseAnalysisTypeormEntity,
      GetJudicialCaseAnalysisWithRelationsQueryResult,
    );
  }
}
