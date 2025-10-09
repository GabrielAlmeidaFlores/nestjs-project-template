import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';

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
            id: organizationId.toString(),
          },
        },
        relations: {
          legalPleadingAddress: true,
          legalPleadingDocument: true,
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
}
