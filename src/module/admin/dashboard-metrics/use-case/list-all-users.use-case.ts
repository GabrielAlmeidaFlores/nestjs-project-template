import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { ListUsersResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-users.response.dto';
import { UserItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/user-item.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';

import type { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';

@Injectable()
export class ListAllUsersUseCase {
  protected readonly _type = ListAllUsersUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListUsersResponseDto> {
    const allCustomers =
      await this.customerQueryRepository.listAllCustomersWithAuthIdentity();

    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    const paginatedCustomers = allCustomers.slice(start, end);

    const users = paginatedCustomers.map(
      (item: GetCustomerWithAuthIdentityRelationQueryResult) =>
        UserItemResponseDto.build({
          customerId: item.id,
          name: item.name,
          email: item.authIdentity.email,
          phoneNumber: item.phoneNumber,
          createdAt: item.createdAt,
        }),
    );

    const listDataOutput = new ListDataOutputModel({
      page: pagination.page,
      limit: pagination.limit,
      totalItems: allCustomers.length,
      resource: users,
    });

    return ListUsersResponseDto.build({
      page: listDataOutput.page,
      limit: listDataOutput.limit,
      totalItems: listDataOutput.totalItems,
      totalPages: listDataOutput.totalPages,
      amountItemsCurrentPage: listDataOutput.amountItemsCurrentPage,
      resource: listDataOutput.resource,
    });
  }
}
