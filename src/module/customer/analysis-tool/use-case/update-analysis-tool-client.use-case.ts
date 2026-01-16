import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { AnalysisToolClientFederalDocumentAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-federal-document-already-in-use.error';
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
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly analysisToolClientInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: UpdateAnalysisToolClientRequestDto,
  ): Promise<UpdateAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const client =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    if (dto.federalDocument) {
      const verifyConstraint =
        await this.analysisToolClientQueryRepositoryGateway.findOneByFederalDocumentAndOrganizationId(
          dto.federalDocument,
          organizationSessionData.organizationId,
        );

      if (verifyConstraint && !verifyConstraint.id.equals(client.id)) {
        throw new AnalysisToolClientFederalDocumentAlreadyInUseError();
      }
    }

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
    analysisToolClientQueryResult: GetAnalysisToolClientWithRelationsQueryResult,
    dto: UpdateAnalysisToolClientRequestDto,
    organizationMember: GetOrganizationMemberQueryResult,
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolClient = new AnalysisToolClientEntity({
      id: analysisToolClientQueryResult.id,
      name: dto.name ?? analysisToolClientQueryResult.name,
      gender: dto.gender ?? analysisToolClientQueryResult.gender,
      birthDate: dto.birthDate ?? analysisToolClientQueryResult.birthDate,
      federalDocument:
        dto.federalDocument ?? analysisToolClientQueryResult.federalDocument,
      email: dto.email ?? analysisToolClientQueryResult.email,
      corporateEmail:
        dto.corporateEmail ?? analysisToolClientQueryResult.corporateEmail,
      phoneNumber: dto.phoneNumber ?? analysisToolClientQueryResult.phoneNumber,
      clientType: dto.clientType ?? analysisToolClientQueryResult.clientType,
      createdAt: analysisToolClientQueryResult.createdAt,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient(
        analysisToolClient.id,
        analysisToolClient,
      ),
    );

    if (dto.inssBenefitNumber) {
      const newAnalysisToolClientInssBenefit = dto.inssBenefitNumber.map(
        (value) => {
          return new AnalysisToolClientInssBenefitEntity({
            inssBenefitNumber: value,
            analysisToolClient,
          });
        },
      );

      const createNewAnalysisToolClientInssBenefitTransaction =
        newAnalysisToolClientInssBenefit.map((entity) => {
          return this.analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
            entity,
          );
        });

      const deleteOldAnalysisToolClientInssBenefitTransaction =
        analysisToolClientQueryResult.analysisToolClientInssBenefit.map(
          (entity) => {
            return this.analysisToolClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit(
              entity.id,
            );
          },
        );

      transactions.push(...createNewAnalysisToolClientInssBenefitTransaction);
      transactions.push(...deleteOldAnalysisToolClientInssBenefitTransaction);
    }

    if (dto.legalProceedingNumber) {
      const newAnalysisToolClientLegalProceeding =
        dto.legalProceedingNumber.map((value) => {
          return new AnalysisToolClientLegalProceedingEntity({
            legalProceedingNumber: value,
            analysisToolClient,
          });
        });

      const createNewAnalysisToolClientLegalProceedingTransaction =
        newAnalysisToolClientLegalProceeding.map((entity) => {
          return this.analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding(
            entity,
          );
        });

      const deleteOldAnalysisToolClientLegalProceedingTransaction =
        analysisToolClientQueryResult.analysisToolClientLegalProceeding.map(
          (entity) => {
            return this.analysisToolClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding(
              entity.id,
            );
          },
        );

      transactions.push(
        ...createNewAnalysisToolClientLegalProceedingTransaction,
      );
      transactions.push(
        ...deleteOldAnalysisToolClientLegalProceedingTransaction,
      );
    }

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executeTransactions.commit();

    return analysisToolClient;
  }
}
