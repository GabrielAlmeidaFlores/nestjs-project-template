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
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/command/special-activity.command.repository.gateway';
import { SpecialActivityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-document/command/special-activity-document.command.repository.gateway';
import { SpecialActivityInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/command/special-activity-inss-benefit.command.repository.gateway';
import { SpecialActivityLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/command/special-activity-legal-proceeding.command.repository.gateway';
import { CreateSpecialActivityRequestDto } from '@module/customer/analysis-tool/module/special-activity/dto/request/create-special-activity.request.dto';
import { CreateSpecialActivityResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/create-special-activity.response.dto';
import { SpecialActivityAtLeastOnePppRequiredError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-at-least-one-ppp-required.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateSpecialActivityUseCase {
  protected readonly _type = CreateSpecialActivityUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialActivityCommandRepositoryGateway)
    private readonly specialActivityCommandRepositoryGateway: SpecialActivityCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(SpecialActivityDocumentCommandRepositoryGateway)
    private readonly specialActivityDocumentCommandRepositoryGateway: SpecialActivityDocumentCommandRepositoryGateway,
    @Inject(SpecialActivityInssBenefitCommandRepositoryGateway)
    private readonly specialActivityInssBenefitCommandRepositoryGateway: SpecialActivityInssBenefitCommandRepositoryGateway,
    @Inject(SpecialActivityLegalProceedingCommandRepositoryGateway)
    private readonly specialActivityLegalProceedingCommandRepositoryGateway: SpecialActivityLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateSpecialActivityRequestDto,
  ): Promise<CreateSpecialActivityResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const hasPpp = dto.documents.some(
      (doc) => doc.type === SpecialActivityDocumentTypeEnum.PPP,
    );

    if (!hasPpp) {
      throw new SpecialActivityAtLeastOnePppRequiredError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const specialActivity = new SpecialActivityEntity({});

    const specialActivityDocuments = await Promise.all(
      dto.documents.map(async (docDto) => {
        const buffer = docDto.document.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.document.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentPath =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new SpecialActivityDocumentEntity({
          document: documentPath,
          type: docDto.type,
          specialActivity,
        });
      }),
    );

    const specialActivityInssBenefit =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map((value) => {
            return new SpecialActivityInssBenefitEntity({
              inssBenefitNumber: value,
              specialActivity,
            });
          })
        : [];

    const specialActivityLegalProceeding =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map((value) => {
            return new SpecialActivityLegalProceedingEntity({
              legalProceedingNumber: value,
              specialActivity,
            });
          })
        : [];

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.SPECIAL_ACTIVITY,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      cnisFastAnalysis: null,
      specialActivity,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      specialActivity,
      specialActivityDocuments,
      specialActivityInssBenefit,
      specialActivityLegalProceeding,
      analysisToolRecord,
    );

    return CreateSpecialActivityResponseDto.build({
      specialActivityId: specialActivity.id,
    });
  }

  private async createOnDatabase(
    specialActivity: SpecialActivityEntity,
    specialActivityDocuments: SpecialActivityDocumentEntity[],
    specialActivityInssBenefit: SpecialActivityInssBenefitEntity[],
    specialActivityLegalProceeding: SpecialActivityLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const specialActivityDocumentTransactions = specialActivityDocuments.map(
      (value) => {
        return this.specialActivityDocumentCommandRepositoryGateway.createSpecialActivityDocument(
          value,
        );
      },
    );

    const specialActivityInssBenefitTransactions =
      specialActivityInssBenefit.map((value) => {
        return this.specialActivityInssBenefitCommandRepositoryGateway.createSpecialActivityInssBenefit(
          value,
        );
      });

    const specialActivityLegalProceedingTransactions =
      specialActivityLegalProceeding.map((value) => {
        return this.specialActivityLegalProceedingCommandRepositoryGateway.createSpecialActivityLegalProceeding(
          value,
        );
      });

    const specialActivityTransaction =
      this.specialActivityCommandRepositoryGateway.createSpecialActivity(
        specialActivity,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      specialActivityTransaction,
      ...specialActivityDocumentTransactions,
      ...specialActivityInssBenefitTransactions,
      ...specialActivityLegalProceedingTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
