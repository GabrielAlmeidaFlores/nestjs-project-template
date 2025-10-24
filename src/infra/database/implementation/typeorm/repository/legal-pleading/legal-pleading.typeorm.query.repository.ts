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
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { ListLegalPleadingQueryParam } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/param/list-legal-pleading.query.param';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

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

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListLegalPleadingQueryParam,
  ): Promise<ListDataOutputModel<GetLegalPleadingWithRelationsQueryResult>> {
    const where: Array<FindOptionsWhere<LegalPleadingTypeormEntity>> = [];

    const baseWhere: FindOptionsWhere<LegalPleadingTypeormEntity> = {
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
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
        },
        legalPleadingAddress: true,
        legalPleadingDocument: {
          legalPleadingDocumentAnalysis: true,
        },
        legalPleadingResult: true,
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
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

  public async findByAnalysisToolClientAndOrganizationId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
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
        },
        updatedBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
      },
      relations: {
        analysisToolClient: {
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
        },
        legalPleadingAddress: true,
        legalPleadingDocument: {
          legalPleadingDocumentAnalysis: true,
        },
        legalPleadingResult: true,
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
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

  public async findOneByLegalPleadingAndOrganizationIdOrFail(
    id: LegalPleadingId,
    organizationId: OrganizationId,
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
          },
          updatedBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        relations: {
          analysisToolClient: {
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
          legalPleadingAddress: true,
          legalPleadingDocument: {
            legalPleadingDocumentAnalysis: true,
          },
          legalPleadingResult: true,
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
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

  public async countByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number> {
    const total = await this.count({
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
    });

    return total;
  }
}
