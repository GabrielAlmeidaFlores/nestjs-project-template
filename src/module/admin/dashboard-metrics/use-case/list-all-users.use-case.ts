import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { UserItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/user-item.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';

import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';

@Injectable()
export class ListAllUsersUseCase {
  protected readonly _type = ListAllUsersUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<UserItemResponseDto>> {
    const allCustomers = await this.customerQueryRepository.listAll();

    // Apply pagination manually
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    const paginatedCustomers = allCustomers.slice(start, end);

    const users = paginatedCustomers.map((item: GetCustomerQueryResult) =>
      UserItemResponseDto.build({
        id: item.id.toString(),
        name: item.name,
        email: 'N/A', // TODO: Add method to gateway to get customers with auth identity
        phoneNumber: item.phoneNumber.toString(),
        createdAt: item.createdAt,
      }),
    );

    return new ListDataOutputModel({
      page: pagination.page,
      limit: pagination.limit,
      totalItems: allCustomers.length,
      resource: users,
    });
  }
}
