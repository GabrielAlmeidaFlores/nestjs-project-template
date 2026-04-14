import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { BpcElderlyAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/bpc-elderly-analysis.query.repository.gateway';
import { GetBpcElderlyAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-with-relations.query.result';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class BpcElderlyAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<BpcElderlyAnalysisTypeormEntity>
  implements BpcElderlyAnalysisQueryRepositoryGateway
{
  protected readonly _type = BpcElderlyAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisTypeormEntity)
    repository: Repository<BpcElderlyAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBpcElderlyAnalysisIdAndOrganizationIdOrFail(
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcElderlyAnalysisWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: bpcElderlyAnalysisId.toString(),
          analysisToolRecord: {
            createdBy: { organization: { id: organizationId.toString() } },
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
          bpcElderlyAnalysisFamilyMember: {
            bpcElderlyAnalysisFamilyMemberDocument: true,
          },
          bpcElderlyAnalysisDocument: true,
          bpcElderlyAnalysisResult: true,
          analysisToolRecord: {
            analysisToolClient: {
              createdBy: {
                customer: true,
              },
              updatedBy: {
                customer: true,
              },
              analysisToolClientInssBenefit: true,
              analysisToolClientLegalProceeding: true,
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

    return this.mapperGateway.map(
      result,
      BpcElderlyAnalysisTypeormEntity,
      GetBpcElderlyAnalysisWithRelationsQueryResult,
    );
  }
}
