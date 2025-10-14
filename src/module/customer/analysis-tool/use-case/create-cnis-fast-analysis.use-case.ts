import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity';
import { CnisFastAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCnisFastAnalysisUseCase {
  protected readonly _type = CreateCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly cnisFastAnalysisInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(CnisFastAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly cnisFastAnalysisLegalProceedingCommandRepositoryGateway: CnisFastAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (dto.cnisDocument) {
      const validateCnisDocument =
        await this.analysisProcessorGateway.validateCnisDocument(
          dto.cnisDocument.buffer,
        );

      if (validateCnisDocument === false) {
        throw new CnisDocumentIsNotValidError();
      }
    }

    const cnisDocument =
      dto.cnisDocument !== undefined
        ? await this.fileProcessorGateway.uploadFile(dto.cnisDocument)
        : null;

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      cnisDocument,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const cnisFastAnalysisInssBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new AnalysisToolClientInssBenefitEntity({
              inssBenefitNumber: value,
              cnisFastAnalysis,
            });
          })
        : [];

    const cnisFastAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new CnisFastAnalysisLegalProceedingEntity({
              legalProceedingNumber: value,
              cnisFastAnalysis,
            });
          })
        : [];

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationId(
        organizationSessionData.organizationId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS,
      cnisFastAnalysis,
    });

    await this.createOnDatabase(
      cnisFastAnalysis,
      cnisFastAnalysisInssBenefit,
      cnisFastAnalysisLegalProceeding,
      analysisToolRecord,
    );

    return CreateCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId: cnisFastAnalysis.id,
    });
  }

  private async createOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    cnisFastAnalysisInssBenefit: AnalysisToolClientInssBenefitEntity[],
    cnisFastAnalysisLegalProceeding: CnisFastAnalysisLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const cnisFastAnalysisInssBenefitTransaction =
      cnisFastAnalysisInssBenefit.map((value) => {
        return this.cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
          value,
        );
      });

    const cnisFastAnalysisLegalProceedingTransaction =
      cnisFastAnalysisLegalProceeding.map((value) => {
        return this.cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding(
          value,
        );
      });

    const cnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis(
        cnisFastAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      cnisFastAnalysisTransaction,
      ...cnisFastAnalysisInssBenefitTransaction,
      ...cnisFastAnalysisLegalProceedingTransaction,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
