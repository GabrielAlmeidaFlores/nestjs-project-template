import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationResponseDto } from '@module/customer/account/dto/response/get-organization.response.dto';
import { ListCustomerOrganizationsResponseDto } from '@module/customer/account/dto/response/list-customer-organizations.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListCustomerOrganizationsUseCase {
  protected readonly _type = ListCustomerOrganizationsUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListCustomerOrganizationsResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const organizations =
      await this.organizationQueryRepositoryGateway.listOrganizationsByCustomerId(
        customer.id,
        new ListDataInputModel(dto),
      );

    const resourcePromise = organizations.resource.map(async (data) => {
      const mappedData = GetOrganizationResponseDto.build({
        organizationId: data.id,
        organizationName: data.name,
      });

      if (data.organizationLogo !== null) {
        const organizationLogoUrl =
          await this.fileProcessorGateway.getOrganizationLogo(
            data.organizationLogo,
          );

        mappedData.organizationLogo = organizationLogoUrl.toString();
      }

      return mappedData;
    });

    const resource = await Promise.all(resourcePromise);

    return ListCustomerOrganizationsResponseDto.build({
      ...organizations,
      resource,
    });
  }
}
