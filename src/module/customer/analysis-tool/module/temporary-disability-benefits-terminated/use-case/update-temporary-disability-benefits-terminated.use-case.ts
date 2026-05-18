import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/command/temporary-disability-benefits-terminated.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-inss-benefit/command/temporary-disability-benefits-terminated-inss-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity';
import { UpdateTemporaryDisabilityBenefitsTerminatedRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated.response.dto';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsTerminatedUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: UpdateTemporaryDisabilityBenefitsTerminatedRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryDisabilityBenefitsTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const existingResult =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const analysisToolClientId =
      dto.analysisToolClientId ??
      analysisToolRecordQueryResult.analysisToolClient.id;

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const temporaryDisabilityBenefitsTerminated =
      new TemporaryDisabilityBenefitsTerminatedEntity({
        id: temporaryDisabilityBenefitsTerminatedId,
        createdAt: existingResult.createdAt,
        updatedAt: existingResult.updatedAt,
        analysisName: dto.analysisName ?? existingResult.analysisName,
        requestEntryDate:
          dto.requestEntryDate ?? existingResult.requestEntryDate,
        benefitCessationDate:
          dto.benefitCessationDate ?? existingResult.benefitCessationDate,
        category: dto.category ?? existingResult.category,
        myInssPassword: dto.myInssPassword ?? existingResult.myInssPassword,
        benefitCessationReason:
          dto.benefitCessationReason ?? existingResult.benefitCessationReason,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient,
      temporaryDisabilityBenefitsTerminated,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateRejectionTransaction =
      this.temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway.updateTemporaryDisabilityBenefitsTerminated(
        temporaryDisabilityBenefitsTerminatedId,
        temporaryDisabilityBenefitsTerminated,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions =
      dto.inssBenefitNumber !== undefined
        ? this.buildInssBenefitUpdateTransactions(
            temporaryDisabilityBenefitsTerminatedId,
            dto.inssBenefitNumber,
          )
        : [];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateRejectionTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();

    return UpdateTemporaryDisabilityBenefitsTerminatedResponseDto.build({
      temporaryDisabilityBenefitsTerminatedId,
    });
  }

  private buildInssBenefitUpdateTransactions(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    inssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.temporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      );

    const createTransactions = inssBenefitNumbers.map((inssBenefit) =>
      this.temporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedInssBenefit(
        new TemporaryDisabilityBenefitsTerminatedInssBenefitEntity({
          inssBenefit,
          temporaryDisabilityBenefitsTerminatedId,
        }),
      ),
    );

    return [deleteTransaction, ...createTransactions];
  }
}
