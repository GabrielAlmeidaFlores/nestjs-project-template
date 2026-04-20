import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MaternityPayGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-earnings-history/command/maternity-pay-grant-earnings-history.command.repository.gateway';
import { MaternityPayGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/command/maternity-pay-grant-period.command.repository.gateway';
import { MaternityPayGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/maternity-pay-grant-period.query.repository.gateway';
import { MaternityPayGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period-document/command/maternity-pay-grant-period-document.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { DeleteMaternityPayGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/delete-maternity-pay-grant-period.response.dto';
import { MaternityPayGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteMaternityPayGrantPeriodUseCase {
  protected readonly _type = DeleteMaternityPayGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MaternityPayGrantPeriodQueryRepositoryGateway)
    private readonly maternityPayGrantPeriodQueryRepositoryGateway: MaternityPayGrantPeriodQueryRepositoryGateway,
    @Inject(MaternityPayGrantPeriodCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodCommandRepositoryGateway: MaternityPayGrantPeriodCommandRepositoryGateway,
    @Inject(MaternityPayGrantPeriodDocumentCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodDocumentCommandRepositoryGateway: MaternityPayGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(MaternityPayGrantEarningsHistoryCommandRepositoryGateway)
    private readonly maternityPayGrantEarningsHistoryCommandRepositoryGateway: MaternityPayGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): Promise<DeleteMaternityPayGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPeriod =
      await this.maternityPayGrantPeriodQueryRepositoryGateway.findOneByMaternityPayGrantPeriodIdOrFail(
        maternityPayGrantPeriodId,
        MaternityPayGrantPeriodNotFoundError,
      );

    const deletedPeriod = new MaternityPayGrantPeriodEntity({
      id: maternityPayGrantPeriodId,
      startDate: existingPeriod.startDate,
      endDate: existingPeriod.endDate,
      category: existingPeriod.category,
      isPendency: existingPeriod.isPendency,
      competenceBelowTheMinimum: existingPeriod.competenceBelowTheMinimum,
      pendencyReason: existingPeriod.pendencyReason,
      typeOfContribution: existingPeriod.typeOfContribution,
      status: existingPeriod.status,
      periodConsideration: existingPeriod.periodConsideration,
      contributionAverage: existingPeriod.contributionAverage,
      bondOrigin: existingPeriod.bondOrigin,
      complementViaMyInss: existingPeriod.complementViaMyInss,
      maternityPayGrantId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.maternityPayGrantPeriodDocumentCommandRepositoryGateway.deleteAllByMaternityPayGrantPeriodId(
        maternityPayGrantPeriodId,
      ),
      this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.deleteAllByMaternityPayGrantPeriodId(
        maternityPayGrantPeriodId,
      ),
      this.maternityPayGrantPeriodCommandRepositoryGateway.updateMaternityPayGrantPeriod(
        maternityPayGrantPeriodId,
        deletedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteMaternityPayGrantPeriodResponseDto.build({
      maternityPayGrantId,
    });
  }
}
