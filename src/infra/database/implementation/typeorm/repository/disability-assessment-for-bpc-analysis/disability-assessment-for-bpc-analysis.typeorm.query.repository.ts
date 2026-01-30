import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-with-relations.query.result';

import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityAssessmentForBpcAnalysisTypeormEntity>
  implements DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityAssessmentForBpcAnalysisTypeormEntity)
    repository: Repository<DisabilityAssessmentForBpcAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult>
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
        disabilityAssessmentForBpcAnalysisBenefit: true,
        disabilityAssessmentForBpcAnalysisLegalProceeding: true,
        disabilityAssessmentForBpcAnalysisDocument: true,
        disabilityAssessmentForBpcAnalysisResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: disabilityAssessmentForBpcAnalysisId.toString(),
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
          disabilityAssessmentForBpcAnalysisBenefit: true,
          disabilityAssessmentForBpcAnalysisLegalProceeding: true,
          disabilityAssessmentForBpcAnalysisDocument: true,
          disabilityAssessmentForBpcAnalysisResult: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
