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
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/command/accident-assistance-grant.command.repository.gateway';
import { AccidentAssistanceGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-document/command/accident-assistance-grant-document.command.repository.gateway';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import { CreateAccidentAssistanceGrantRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/request/create-accident-assistance-grant.request.dto';
import { CreateAccidentAssistanceGrantResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/create-accident-assistance-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateAccidentAssistanceGrantUseCase {
  protected readonly _type = CreateAccidentAssistanceGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantCommandRepositoryGateway)
    private readonly accidentAssistanceGrantCommandRepositoryGateway: AccidentAssistanceGrantCommandRepositoryGateway,
    @Inject(AccidentAssistanceGrantDocumentCommandRepositoryGateway)
    private readonly accidentAssistanceGrantDocumentCommandRepositoryGateway: AccidentAssistanceGrantDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
    dto: CreateAccidentAssistanceGrantRequestDto,
  ): Promise<CreateAccidentAssistanceGrantResponseDto> {
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

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const grant = new AccidentAssistanceGrantEntity({
      analysisToolClientId: dto.analysisToolClientId,
      ...(dto.analysisName !== undefined && { analysisName: dto.analysisName }),
      ...(dto.category !== undefined && { category: dto.category }),
      ...(dto.accidentDate !== undefined && {
        accidentDate: dto.accidentDate,
      }),
      ...(dto.hadPreviousTemporaryDisabilityAssistance !== undefined && {
        hadPreviousTemporaryDisabilityAssistance:
          dto.hadPreviousTemporaryDisabilityAssistance,
      }),
      ...(dto.sequelDescription !== undefined && {
        sequelDescription: dto.sequelDescription,
      }),
      ...(dto.associatedCidId !== undefined && {
        associatedCidId: dto.associatedCidId,
      }),
    });

    const documentFiles = await this.buildDocuments(dto, grant);

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_GRANT,
      accidentAssistanceGrant: grant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const grantTransaction =
      this.accidentAssistanceGrantCommandRepositoryGateway.createAccidentAssistanceGrant(
        grant,
      );

    const documentTransactions = documentFiles.map((doc) =>
      this.accidentAssistanceGrantDocumentCommandRepositoryGateway.createAccidentAssistanceGrantDocument(
        doc,
      ),
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      grantTransaction,
      ...documentTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();

    return CreateAccidentAssistanceGrantResponseDto.build({
      accidentAssistanceGrantId: grant.id,
    });
  }

  private async buildDocuments(
    dto: CreateAccidentAssistanceGrantRequestDto,
    grant: AccidentAssistanceGrantEntity,
  ): Promise<AccidentAssistanceGrantDocumentEntity[]> {
    if (!dto.documents || dto.documents.length === 0) {
      return [];
    }

    return Promise.all(
      dto.documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();
        const file = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const fileName = await this.fileProcessorGateway.uploadFile(file);

        return new AccidentAssistanceGrantDocumentEntity({
          document: fileName,
          type: docDto.type,
          accidentAssistanceGrantId: grant.id,
        });
      }),
    );
  }
}
