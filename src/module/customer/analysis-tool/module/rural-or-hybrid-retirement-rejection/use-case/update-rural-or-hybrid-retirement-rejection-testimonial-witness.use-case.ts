import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-testimonial-witness/command/rural-or-hybrid-retirement-rejection-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-testimonial-witness-document/command/rural-or-hybrid-retirement-rejection-testimonial-witness-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-document-id.value-object';
import { RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-testimonial-witness.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway: RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    dto: UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingTestimonialWitnesses =
      existingRejection.ruralOrHybridRetirementRejectionTestimonialWitness ??
      [];
    const existingTestimonialWitnessDocuments =
      existingRejection.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingTestimonialWitness of existingTestimonialWitnesses) {
      const testimonialWitnessDocuments =
        existingTestimonialWitnessDocuments.filter(
          (document) =>
            document.ruralOrHybridRetirementRejectionTestimonialWitnessId.toString() ===
            existingTestimonialWitness.id.toString(),
        );

      for (const testimonialWitnessDocument of testimonialWitnessDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
            testimonialWitnessDocument.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionTestimonialWitness(
          existingTestimonialWitness.id,
        ),
      );
    }

    for (const testimonialWitnessDto of dto.testimonialWitnesses) {
      const testimonialWitnessId =
        new RuralOrHybridRetirementRejectionTestimonialWitnessId();

      transactions.push(
        this.ruralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway.createRuralOrHybridRetirementRejectionTestimonialWitness(
          this.buildTestimonialWitnessEntity(
            testimonialWitnessId,
            ruralOrHybridRetirementRejectionId,
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

            return this.ruralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
              new RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity(
                {
                  id: new RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId(),
                  document,
                  ruralOrHybridRetirementRejectionTestimonialWitnessId:
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

    return UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto.build(
      {
        ruralOrHybridRetirementRejectionId,
      },
    );
  }

  private buildTestimonialWitnessEntity(
    testimonialWitnessId: RuralOrHybridRetirementRejectionTestimonialWitnessId,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    testimonialWitnessDto: RuralOrHybridRetirementRejectionTestimonialWitnessItemRequestDto,
  ): RuralOrHybridRetirementRejectionTestimonialWitnessEntity {
    return new RuralOrHybridRetirementRejectionTestimonialWitnessEntity({
      id: testimonialWitnessId,
      fullName: testimonialWitnessDto.fullName ?? null,
      federalDocument: testimonialWitnessDto.federalDocument ?? null,
      insuredRelationship: testimonialWitnessDto.insuredRelationship ?? null,
      canTestifyStartDate: testimonialWitnessDto.canTestifyStartDate ?? null,
      canTestifyEndDate: testimonialWitnessDto.canTestifyEndDate ?? null,
      ruralOrHybridRetirementRejectionId,
    });
  }
}
