import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { GetLegalPleadingDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document.query.result';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class LegalPleadingDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingDocumentTypeormEntity>
  implements LegalPleadingDocumentQueryRepositoryGateway
{
  protected readonly _type = LegalPleadingDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingDocumentTypeormEntity)
    repository: Repository<LegalPleadingDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByLegalPleadingDocumentAndOrganizationIdOrFail(
    id: LegalPleadingDocumentId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          legalPleading: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              id: organizationId.toString(),
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      LegalPleadingDocumentTypeormEntity,
      GetLegalPleadingDocumentQueryResult,
    );

    return mappedData;
  }
}
