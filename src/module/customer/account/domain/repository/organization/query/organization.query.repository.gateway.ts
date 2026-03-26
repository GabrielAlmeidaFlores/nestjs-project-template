import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export abstract class OrganizationQueryRepositoryGateway {
  public abstract findOneByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationQueryResult | null>;

  public abstract listOrganizationsByCustomerId(
    customerId: CustomerId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationQueryResult>>;

  public abstract listAllPaginated(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationQueryResult>>;

  public abstract listAll(): Promise<Array<GetOrganizationQueryResult>>;
}
