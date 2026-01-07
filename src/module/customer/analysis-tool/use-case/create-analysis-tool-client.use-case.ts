import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { AnalysisToolClientEmailAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-email-already-in-use.error';
import { AnalysisToolClientFederalDocumentAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-federal-document-already-in-use.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAnalysisToolClientUseCase {
  protected readonly _type = CreateAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly analysisToolClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly analysisToolClientInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateAnalysisToolClientRequestDto,
  ): Promise<CreateAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (dto.email) {
      const verifyConstraint =
        await this.analysisToolClientQueryRepositoryGateway.findOneByEmailAndOrganizationId(
          dto.email,
          organizationSessionData.organizationId,
        );

      if (verifyConstraint) {
        throw new AnalysisToolClientEmailAlreadyInUseError();
      }
    }

    if (dto.federalDocument) {
      const verifyConstraint =
        await this.analysisToolClientQueryRepositoryGateway.findOneByFederalDocumentAndOrganizationId(
          dto.federalDocument,
          organizationSessionData.organizationId,
        );

      if (verifyConstraint) {
        throw new AnalysisToolClientFederalDocumentAlreadyInUseError();
      }
    }

    const analysisToolClient = new AnalysisToolClientEntity({
      ...dto,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const analysisToolClientInssBenefit =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map((value) => {
            return new AnalysisToolClientInssBenefitEntity({
              inssBenefitNumber: value,
              analysisToolClient,
            });
          })
        : [];

    const analysisToolClientLegalProceeding =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map((value) => {
            return new AnalysisToolClientLegalProceedingEntity({
              legalProceedingNumber: value,
              analysisToolClient,
            });
          })
        : [];

    const analysisToolClientTransaction =
      this.analysisToolClientCommandRepositoryGateway.createAnalysisToolClient(
        analysisToolClient,
      );

    const analysisToolClientInssBenefitTransaction =
      analysisToolClientInssBenefit.map((entity) => {
        return this.analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
          entity,
        );
      });

    const analysisToolClientLegalProceedingTransaction =
      analysisToolClientLegalProceeding.map((entity) => {
        return this.analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding(
          entity,
        );
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolClientTransaction,
      ...analysisToolClientInssBenefitTransaction,
      ...analysisToolClientLegalProceedingTransaction,
    ]);
    await transaction.commit();

    return CreateAnalysisToolClientResponseDto.build({
      analysisToolClientId: analysisToolClient.id,
    });
  }
}
