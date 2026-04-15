import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/command/general-urban-retirement-denial.command.repository.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { UpdateGeneralUrbanRetirementDenialRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/update-general-urban-retirement-denial.request.dto';
import { UpdateGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/update-general-urban-retirement-denial.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateGeneralUrbanRetirementDenialUseCase {
  protected readonly _type = UpdateGeneralUrbanRetirementDenialUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialCommandRepositoryGateway: GeneralUrbanRetirementDenialCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
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
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: UpdateGeneralUrbanRetirementDenialRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementDenialResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const generalUrbanRetirementDenialQueryResult =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
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

    const generalUrbanRetirementDenial = new GeneralUrbanRetirementDenialEntity(
      {
        id: generalUrbanRetirementDenialId,
        createdAt: generalUrbanRetirementDenialQueryResult.createdAt,
        updatedAt: generalUrbanRetirementDenialQueryResult.updatedAt,
        deletedAt: generalUrbanRetirementDenialQueryResult.deletedAt,
        analysisName:
          dto.analysisName ??
          generalUrbanRetirementDenialQueryResult.analysisName,
        requestEntryDate:
          dto.requestEntryDate ??
          generalUrbanRetirementDenialQueryResult.requestEntryDate,
        denialDate:
          dto.denialDate ?? generalUrbanRetirementDenialQueryResult.denialDate,
        generalUrbanRetirementDenialResultId:
          generalUrbanRetirementDenialQueryResult
            .generalUrbanRetirementDenialResult?.id ?? null,
      },
    );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient,
      generalUrbanRetirementDenial,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateDenialTransaction =
      this.generalUrbanRetirementDenialCommandRepositoryGateway.updateGeneralUrbanRetirementDenial(
        generalUrbanRetirementDenialId,
        generalUrbanRetirementDenial,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateDenialTransaction,
      updateAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    return UpdateGeneralUrbanRetirementDenialResponseDto.build({
      generalUrbanRetirementDenialId,
    });
  }
}
