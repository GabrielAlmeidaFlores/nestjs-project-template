import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/command/temporary-disability-benefits-grant.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-document/command/temporary-disability-benefits-grant-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';
import { UpdateTemporaryDisabilityBenefitsGrantRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant.response.dto';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsGrantUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    dto: UpdateTemporaryDisabilityBenefitsGrantRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const [existingGrant, analysisToolRecord] = await Promise.all([
      this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
        temporaryDisabilityBenefitsGrantId,
        TemporaryDisabilityBenefitsGrantNotFoundError,
      ),
      dto.analysisToolClientId !== undefined
        ? this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityId(
            temporaryDisabilityBenefitsGrantId,
            organizationSessionData.organizationId,
            sessionData.authIdentityId,
          )
        : Promise.resolve(null),
    ]);

    const updatedGrant = new TemporaryDisabilityBenefitsGrantEntity({
      id: temporaryDisabilityBenefitsGrantId,
      category: dto.category ?? existingGrant.category,
      analysisName: dto.analysisName ?? existingGrant.analysisName,
      temporaryDisabilityBenefitsGrantResultId:
        existingGrant.temporaryDisabilityBenefitsGrantResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsGrantCommandRepositoryGateway.updateTemporaryDisabilityBenefitsGrant(
        temporaryDisabilityBenefitsGrantId,
        updatedGrant,
      ),
    ];

    if (dto.analysisToolClientId !== undefined && analysisToolRecord !== null) {
      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordAnalysisToolClient(
          analysisToolRecord.id,
          dto.analysisToolClientId,
        ),
      );
    }

    if (dto.documents !== undefined) {
      transactions.push(
        this.temporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsGrantId(
          temporaryDisabilityBenefitsGrantId,
        ),
      );

      if (dto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          dto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const fileName =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.temporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantDocument(
              new TemporaryDisabilityBenefitsGrantDocumentEntity({
                id: new TemporaryDisabilityBenefitsGrantDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryDisabilityBenefitsGrantId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryDisabilityBenefitsGrantResponseDto.build({
      temporaryDisabilityBenefitsGrantId,
    });
  }
}
