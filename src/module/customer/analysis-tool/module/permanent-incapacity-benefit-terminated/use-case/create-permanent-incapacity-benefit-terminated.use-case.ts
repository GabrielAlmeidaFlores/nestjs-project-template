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
import { PermanentIncapacityBenefitTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/command/permanent-incapacity-benefit-terminated.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-inss-benefit/command/permanent-incapacity-benefit-terminated-inss-benefit.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import { PermanentIncapacityBenefitTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity';
import { CreatePermanentIncapacityBenefitTerminatedRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedCommandRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway,
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
    dto: CreatePermanentIncapacityBenefitTerminatedRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedResponseDto> {
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

    const permanentIncapacityBenefitTerminated =
      new PermanentIncapacityBenefitTerminatedEntity({
        analysisName: dto.analysisName ?? null,
        benefitTerminationDate: dto.benefitTerminationDate ?? null,
        category: dto.category ?? null,
        terminationReason: dto.terminationReason ?? null,
        terminationReasonDescription: dto.terminationReasonDescription ?? null,
      });

    const inssBenefitEntities = (dto.inssBenefitNumber ?? []).map(
      (inssBenefit) =>
        new PermanentIncapacityBenefitTerminatedInssBenefitEntity({
          inssBenefit,
          permanentIncapacityBenefitTerminatedId:
            permanentIncapacityBenefitTerminated.id,
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
      type: AnalysisToolRecordTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED,
      cnisFastAnalysis: null,
      permanentIncapacityBenefitTerminated,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      permanentIncapacityBenefitTerminated,
      inssBenefitEntities,
      analysisToolRecord,
    );

    return CreatePermanentIncapacityBenefitTerminatedResponseDto.build({
      permanentIncapacityBenefitTerminatedId:
        permanentIncapacityBenefitTerminated.id,
    });
  }

  private async createOnDatabase(
    permanentIncapacityBenefitTerminated: PermanentIncapacityBenefitTerminatedEntity,
    inssBenefitEntities: PermanentIncapacityBenefitTerminatedInssBenefitEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const terminationTransaction =
      this.permanentIncapacityBenefitTerminatedCommandRepositoryGateway.createPermanentIncapacityBenefitTerminated(
        permanentIncapacityBenefitTerminated,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.permanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedInssBenefit(
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
