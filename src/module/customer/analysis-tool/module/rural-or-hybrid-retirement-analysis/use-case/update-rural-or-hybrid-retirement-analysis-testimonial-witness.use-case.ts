import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-testimonial-witness/command/rural-or-hybrid-retirement-analysis-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-testimonial-witness-document/command/rural-or-hybrid-retirement-analysis-testimonial-witness-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-document-id.value-object';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-testimonial-witness.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway: RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    dto: UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingAnalysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const existingTestimonialWitnesses =
      existingAnalysis.ruralOrHybridRetirementAnalysisTestimonialWitness ?? [];
    const existingTestimonialWitnessDocuments =
      existingAnalysis.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingTestimonialWitness of existingTestimonialWitnesses) {
      const testimonialWitnessDocuments =
        existingTestimonialWitnessDocuments.filter(
          (document) =>
            document.ruralOrHybridRetirementAnalysisTestimonialWitnessId.toString() ===
            existingTestimonialWitness.id.toString(),
        );

      for (const testimonialWitnessDocument of testimonialWitnessDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
            testimonialWitnessDocument.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisTestimonialWitness(
          existingTestimonialWitness.id,
        ),
      );
    }

    for (const testimonialWitnessDto of dto.testimonialWitnesses) {
      const testimonialWitnessId =
        new RuralOrHybridRetirementAnalysisTestimonialWitnessId();

      transactions.push(
        this.ruralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisTestimonialWitness(
          this.buildTestimonialWitnessEntity(
            testimonialWitnessId,
            ruralOrHybridRetirementAnalysisId,
            testimonialWitnessDto,
          ),
        ),
      );

      if (
        testimonialWitnessDto.documents &&
        testimonialWitnessDto.documents.length > 0
      ) {
        const documentTransactions = await Promise.all(
          testimonialWitnessDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const document =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
              new RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity(
                {
                  id: new RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId(),
                  document,
                  ruralOrHybridRetirementAnalysisTestimonialWitnessId:
                    testimonialWitnessId,
                },
              ),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto.build(
      {
        ruralOrHybridRetirementAnalysisId,
      },
    );
  }

  private buildTestimonialWitnessEntity(
    testimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    testimonialWitnessDto: RuralOrHybridRetirementAnalysisTestimonialWitnessItemRequestDto,
  ): RuralOrHybridRetirementAnalysisTestimonialWitnessEntity {
    return new RuralOrHybridRetirementAnalysisTestimonialWitnessEntity({
      id: testimonialWitnessId,
      fullName: testimonialWitnessDto.fullName ?? null,
      federalDocument: testimonialWitnessDto.federalDocument ?? null,
      insuredRelationship: testimonialWitnessDto.insuredRelationship ?? null,
      canTestifyStartDate: testimonialWitnessDto.canTestifyStartDate ?? null,
      canTestifyEndDate: testimonialWitnessDto.canTestifyEndDate ?? null,
      ruralOrHybridRetirementAnalysisId,
    });
  }
}
