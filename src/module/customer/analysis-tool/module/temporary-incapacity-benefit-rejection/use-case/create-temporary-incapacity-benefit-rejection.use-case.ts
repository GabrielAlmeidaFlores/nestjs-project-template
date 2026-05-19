import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryIncapacityBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/command/temporary-incapacity-benefit-rejection.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-inss-benefit/command/temporary-incapacity-benefit-rejection-inss-benefit.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.entity';
import { CreateTemporaryIncapacityBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway,
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
    dto: CreateTemporaryIncapacityBenefitRejectionRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const temporaryIncapacityBenefitRejection =
      new TemporaryIncapacityBenefitRejectionEntity({
        analysisName: dto.analysisName ?? null,
        requestEntryDate: dto.requestEntryDate ?? null,
        denialDate: dto.denialDate ?? null,
        requestedBenefitType: dto.requestedBenefitType ?? null,
        category: dto.category ?? null,
        denialReason: dto.denialReason ?? null,
        denialReasonDescription: dto.denialReasonDescription ?? null,
        condition: dto.condition ?? null,
        conditionDescription: dto.conditionDescription ?? null,
      });

    const inssBenefitEntities = (dto.inssBenefitNumber ?? []).map(
      (inssBenefit) =>
        new TemporaryIncapacityBenefitRejectionInssBenefitEntity({
          inssBenefit,
          temporaryIncapacityBenefitRejectionId:
            temporaryIncapacityBenefitRejection.id,
        }),
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION,
      cnisFastAnalysis: null,
      temporaryIncapacityBenefitRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      temporaryIncapacityBenefitRejection,
      inssBenefitEntities,
      analysisToolRecord,
    );

    return CreateTemporaryIncapacityBenefitRejectionResponseDto.build({
      temporaryIncapacityBenefitRejectionId:
        temporaryIncapacityBenefitRejection.id,
    });
  }

  private async createOnDatabase(
    temporaryIncapacityBenefitRejection: TemporaryIncapacityBenefitRejectionEntity,
    inssBenefitEntities: TemporaryIncapacityBenefitRejectionInssBenefitEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const rejectionTransaction =
      this.temporaryIncapacityBenefitRejectionCommandRepositoryGateway.createTemporaryIncapacityBenefitRejection(
        temporaryIncapacityBenefitRejection,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.temporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionInssBenefit(
        entity,
      ),
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      rejectionTransaction,
      ...inssBenefitTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
