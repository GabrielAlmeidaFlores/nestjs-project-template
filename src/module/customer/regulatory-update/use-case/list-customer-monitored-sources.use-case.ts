import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import {
  CustomerMonitoredSourceItemResponseDto,
  ListCustomerMonitoredSourcesResponseDto,
} from '@module/customer/regulatory-update/dto/response/list-customer-monitored-sources.response.dto';
import { RegulatoryUpdatesAccessDeniedError } from '@module/customer/regulatory-update/error/regulatory-updates-access-denied.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListCustomerMonitoredSourcesUseCase {
  protected readonly _type = ListCustomerMonitoredSourcesUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ListCustomerMonitoredSourcesResponseDto> {
    await this.validateAccess(organizationSessionData.organizationId);

    const sources =
      await this.monitoredSourceQueryRepository.listAllMonitoredSources();

    const resource = sources.map((source) =>
      CustomerMonitoredSourceItemResponseDto.build({
        name: source.name,
        url: source.url,
        active: source.active,
      }),
    );

    return ListCustomerMonitoredSourcesResponseDto.build({ resource });
  }

  private async validateAccess(organizationId: OrganizationId): Promise<void> {
    const planStatus =
      await this.validateOrganizationPaymentPlanStatusUseCase.execute(
        organizationId,
      );

    const hasAccess = planStatus.enabledPaidResources.some(
      (resource) =>
        resource.resource ===
        PaymentPlanPaidResourceTypeEnum.REGULATORY_UPDATES,
    );

    if (!hasAccess) {
      throw new RegulatoryUpdatesAccessDeniedError();
    }
  }
}
