import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';
import { GetRegulatoryUpdateResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update.response.dto';
import { RegulatoryUpdateNotFoundError } from '@module/customer/regulatory-update/error/regulatory-update-not-found.error';
import { RegulatoryUpdatesAccessDeniedError } from '@module/customer/regulatory-update/error/regulatory-updates-access-denied.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetRegulatoryUpdateUseCase {
  protected readonly _type = GetRegulatoryUpdateUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateQueryRepositoryGateway)
    private readonly regulatoryUpdateQueryRepository: RegulatoryUpdateQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    regulatoryUpdateId: RegulatoryUpdateId,
  ): Promise<GetRegulatoryUpdateResponseDto> {
    await this.validateAccess(organizationSessionData.organizationId);

    const result =
      await this.regulatoryUpdateQueryRepository.findOneRegulatoryUpdateById(
        regulatoryUpdateId,
      );

    if (!result) {
      throw new RegulatoryUpdateNotFoundError();
    }

    return GetRegulatoryUpdateResponseDto.build({
      regulatoryUpdateId: result.id,
      title: result.title,
      summary: result.summary,
      mainChanges: result.mainChanges,
      implementationStatus: result.implementationStatus,
      beneficiaryImpact: result.beneficiaryImpact,
      fullText: result.fullText,
      updatedAt: result.updatedAt,
      ...(result.legalIdentifier !== null && {
        legalIdentifier: result.legalIdentifier,
      }),
      ...(result.sourceUrl !== null && { sourceUrl: result.sourceUrl }),
      ...(result.publishedAt !== null && { publishedAt: result.publishedAt }),
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
