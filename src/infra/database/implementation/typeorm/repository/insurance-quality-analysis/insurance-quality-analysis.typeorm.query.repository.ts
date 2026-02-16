import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { GetInsuranceQualityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-with-relations.query.result';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class InsuranceQualityAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<InsuranceQualityAnalysisTypeormEntity>
  implements InsuranceQualityAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    InsuranceQualityAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult | null> {
    const data = await this.findOne({
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
        insuranceQualityAnalysisResult: true,
        analysisToolRecord: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            analysisToolClientInssBenefit: true,
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
        },
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      InsuranceQualityAnalysisTypeormEntity,
      GetInsuranceQualityAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByIdOrFail(
    organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult> {
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
          insuranceQualityAnalysisResult: true,
          analysisToolRecord: {
            analysisToolClient: {
              analysisToolClientLegalProceeding: true,
              analysisToolClientInssBenefit: true,
              createdBy: {
                customer: true,
              },
              updatedBy: {
                customer: true,
              },
            },
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      InsuranceQualityAnalysisTypeormEntity,
      GetInsuranceQualityAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneWithRelationsByIdOrFail(
    organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    id: InsuranceQualityAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetInsuranceQualityAnalysisWithRelationsQueryResult> {
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
          insuranceQualityAnalysisResult: true,
          insuranceQualityAnalysisInssBenefit: true,
          insuranceQualityAnalysisLegalProceeding: true,
          analysisToolRecord: {
            analysisToolClient: {
              analysisToolClientLegalProceeding: true,
              analysisToolClientInssBenefit: true,
              createdBy: {
                customer: true,
              },
              updatedBy: {
                customer: true,
              },
            },
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      InsuranceQualityAnalysisTypeormEntity,
      GetInsuranceQualityAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
