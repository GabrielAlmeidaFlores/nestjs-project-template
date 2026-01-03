import { Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetBankPaymentResponseDto } from '@module/customer/analysis-tool/dto/response/get-bank-payment.response.dto';
import { PaginatedBankPaymentsResponseDto } from '@module/customer/analysis-tool/dto/response/paginated-bank-payments.response.dto';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListBankPaymentsByOrganizationPaymentPlanUseCase {
  protected readonly _type =
    ListBankPaymentsByOrganizationPaymentPlanUseCase.name;

  public constructor(
    private readonly organizationPaymentPlanQueryRepositoryGateway: OrganizationPaymentPlanQueryRepositoryGateway,
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<PaginatedBankPaymentsResponseDto> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepositoryGateway.findOneByOrganizationId(
        organizationSessionData.organizationId,
      );

    if (!organizationPaymentPlan) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    const listDataInputModel = new ListDataInputModel(dto);

    const bankPaymentsListDataOutputModel =
      await this.bankPaymentQueryRepository.listBankPaymentByOrganizationPaymentPlanId(
        organizationPaymentPlan.id,
        listDataInputModel,
      );

    const resource = bankPaymentsListDataOutputModel.resource.map((item) => {
      return GetBankPaymentResponseDto.build({
        ...item,
      });
    });

    return PaginatedBankPaymentsResponseDto.build({
      ...bankPaymentsListDataOutputModel,
      resource,
    });
  }
}
