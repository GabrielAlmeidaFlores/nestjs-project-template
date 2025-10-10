import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { LegalPleadingResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/legal-pleading-result.query.repository.gateway';
import { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class LegalPleadingResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingResultTypeormEntity>
  implements LegalPleadingResultQueryRepositoryGateway
{
  protected readonly _type = LegalPleadingResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingResultTypeormEntity)
    repository: Repository<LegalPleadingResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByLegalPleadingResultIdAndOrganizationIdOrFail(
    id: LegalPleadingResultId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingResultQueryResult> {
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
      LegalPleadingResultTypeormEntity,
      GetLegalPleadingResultQueryResult,
    );

    return mappedData;
  }
}
