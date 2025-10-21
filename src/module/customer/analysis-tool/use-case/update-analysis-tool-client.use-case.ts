import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateAnalysisToolClientUseCase {
  protected readonly _type = UpdateAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly analysisToolClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: UpdateAnalysisToolClientRequestDto,
    analysisToolClientId: AnalysisToolClientId,
    sessionData: SessionDataModel,
    organizationSessionDataModel: OrganizationSessionDataModel,
  ): Promise<UpdateAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionDataModel.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const client =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionDataModel.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const updateClient = await this.updateAnalysisToolClientOnDatabase(
      client,
      dto,
      organizationMember,
    );

    return UpdateAnalysisToolClientResponseDto.build({
      analysisToolClient: updateClient.id,
    });
  }

  private async updateAnalysisToolClientOnDatabase(
    client: GetAnalysisToolClientWithRelationsQueryResult,
    dto: UpdateAnalysisToolClientRequestDto,
    organizationMember: GetOrganizationMemberQueryResult,
  ): Promise<AnalysisToolClientEntity> {
    const updatedClient = new AnalysisToolClientEntity({
      id: client.id,
      name: dto.name ?? client.name,
      gender: dto.gender ?? client.gender,
      birthDate: dto.birthDate ?? client.birthDate,
      federalDocument: dto.federalDocument ?? client.federalDocument,
      email: dto.email ?? client.email,
      phoneNumber: dto.phoneNumber ?? client.phoneNumber,
      clientType: dto.clientType ?? client.clientType,
      createdAt: client.createdAt,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient(
        updatedClient.id,
        updatedClient,
      ),
    );

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executeTransactions.commit();

    return updatedClient;
  }
}
