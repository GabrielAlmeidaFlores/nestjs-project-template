import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

@Injectable()
export class OrganizationTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationTypeormEntity>
  implements OrganizationQueryRepositoryGateway
{
  protected readonly _type = OrganizationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationTypeormEntity)
    repository: Repository<OrganizationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationsByCustomerId(
    customerId: CustomerId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationQueryResult>> {
    const data = await this.list(listData, {
      where: {
        organizationMember: {
          customer: {
            id: customerId.toString(),
          },
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationTypeormEntity,
      GetOrganizationQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOneByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: organizationId.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      OrganizationTypeormEntity,
      GetOrganizationQueryResult,
    );

    return mappedData;
  }

  public async listAll(): Promise<Array<GetOrganizationQueryResult>> {
    const data = await this.find({});

    const mappedData = this.mapperGateway.mapArray(
      data,
      OrganizationTypeormEntity,
      GetOrganizationQueryResult,
    );

    return mappedData;
  }

  public async listAllPaginated(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationQueryResult>> {
    const data = await this.list(listData);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationTypeormEntity,
      GetOrganizationQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationQueryResult>({
      ...data,
      resource: mappedData,
    });
  }
}
