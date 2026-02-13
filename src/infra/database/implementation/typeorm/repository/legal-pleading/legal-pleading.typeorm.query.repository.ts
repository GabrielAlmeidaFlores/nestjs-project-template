import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { ListLegalPleadingQueryParam } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/param/list-legal-pleading.query.param';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import {
  LegalPleadingMonthlyStatisticsQueryResult,
  LegalPleadingStatisticsQueryResult,
} from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/result/legal-pleading-statistics.query.result';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class LegalPleadingTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingTypeormEntity>
  implements LegalPleadingQueryRepositoryGateway
{
  protected readonly _type = LegalPleadingTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingTypeormEntity)
    repository: Repository<LegalPleadingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListLegalPleadingQueryParam,
  ): Promise<ListDataOutputModel<GetLegalPleadingWithRelationsQueryResult>> {
    const where: Array<FindOptionsWhere<LegalPleadingTypeormEntity>> = [];

    const baseWhere: FindOptionsWhere<LegalPleadingTypeormEntity> = {
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
      updatedBy: {
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

    if (listData.status !== null) {
      baseWhere.status = listData.status;
    }

    if (listData.searchBy !== null) {
      where.push({
        ...baseWhere,
        code: Like(listData.searchBy),
      });

      where.push({
        ...baseWhere,
        analysisToolClient: {
          name: Like(listData.searchBy),
        },
      });

      where.push({
        ...baseWhere,
        analysisToolClient: {
          federalDocument: listData.searchBy,
        },
      });
    } else {
      where.push(baseWhere);
    }

    const data = await this.list(listData, {
      where,
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
        legalPleadingAddress: true,
        legalPleadingDocument: {
          legalPleadingDocumentAnalysis: true,
        },
        legalPleadingResult: true,
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
      },
    });

    const resource = this.mapperGateway.mapArray(
      data.resource,
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithRelationsQueryResult,
    );

    return new ListDataOutputModel({
      ...data,
      resource,
    });
  }

  public async findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetLegalPleadingWithRelationsQueryResult[]> {
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
      relations: {
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
        legalPleadingAddress: true,
        legalPleadingDocument: {
          legalPleadingDocumentAnalysis: true,
        },
        legalPleadingResult: true,
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
    id: LegalPleadingId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: Constructor<NotFoundError>,
  ): Promise<GetLegalPleadingWithRelationsQueryResult> {
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
        relations: {
          analysisToolClient: {
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
          },
          legalPleadingAddress: true,
          legalPleadingDocument: {
            legalPleadingDocumentAnalysis: true,
          },
          legalPleadingResult: true,
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
      LegalPleadingTypeormEntity,
      GetLegalPleadingWithRelationsQueryResult,
    );

    return mappedData;
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

  public async countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
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
    });

    return total;
  }

  public async getStatisticsByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    startDate: Date,
    endDate: Date,
    petitionType?: LegalPleadingPetitionTypeEnum,
  ): Promise<LegalPleadingStatisticsQueryResult> {
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

    const whereClause: FindOptionsWhere<LegalPleadingTypeormEntity> = {
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

    if (typeof petitionType !== 'undefined') {
      whereClause.petitionType = petitionType;
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
        return LegalPleadingMonthlyStatisticsQueryResult.build({
          year: parseInt(yearStr, 10),
          month: monthStr,
          count,
        });
      });

    return LegalPleadingStatisticsQueryResult.build({
      totalCount,
      monthlyStatistics,
    });
  }
}
