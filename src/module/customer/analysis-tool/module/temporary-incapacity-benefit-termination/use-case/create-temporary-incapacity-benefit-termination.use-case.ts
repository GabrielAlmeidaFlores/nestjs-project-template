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
import { TemporaryIncapacityBenefitTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/command/temporary-incapacity-benefit-termination.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-inss-benefit/command/temporary-incapacity-benefit-termination-inss-benefit.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit.entity';
import { CreateTemporaryIncapacityBenefitTerminationRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/create-temporary-incapacity-benefit-termination.request.dto';
import { CreateTemporaryIncapacityBenefitTerminationResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitTerminationUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitTerminationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway,
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
    dto: CreateTemporaryIncapacityBenefitTerminationRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationResponseDto> {
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

    const temporaryIncapacityBenefitTermination =
      new TemporaryIncapacityBenefitTerminationEntity({
        analysisName: dto.analysisName ?? null,
        benefitTerminationDate: dto.benefitTerminationDate ?? null,
        category: dto.category ?? null,
        terminationReason: dto.terminationReason ?? null,
        terminationReasonDescription: dto.terminationReasonDescription ?? null,
      });

    const inssBenefitEntities = (dto.inssBenefitNumber ?? []).map(
      (inssBenefit) =>
        new TemporaryIncapacityBenefitTerminationInssBenefitEntity({
          inssBenefit,
          temporaryIncapacityBenefitTerminationId:
            temporaryIncapacityBenefitTermination.id,
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
      type: AnalysisToolRecordTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION,
      cnisFastAnalysis: null,
      temporaryIncapacityBenefitTermination,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      temporaryIncapacityBenefitTermination,
      inssBenefitEntities,
      analysisToolRecord,
    );

    return CreateTemporaryIncapacityBenefitTerminationResponseDto.build({
      temporaryIncapacityBenefitTerminationId:
        temporaryIncapacityBenefitTermination.id,
    });
  }

  private async createOnDatabase(
    temporaryIncapacityBenefitTermination: TemporaryIncapacityBenefitTerminationEntity,
    inssBenefitEntities: TemporaryIncapacityBenefitTerminationInssBenefitEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const terminationTransaction =
      this.temporaryIncapacityBenefitTerminationCommandRepositoryGateway.createTemporaryIncapacityBenefitTermination(
        temporaryIncapacityBenefitTermination,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.temporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationInssBenefit(
        entity,
      ),
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      terminationTransaction,
      ...inssBenefitTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
