import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { BpcDisabilityTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/bpc-disability-termination.query.repository.gateway';
import { GetBpcDisabilityTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-with-relations.query.result';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class BpcDisabilityTerminationTypeormQueryRepository
  extends BaseTypeormQueryRepository<BpcDisabilityTerminationTypeormEntity>
  implements BpcDisabilityTerminationQueryRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationTypeormEntity)
    repository: Repository<BpcDisabilityTerminationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityTerminationWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: bpcDisabilityTerminationId.toString(),
          analysisToolRecord: {
            createdBy: { organization: { id: organizationId.toString() } },
          },
        },
        relations: {
          bpcDisabilityTerminationFamilyMember: {
            bpcDisabilityTerminationFamilyMemberDocument: true,
          },
          bpcDisabilityTerminationDocument: true,
          bpcDisabilityTerminationInssBenefit: true,
          bpcDisabilityTerminationLegalProceeding: true,
          bpcDisabilityTerminationResult: true,
          bpcDisabilityTerminationDisabilityAssessment: {
            bpcDisabilityTerminationDisabilityAssessmentDocument: true,
          },
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
      BpcDisabilityTerminationTypeormEntity,
      GetBpcDisabilityTerminationWithRelationsQueryResult,
    );
  }
}
