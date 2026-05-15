import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { BpcDisabilityGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/bpc-disability-grant.query.repository.gateway';
import { GetBpcDisabilityGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-with-relations.query.result';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class BpcDisabilityGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<BpcDisabilityGrantTypeormEntity>
  implements BpcDisabilityGrantQueryRepositoryGateway
{
  protected readonly _type = BpcDisabilityGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantTypeormEntity)
    repository: Repository<BpcDisabilityGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityGrantWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: bpcDisabilityGrantId.toString(),
          analysisToolRecord: {
            createdBy: { organization: { id: organizationId.toString() } },
          },
        },
        relations: {
          BpcDisabilityGrantFamilyMember: {
            BpcDisabilityGrantFamilyMemberDocument: true,
          },
          BpcDisabilityGrantDocument: true,
          BpcDisabilityGrantInssBenefit: true,
          BpcDisabilityGrantLegalRepresentativeOfAMinor: true,
          BpcDisabilityGrantLegalProceeding: true,
          BpcDisabilityGrantResult: true,
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
      BpcDisabilityGrantTypeormEntity,
      GetBpcDisabilityGrantWithRelationsQueryResult,
    );
  }
}
