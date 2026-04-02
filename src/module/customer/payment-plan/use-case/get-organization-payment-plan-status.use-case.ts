import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { ValidateOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/validate-organization-payment-plan-status.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetOrganizationPaymentPlanStatusUseCase {
  protected readonly _type = GetOrganizationPaymentPlanStatusUseCase.name;

  public constructor(
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCase,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto> {
    const [response, activeMemberCount] = await Promise.all([
      this.validateOrganizationPaymentPlanStatusUseCase.execute(
        organizationSessionData.organizationId,
      ),
      this.organizationMemberQueryRepositoryGateway.countActiveCollaboratorsByOrganizationId(
        organizationSessionData.organizationId,
      ),
    ]);

    return ValidateOrganizationPaymentPlanStatusResponseDto.build({
      isActive: response.isActive,
      planName: response.planName,
      planDescription: response.planDescription,
      planPrice: response.planPrice,
      paymentPlanCycle: response.paymentPlanCycle,
      maxMemberCount: response.maxMemberCount,
      monthlyCreditAmount: response.monthlyCreditAmount,
      hasOverduePayments: response.hasOverduePayments,
      overduePaymentsCount: response.overduePaymentsCount,
      enabledPaidResources: response.enabledPaidResources,
      canceled: response.canceled,
      activeMemberCount,
      ...(response.lastPaymentStatus !== undefined && {
        lastPaymentStatus: response.lastPaymentStatus,
      }),
      ...(response.lastPaymentDate !== undefined && {
        lastPaymentDate: response.lastPaymentDate,
      }),
      ...(response.nextDueDate !== undefined && {
        nextDueDate: response.nextDueDate,
      }),
      ...(response.accessionDate !== undefined && {
        accessionDate: response.accessionDate,
      }),
      ...(response.paymentMethod !== undefined && {
        paymentMethod: response.paymentMethod,
      }),
    });
  }
}
