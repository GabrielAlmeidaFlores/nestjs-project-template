import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import {
  AnalysisToolRecordStatisticsQueryResult,
  MonthlyStatisticsQueryResult,
} from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AnalysisToolRecordTypeormQueryRepository
  extends BaseTypeormQueryRepository<AnalysisToolRecordTypeormEntity>
  implements AnalysisToolRecordQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolRecordTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolRecordTypeormEntity)
    repository: Repository<AnalysisToolRecordTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  > {
    const relationsClause = this.getRelationsClauseOperation();

    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: [],
      relations: relationsClause,
    };

    const baseWhere: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const withUpdatedBy = {
      ...baseWhere,
      updatedBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const whereType =
      typeof listData.type === 'string' ? { type: listData.type } : {};

    const hasSearchBy = typeof listData.searchBy === 'string';
    const hasClientId =
      listData.analysisToolClientId instanceof AnalysisToolClientId;

    if (hasSearchBy && hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasSearchBy) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
        },
      ];
    } else {
      searchParams.where = [
        {
          ...whereType,
          ...withUpdatedBy,
        },
      ];
    }

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async countByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
    });

    return total;
  }

  public async findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.find({
      where: {
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
      relations: relationsClause,
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: relationsClause,
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async countByOrganizationIdAndAnalysisToolClientIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
      },
    });

    return total;
  }

  public async findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    cnisFastAnalysisId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          cnisFastAnalysis: {
            id: cnisFastAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          cnisFastAnalysis: {
            cnisFastAnalysisResult: true,
            cnisFastAnalysisInssBenefit: true,
            cnisFastAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRppsId: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          retirementPlanningRpps: {
            id: retirementPlanningRppsId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          retirementPlanningRpps: {
            retirementPlanningRppsInssBenefit: true,
            retirementPlanningRppsLegalProceeding: true,
            retirementPlanningRppsResult: true,
            documents: true,
            remunerations: true,
            periods: {
              specialTimePeriod: {
                specialTimeDocuments: true,
              },
              disabilityPeriod: {
                cid: true,
                disabilityDocuments: true,
              },
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          retirementPlanningRgps: {
            id: retirementPlanningRgpsId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
            updatedBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
          },
          cnisFastAnalysis: {
            cnisFastAnalysisResult: true,
            cnisFastAnalysisInssBenefit: true,
            cnisFastAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          updatedBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          retirementPlanningRgps: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          administrativeProcedureInssAnalysis: {
            id: administrativeProcedureInssAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          administrativeProcedureInssAnalysis: {
            administrativeProcedureInssAnalysisResult: true,
            administrativeProcedureInssAnalysisBenefit: true,
            administrativeProcedureInssAnalysisLegalProceeding: true,
            administrativeProcedureInssAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          medicalAndSocialReportObjectionGeneratorAnalysis: {
            id: medicalAndSocialReportObjectionGeneratorAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          medicalAndSocialReportObjectionGeneratorAnalysis: {
            msReportObjectionAnalysisResult: true,
            medicalAndSocialReportObjectionGeneratorAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          judicialCaseAnalysis: {
            id: judicialCaseAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            analysisToolClientInssBenefit: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          judicialCaseAnalysis: {
            judicialCaseAnalysisResult: true,
            judicialCaseAnalysisBenefit: true,
            judicialCaseAnalysisLegalProceeding: true,
            judicialCaseAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          disabilityAssessmentForBpcAnalysis: {
            id: disabilityAssessmentForBpcAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          disabilityAssessmentForBpcAnalysis: {
            disabilityAssessmentForBpcAnalysisResult: true,
            disabilityAssessmentForBpcAnalysisBenefit: true,
            disabilityAssessmentForBpcAnalysisLegalProceeding: true,
            disabilityAssessmentForBpcAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          ruralTimeline: {
            id: ruralTimelineAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          ruralTimeline: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async getStatisticsByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    startDate: Date,
    endDate: Date,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<AnalysisToolRecordStatisticsQueryResult> {
    const startDateNormalized = new Date(startDate);
    startDateNormalized.setHours(0, 0, 0, 0);

    const endDateNormalized = new Date(endDate);
    const HOURS_IN_DAY = 23;
    const MINUTES_IN_HOUR = 59;
    const SECONDS_IN_MINUTE = 59;
    const MILLISECONDS_IN_SECOND = 999;
    endDateNormalized.setHours(
      HOURS_IN_DAY,
      MINUTES_IN_HOUR,
      SECONDS_IN_MINUTE,
      MILLISECONDS_IN_SECOND,
    );

    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdBy: {
        customer: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
        organization: {
          id: organizationId.toString(),
        },
      },
    };

    if (typeof type !== 'undefined') {
      whereClause.type = type;
    }

    const records = await this.find({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
      },
    });

    const filteredRecords = records.filter(
      (record) =>
        record.createdAt >= startDateNormalized &&
        record.createdAt <= endDateNormalized,
    );

    const monthlyStats = new Map<string, number>();
    let totalCount = 0;

    for (const record of filteredRecords) {
      const date = new Date(record.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const currentCount = monthlyStats.get(monthKey) ?? 0;
      monthlyStats.set(monthKey, currentCount + 1);
      totalCount++;
    }

    const allMonths = new Set<string>();
    const currentDate = new Date(startDateNormalized);
    while (currentDate <= endDateNormalized) {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      allMonths.add(monthKey);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    for (const monthKey of allMonths) {
      if (!monthlyStats.has(monthKey)) {
        monthlyStats.set(monthKey, 0);
      }
    }

    const monthlyStatistics = Array.from(monthlyStats.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([monthKey, count]) => {
        const [yearStr = '0', monthStr = '00'] = monthKey.split('-');
        return MonthlyStatisticsQueryResult.build({
          year: parseInt(yearStr, 10),
          month: monthStr,
          count,
        });
      });

    return AnalysisToolRecordStatisticsQueryResult.build({
      totalCount,
      monthlyStatistics,
    });
  }

  private getRelationsClauseOperation(): FindOptionsRelations<AnalysisToolRecordTypeormEntity> {
    const relationsClause: FindOptionsRelations<AnalysisToolRecordTypeormEntity> =
      {
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientLegalProceeding: true,
          analysisToolClientInssBenefit: true,
        },
      };

    for (const key of this.getEntityRelationsKey()) {
      relationsClause[key] = true as never;
    }

    return relationsClause;
  }

  private getEntityRelationsKey(): (keyof AnalysisToolRecordTypeormEntity)[] {
    return [
      'cnisFastAnalysis',
      'retirementPlanningRpps',
      'retirementPlanningRgps',
      'administrativeProcedureInssAnalysis',
      'judicialCaseAnalysis',
    ];
  }
}
