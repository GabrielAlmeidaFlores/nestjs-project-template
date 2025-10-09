import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { LegalPleadingDocumentAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/query/legal-pleading-document-analysis.query.repository.gateway';
import { GetLegalPleadingDocumentAnalysisQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/query/result/get-legal-pleading-document-analysis.query.result';
import { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class LegalPleadingDocumentAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingDocumentAnalysisTypeormEntity>
  implements LegalPleadingDocumentAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    LegalPleadingDocumentAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingDocumentAnalysisTypeormEntity)
    repository: Repository<LegalPleadingDocumentAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByLegalPleadingDocumentAnalysisAndOrganizationIdOrFail(
    id: LegalPleadingDocumentAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentAnalysisQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          legalPleadingDocument: {
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
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      LegalPleadingDocumentAnalysisTypeormEntity,
      GetLegalPleadingDocumentAnalysisQueryResult,
    );

    return mappedData;
  }
}
