import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { CountLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/count-legal-proceeding-detail.query.param';
import { ListLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/list-legal-proceeding-detail.query.param';
import { GetLegalProceedingDetailWithRelationsQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail-with-relations.query.result';
import { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

export class LegalProceedingDetailTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalProceedingDetailTypeormEntity>
  implements LegalProceedingDetailQueryRepositoryGateway
{
  protected readonly _type = LegalProceedingDetailTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalProceedingDetailTypeormEntity)
    repository: Repository<LegalProceedingDetailTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByLegalProceeding(
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult> {
    const data = await this.findOne({
      where: {
        analysisToolClientLegalProceeding: {
          legalProceedingNumber: legalProceedingNumber.toString(),
        },
      },
      relations: {
        analysisToolClientLegalProceeding: true,
      },
    });

    const mapped = this.mapperGateway.map(
      data,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailQueryResult,
    );

    return mapped;
  }

  public async listByOrganizationIdAndAnalysisToolClientId(
    organizationId: OrganizationId,
    listData: ListLegalProceedingDetailQueryParam,
  ): Promise<
    ListDataOutputModel<GetLegalProceedingDetailWithRelationsQueryResult>
  > {
    const where = {
      analysisToolClientLegalProceeding: {
        analysisToolClient: {
          createdBy: {
            organization: { id: organizationId.toString() },
          },
        } as FindOptionsWhere<AnalysisToolClientTypeormEntity>,
      },
    };

    if (listData.analysisToolClientId !== null) {
      where.analysisToolClientLegalProceeding.analysisToolClient = {
        id: listData.analysisToolClientId.toString(),
      };
    }

    const data = await this.list(listData, {
      where,
      relations: {
        analysisToolClientLegalProceeding: {
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
            analysisToolRecord: true,
          },
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetLegalProceedingDetailWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findLastCreated(
    analysisToolClientLegalProceedingId: AnalysisToolClientLegalProceedingId,
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult | null> {
    const data = await this.findOne({
      where: {
        analysisToolClientLegalProceeding: {
          id: analysisToolClientLegalProceedingId.toString(),
          legalProceedingNumber: legalProceedingNumber.toString(),
        },
      },
      relations: {
        analysisToolClientLegalProceeding: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const mapped = this.mapperGateway.map(
      data,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailQueryResult,
    );

    return mapped;
  }

  public async getByLegalProceedingNumber(
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailWithRelationsQueryResult> {
    const data = await this.findOne({
      where: {
        analysisToolClientLegalProceeding: {
          legalProceedingNumber,
        },
      },
      relations: {
        analysisToolClientLegalProceeding: {
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
            analysisToolRecord: true,
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: CountLegalProceedingDetailQueryParam,
  ): Promise<
    ListDataOutputModel<GetLegalProceedingDetailWithRelationsQueryResult>
  > {
    const where = {
      analysisToolClientLegalProceeding: {
        analysisToolClient: {
          createdBy: {
            organization: { id: organizationId.toString() },
          } as FindOptionsWhere<OrganizationMemberTypeormEntity>,
        },
      },
    };

    if (listData.authIdentityId !== null) {
      where.analysisToolClientLegalProceeding.analysisToolClient.createdBy.customer =
        {
          authIdentity: {
            id: listData.authIdentityId.toString(),
          },
        };
    }

    const data = await this.list(listData, {
      where,
      relations: {
        analysisToolClientLegalProceeding: {
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
            analysisToolRecord: true,
          },
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetLegalProceedingDetailWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }
}
