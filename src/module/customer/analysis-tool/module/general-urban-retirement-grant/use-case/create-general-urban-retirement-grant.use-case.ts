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
import { GeneralUrbanRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/command/general-urban-retirement-grant.command.repository.gateway';
import { GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-inss-benefit/command/general-urban-retirement-grant-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-legal-proceeding/command/general-urban-retirement-grant-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';
import { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import { CreateGeneralUrbanRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant.request.dto';
import { CreateGeneralUrbanRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementGrantUseCase {
  protected readonly _type = CreateGeneralUrbanRetirementGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantCommandRepositoryGateway: GeneralUrbanRetirementGrantCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantInssBenefitCommandRepositoryGateway: GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantLegalProceedingCommandRepositoryGateway: GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantResultCommandRepositoryGateway: GeneralUrbanRetirementGrantResultCommandRepositoryGateway,
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
    dto: CreateGeneralUrbanRetirementGrantRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantResponseDto> {
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
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const generalUrbanRetirementGrantResult =
      new GeneralUrbanRetirementGrantResultEntity({
        clientName: analysisToolClientQueryResult.name,
        clientFederalDocument: analysisToolClientQueryResult.federalDocument,
        clientBirthDate: analysisToolClientQueryResult.birthDate,
        clientLastAffiliationDate: null,
        generalUrbanRetirementGrantCompleteAnalysis: null,
        generalUrbanRetirementGrantSimplifiedAnalysis: null,
        generalUrbanRetirementGrantCompleteAnalysisDownload: null,
      });

    const generalUrbanRetirementGrant = new GeneralUrbanRetirementGrantEntity({
      cnisDocument: null,
      analysisName: dto.json.analysisName ?? null,
      generalUrbanRetirementGrantResult,
    });

    const generalUrbanRetirementGrantInssBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new GeneralUrbanRetirementGrantInssBenefitEntity({
              inssBenefitNumber: value,
              generalUrbanRetirementGrant,
            });
          })
        : [];

    const generalUrbanRetirementGrantLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new GeneralUrbanRetirementGrantLegalProceedingEntity({
              legalProceedingNumber: value,
              generalUrbanRetirementGrant,
            });
          })
        : [];

    await this.createOnDatabase(
      generalUrbanRetirementGrant,
      generalUrbanRetirementGrantInssBenefit,
      generalUrbanRetirementGrantLegalProceeding,
      generalUrbanRetirementGrantResult,
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
      type: AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      cnisFastAnalysis: null,
      generalUrbanRetirementGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateGeneralUrbanRetirementGrantResponseDto.build({
      generalUrbanRetirementGrantId: generalUrbanRetirementGrant.id,
    });
  }

  private async createOnDatabase(
    generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity,
    generalUrbanRetirementGrantInssBenefit: GeneralUrbanRetirementGrantInssBenefitEntity[],
    generalUrbanRetirementGrantLegalProceeding: GeneralUrbanRetirementGrantLegalProceedingEntity[],
    generalUrbanRetirementGrantResult: GeneralUrbanRetirementGrantResultEntity,
  ): Promise<void> {
    const inssBenefitTransactions = generalUrbanRetirementGrantInssBenefit.map(
      (value) => {
        return this.generalUrbanRetirementGrantInssBenefitCommandRepositoryGateway.createGeneralUrbanRetirementGrantInssBenefit(
          value,
        );
      },
    );

    const legalProceedingTransactions =
      generalUrbanRetirementGrantLegalProceeding.map((value) => {
        return this.generalUrbanRetirementGrantLegalProceedingCommandRepositoryGateway.createGeneralUrbanRetirementGrantLegalProceeding(
          value,
        );
      });

    const resultTransaction =
      this.generalUrbanRetirementGrantResultCommandRepositoryGateway.createGeneralUrbanRetirementGrantResult(
        generalUrbanRetirementGrantResult,
      );
    const grantTransaction =
      this.generalUrbanRetirementGrantCommandRepositoryGateway.createGeneralUrbanRetirementGrant(
        generalUrbanRetirementGrant,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      resultTransaction,
      grantTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ]);

    await transactions.commit();
  }

  private async createAnalysisToolRecordOnDatabase(
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
