import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis/command/temporary-disability-benefits-terminated-disability-analysis.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis-cid/command/temporary-disability-benefits-terminated-disability-analysis-cid.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-disability-analysis-document/command/temporary-disability-benefits-terminated-disability-analysis-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-previous-benefit/command/temporary-disability-benefits-terminated-previous-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-previous-benefit-document/command/temporary-disability-benefits-terminated-previous-benefit-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/value-object/temporary-disability-benefits-terminated-disability-analysis-cid-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/value-object/temporary-disability-benefits-terminated-disability-analysis-document-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated-disability-analysis.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated-disability-analysis.response.dto';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-disability-analysis-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    if (queryResult.disabilityAnalysis.length === 0) {
      throw new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisNotFoundError();
    }

    const disabilityAnalysisId =
      new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId();

    const disabilityAnalysis =
      new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity({
        id: disabilityAnalysisId,
        estimatedDisabilityStartDate: dto.estimatedDisabilityStartDate,
        shortDisabilityDescription: dto.shortDisabilityDescription ?? null,
        disabilityFromAccident: dto.disabilityFromAccident,
        disablingConditionDescription:
          dto.disablingConditionDescription ?? null,
        disabilityFromSevereDisease: dto.disabilityFromSevereDisease,
        severeDisease: dto.severeDisease ?? null,
        diseaseCustomName: dto.diseaseCustomName ?? null,
        diseaseStartDate: dto.diseaseStartDate ?? null,
        needsConstantAssistanceFromAnotherPerson:
          dto.needsConstantAssistanceFromAnotherPerson,
        previousDisabilityBenefit: dto.previousDisabilityBenefit,
        temporaryDisabilityBenefitsTerminatedId,
      });

    const transactions: TransactionType[] = [
      ...this.buildCleanupTransactions(queryResult),
      this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      ),
      this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysis(
        disabilityAnalysis,
      ),
    ];

    if (dto.cidTenIds && dto.cidTenIds.length > 0) {
      const cidTransactions = dto.cidTenIds.map((cidTenId) =>
        this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCid(
          new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity({
            id: new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId(),
            cidTenId,
            temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
              disabilityAnalysisId,
          }),
        ),
      );

      transactions.push(...cidTransactions);
    }

    if (dto.documents && dto.documents.length > 0) {
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

          return this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocument(
            new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity(
              {
                id: new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
                  disabilityAnalysisId,
              },
            ),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    if (dto.previousBenefits && dto.previousBenefits.length > 0) {
      for (const previousBenefitDto of dto.previousBenefits) {
        const previousBenefitId =
          new TemporaryDisabilityBenefitsTerminatedPreviousBenefitId();

        transactions.push(
          this.temporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
            new TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity({
              id: previousBenefitId,
              benefitNumber: previousBenefitDto.benefitNumber,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
                disabilityAnalysisId,
            }),
          ),
        );

        if (
          previousBenefitDto.documents &&
          previousBenefitDto.documents.length > 0
        ) {
          const previousBenefitDocumentTransactions = await Promise.all(
            previousBenefitDto.documents.map(async (documentDto) => {
              const fileName = await this.uploadBase64File(documentDto.file);

              return this.temporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
                new TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity(
                  {
                    id: new TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId(),
                    fileName,
                    type: documentDto.type,
                    temporaryDisabilityBenefitsTerminatedPreviousBenefitId:
                      previousBenefitId,
                  },
                ),
              );
            }),
          );

          transactions.push(...previousBenefitDocumentTransactions);
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto.build(
      {
        temporaryDisabilityBenefitsTerminatedId,
      },
    );
  }

  private buildCleanupTransactions(
    temporaryDisabilityBenefitsTerminated: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): TransactionType[] {
    return temporaryDisabilityBenefitsTerminated.disabilityAnalysis.flatMap(
      (analysis) => {
        const analysisId =
          new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
            analysis.id,
          );

        const transactions: TransactionType[] = [
          this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
            analysisId,
          ),
          this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
            analysisId,
          ),
        ];

        for (const previousBenefit of analysis.previousBenefits) {
          for (const document of previousBenefit.documents) {
            transactions.push(
              this.temporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway.deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
                new TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId(
                  document.id,
                ),
              ),
            );
          }

          transactions.push(
            this.temporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway.deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
              new TemporaryDisabilityBenefitsTerminatedPreviousBenefitId(
                previousBenefit.id,
              ),
            ),
          );
        }

        return transactions;
      },
    );
  }

  private async uploadBase64File(file: {
    base64: { decodeToBuffer(): Buffer };
    originalFileName: string;
  }): Promise<string> {
    const buffer = file.base64.decodeToBuffer();

    const fileModel = FileModel.build({
      buffer,
      originalName: file.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.fileProcessorGateway.uploadFile(fileModel);
  }
}
