import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { GetRegulatoryUpdateStatsResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update-stats.response.dto';
import { RegulatoryUpdatesAccessDeniedError } from '@module/customer/regulatory-update/error/regulatory-updates-access-denied.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetRegulatoryUpdateStatsUseCase {
  protected readonly _type = GetRegulatoryUpdateStatsUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateQueryRepositoryGateway)
    private readonly regulatoryUpdateQueryRepository: RegulatoryUpdateQueryRepositoryGateway,
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetRegulatoryUpdateStatsResponseDto> {
    await this.validateAccess(organizationSessionData.organizationId);

    const [totalUpdates, lastVerifiedAt, allSources] = await Promise.all([
      this.regulatoryUpdateQueryRepository.countAllRegulatoryUpdates(),
      this.regulatoryUpdateQueryRepository.findLastVerifiedAt(),
      this.monitoredSourceQueryRepository.listAllMonitoredSources(),
    ]);

    return GetRegulatoryUpdateStatsResponseDto.build({
      totalUpdates,
      totalMonitoredSources: allSources.length,
      ...(lastVerifiedAt !== null && { lastVerifiedAt }),
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
