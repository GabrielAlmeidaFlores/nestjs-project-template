import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/command/accident-assistance-grant.command.repository.gateway';
import { AccidentAssistanceGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/accident-assistance-grant.query.repository.gateway';
import { AccidentAssistanceGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-document/command/accident-assistance-grant-document.command.repository.gateway';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import { UpdateAccidentAssistanceGrantRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/request/update-accident-assistance-grant.request.dto';
import { UpdateAccidentAssistanceGrantResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/update-accident-assistance-grant.response.dto';
import { AccidentAssistanceGrantNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateAccidentAssistanceGrantUseCase {
  protected readonly _type = UpdateAccidentAssistanceGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantQueryRepositoryGateway)
    private readonly accidentAssistanceGrantQueryRepositoryGateway: AccidentAssistanceGrantQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantCommandRepositoryGateway)
    private readonly accidentAssistanceGrantCommandRepositoryGateway: AccidentAssistanceGrantCommandRepositoryGateway,
    @Inject(AccidentAssistanceGrantDocumentCommandRepositoryGateway)
    private readonly accidentAssistanceGrantDocumentCommandRepositoryGateway: AccidentAssistanceGrantDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
    dto: UpdateAccidentAssistanceGrantRequestDto,
  ): Promise<UpdateAccidentAssistanceGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.accidentAssistanceGrantQueryRepositoryGateway.findOneByAccidentAssistanceGrantIdOrFailWithRelations(
        accidentAssistanceGrantId,
        AccidentAssistanceGrantNotFoundError,
      );

    await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
      existing.analysisToolClientId,
      organizationSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    const updatedGrant = new AccidentAssistanceGrantEntity({
      id: existing.accidentAssistanceGrantId,
      analysisToolClientId: existing.analysisToolClientId,
      analysisName: dto.analysisName ?? existing.analysisName,
      category: dto.category ?? existing.category,
      accidentDate: dto.accidentDate ?? existing.accidentDate,
      hadPreviousTemporaryDisabilityAssistance:
        dto.hadPreviousTemporaryDisabilityAssistance ??
        existing.hadPreviousTemporaryDisabilityAssistance,
      sequelDescription: dto.sequelDescription ?? existing.sequelDescription,
      associatedCidId: dto.associatedCidId ?? existing.associatedCidId,
      accidentAssistanceGrantResultId: existing.accidentAssistanceGrantResult
        ? existing.accidentAssistanceGrantResult.id
        : null,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
      deletedAt: existing.deletedAt,
    });

    const updateTransaction =
      this.accidentAssistanceGrantCommandRepositoryGateway.updateAccidentAssistanceGrant(
        accidentAssistanceGrantId,
        updatedGrant,
      );

    const transactionOperations = [updateTransaction];

    if (dto.documents && dto.documents.length > 0) {
      const incomingTypes = [...new Set(dto.documents.map((d) => d.type))];
      for (const type of incomingTypes) {
        transactionOperations.push(
          this.accidentAssistanceGrantDocumentCommandRepositoryGateway.deleteAccidentAssistanceGrantDocumentByAccidentAssistanceGrantIdAndType(
            accidentAssistanceGrantId,
            type,
          ),
        );
      }

      const newDocuments = await this.buildDocuments(
        dto,
        accidentAssistanceGrantId,
      );
      for (const doc of newDocuments) {
        transactionOperations.push(
          this.accidentAssistanceGrantDocumentCommandRepositoryGateway.createAccidentAssistanceGrantDocument(
            doc,
          ),
        );
      }
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateAccidentAssistanceGrantResponseDto.build({
      accidentAssistanceGrantId,
    });
  }

  private async buildDocuments(
    dto: UpdateAccidentAssistanceGrantRequestDto,
    grantId: AccidentAssistanceGrantId,
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
          accidentAssistanceGrantId: grantId,
        });
      }),
    );
  }
}
