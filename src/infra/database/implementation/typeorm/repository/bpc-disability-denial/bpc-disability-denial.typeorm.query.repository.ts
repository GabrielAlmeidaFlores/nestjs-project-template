import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { BpcDisabilityDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/bpc-disability-denial.query.repository.gateway';
import { GetBpcDisabilityDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-with-relations.query.result';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class BpcDisabilityDenialTypeormQueryRepository
  extends BaseTypeormQueryRepository<BpcDisabilityDenialTypeormEntity>
  implements BpcDisabilityDenialQueryRepositoryGateway
{
  protected readonly _type = BpcDisabilityDenialTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialTypeormEntity)
    repository: Repository<BpcDisabilityDenialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityDenialWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: bpcDisabilityDenialId.toString(),
          analysisToolRecord: {
            createdBy: { organization: { id: organizationId.toString() } },
          },
        },
        relations: {
          bpcDisabilityDenialFamilyMember: {
            bpcDisabilityDenialFamilyMemberDocument: true,
          },
          bpcDisabilityDenialDocument: true,
          bpcDisabilityDenialInssBenefit: true,
          bpcDisabilityDenialLegalProceeding: true,
          bpcDisabilityDenialResult: true,
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
      BpcDisabilityDenialTypeormEntity,
      GetBpcDisabilityDenialWithRelationsQueryResult,
    );
  }
}
