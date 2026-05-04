import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { GetBpcElderlyCessationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-with-relations.query.result';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class BpcElderlyCessationTypeormQueryRepository
  extends BaseTypeormQueryRepository<BpcElderlyCessationTypeormEntity>
  implements BpcElderlyCessationQueryRepositoryGateway
{
  protected readonly _type = BpcElderlyCessationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationTypeormEntity)
    repository: Repository<BpcElderlyCessationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
    bpcElderlyCessationId: BpcElderlyCessationId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcElderlyCessationWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: bpcElderlyCessationId.toString(),
          analysisToolRecord: {
            createdBy: { organization: { id: organizationId.toString() } },
          },
        },
        relations: {
          bpcElderlyCessationFamilyMember: {
            bpcElderlyCessationFamilyMemberDocument: true,
          },
          bpcElderlyCessationDocument: true,
          bpcElderlyCessationInssBenefit: true,
          bpcElderlyCessationLegalProceeding: true,
          bpcElderlyCessationResult: true,
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
      BpcElderlyCessationTypeormEntity,
      GetBpcElderlyCessationWithRelationsQueryResult,
    );
  }
}
