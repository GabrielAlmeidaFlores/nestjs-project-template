import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-with-relations.query.result';

import type { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity>
  implements
    MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    )
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult>
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
        medicalAndSocialReportObjectionGeneratorAnalysisDocument: true,
        medicalAndSocialReportObjectionGeneratorAnalysisResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: medicalAndSocialReportObjectionGeneratorAnalysisId.toString(),
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
          medicalAndSocialReportObjectionGeneratorAnalysisDocument: true,
          medicalAndSocialReportObjectionGeneratorAnalysisResult: true,
          medicalAndSocialReportObjectionGeneratorAnalysisBenefit: true,
          medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
