import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { LegalPleadingAddressQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/legal-pleading-address.query.repository.gateway';
import { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class LegalPleadingAddressTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingAddressTypeormEntity>
  implements LegalPleadingAddressQueryRepositoryGateway
{
  protected readonly _type = LegalPleadingAddressTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingAddressTypeormEntity)
    repository: Repository<LegalPleadingAddressTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByLegalPleadingAddressAndOrganizationIdOrFail(
    id: LegalPleadingAddressId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingAddressQueryResult> {
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
      LegalPleadingAddressTypeormEntity,
      GetLegalPleadingAddressQueryResult,
    );

    return mappedData;
  }
}
