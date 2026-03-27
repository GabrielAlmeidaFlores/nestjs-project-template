import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { ListRegulatoryUpdatesQueryParam } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/param/list-regulatory-updates.query.param';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import {
  ListRegulatoryUpdatesResponseDto,
  RegulatoryUpdateItemResponseDto,
} from '@module/customer/regulatory-update/dto/response/list-regulatory-updates.response.dto';
import { RegulatoryUpdatesAccessDeniedError } from '@module/customer/regulatory-update/error/regulatory-updates-access-denied.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListRegulatoryUpdatesUseCase {
  protected readonly _type = ListRegulatoryUpdatesUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateQueryRepositoryGateway)
    private readonly regulatoryUpdateQueryRepository: RegulatoryUpdateQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    param: ListRegulatoryUpdatesQueryParam,
  ): Promise<ListRegulatoryUpdatesResponseDto> {
    await this.validateAccess(organizationSessionData.organizationId);

    const result =
      await this.regulatoryUpdateQueryRepository.listRegulatoryUpdates(param);

    const items = result.resource.map((item) =>
      RegulatoryUpdateItemResponseDto.build({
        regulatoryUpdateId: item.id,
        title: item.title,
        summary: item.summary,
        updatedAt: item.updatedAt,
        ...(item.publishedAt !== null && { publishedAt: item.publishedAt }),
      }),
    );

    return ListRegulatoryUpdatesResponseDto.build({
      items,
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    });
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
