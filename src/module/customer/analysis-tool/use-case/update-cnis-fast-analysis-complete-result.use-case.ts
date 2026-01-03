import { UpdateCnisFastAnalysisCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis-complete-analysis.request.dto';
import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateCnisFastAnalysisCompleteAnalysisUseCase {
  protected readonly _type = UpdateCnisFastAnalysisCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,

    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,

    @Inject(CnisFastAnalysisResultCommandRepositoryGateway)
    private readonly cnisFastAnalysisResultCommandRepositoryGateway: CnisFastAnalysisResultCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
    dto: UpdateCnisFastAnalysisCompleteAnalysisRequestDto,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnis =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    if (cnis.cnisFastAnalysisResult?.id === undefined) {
      throw new CnisFastAnalysisNotFoundError();
    }

    const resultEntity = new CnisFastAnalysisResultEntity({
      id: new CnisFastAnalysisResultId(
        cnis.cnisFastAnalysisResult?.id.toString(),
      ),
      cnisCompleteAnalysis: dto.cnisCompleteAnalysis,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult(
        resultEntity.id,
        resultEntity,
      ),
    );

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executeTransactions.commit();

    return UpdateCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId: new CnisFastAnalysisId(cnisFastAnalysisId.toString()),
    });
  }
}
