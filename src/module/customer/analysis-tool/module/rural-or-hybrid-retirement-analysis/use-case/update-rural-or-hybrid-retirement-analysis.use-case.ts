import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/command/rural-or-hybrid-retirement-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-document/command/rural-or-hybrid-retirement-analysis-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity';
import { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';
import { UpdateRuralOrHybridRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementAnalysisUseCase {
  protected readonly _type = UpdateRuralOrHybridRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisCommandRepositoryGateway: RuralOrHybridRetirementAnalysisCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    dto: UpdateRuralOrHybridRetirementAnalysisRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const updated = new RuralOrHybridRetirementAnalysisEntity({
      id: ruralOrHybridRetirementAnalysisId,
      analysisName: dto.analysisName ?? existing.analysisName,
      activityType: dto.activityType ?? existing.activityType,
      requestedBenefit: dto.requestedBenefit ?? existing.requestedBenefit,
      ruralOrHybridRetirementAnalysisResultId:
        existing.ruralOrHybridRetirementAnalysisResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.ruralOrHybridRetirementAnalysisCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysis(
        ruralOrHybridRetirementAnalysisId,
        updated,
      ),
    ];

    if (dto.documents !== undefined) {
      for (const doc of existing.ruralOrHybridRetirementAnalysisDocument ??
        []) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisDocument(
            doc.id,
          ),
        );
      }

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

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisDocument(
              new RuralOrHybridRetirementAnalysisDocumentEntity({
                id: new RuralOrHybridRetirementAnalysisDocumentId(),
                document: documentUrl,
                type: documentDto.type,
                ruralOrHybridRetirementAnalysisId,
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

    return UpdateRuralOrHybridRetirementAnalysisResponseDto.build({
      ruralOrHybridRetirementAnalysisId,
    });
  }
}
