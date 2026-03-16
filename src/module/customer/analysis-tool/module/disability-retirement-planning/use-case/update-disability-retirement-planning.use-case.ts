import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/command/disability-retirement-planning.command.repository.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/command/disability-retirement-planning-document.command.repository.gateway';
import { DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/command/disability-retirement-planning-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/command/disability-retirement-planning-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';
import { DisabilityRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity';
import { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity';
import { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';
import { UpdateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning.request.dto';
import { UpdateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningUseCase {
  protected readonly _type = UpdateDisabilityRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningCommandRepositoryGateway: DisabilityRetirementPlanningCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningDocumentCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningDocumentCommandRepositoryGateway: DisabilityRetirementPlanningDocumentCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningInssBenefitCommandRepositoryGateway: DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningLegalProceedingCommandRepositoryGateway: DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    dto: UpdateDisabilityRetirementPlanningRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPlanning =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!existingPlanning) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const transactionOperations: TransactionType[] = [];

    for (const existingDoc of existingPlanning.documents) {
      transactionOperations.push(
        this.disabilityRetirementPlanningDocumentCommandRepositoryGateway.deleteDisabilityRetirementPlanningDocument(
          new DisabilityRetirementPlanningDocumentId(existingDoc.id),
        ),
      );
    }

    for (const existingBenefit of existingPlanning.inssBenefits) {
      transactionOperations.push(
        this.disabilityRetirementPlanningInssBenefitCommandRepositoryGateway.deleteDisabilityRetirementPlanningInssBenefit(
          new DisabilityRetirementPlanningInssBenefitId(existingBenefit.id),
        ),
      );
    }

    for (const existingProceeding of existingPlanning.legalProceedings) {
      transactionOperations.push(
        this.disabilityRetirementPlanningLegalProceedingCommandRepositoryGateway.deleteDisabilityRetirementPlanningLegalProceeding(
          new DisabilityRetirementPlanningLegalProceedingId(
            existingProceeding.id,
          ),
        ),
      );
    }

    const updatedPlanning = new DisabilityRetirementPlanningEntity({
      id: disabilityRetirementPlanningId,
      currentPosition: dto.currentPosition,
      federativeEntity: dto.federativeEntity,
      state: dto.state ?? null,
      municipality: dto.municipality ?? null,
      longTimeDisability: dto.longTimeDisability,
      publicServiceStartDate: dto.publicServiceStartDate ?? null,
      careerStartDate: dto.careerStartDate ?? null,
      analysisName: dto.analysisName ?? null,
    });

    transactionOperations.push(
      this.disabilityRetirementPlanningCommandRepositoryGateway.updateDisabilityRetirementPlanning(
        disabilityRetirementPlanningId,
        updatedPlanning,
      ),
    );

    if (dto.documents && dto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        dto.documents.map(async (documentDto) => {
          const buffer = documentDto.document.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.document.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const documentUrl =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity = new DisabilityRetirementPlanningDocumentEntity(
            {
              id: new DisabilityRetirementPlanningDocumentId(),
              disabilityRetirementPlanning: updatedPlanning,
              document: documentUrl,
              type:
                documentDto.type ??
                DisabilityRetirementPlanningDocumentTypeEnum.CTC_DOCUMENT,
            },
          );

          return this.disabilityRetirementPlanningDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningDocument(
            documentEntity,
          );
        }),
      );

      transactionOperations.push(...documentTransactions);
    }

    if (dto.inssBenefitNumber && dto.inssBenefitNumber.length > 0) {
      for (const benefitNumber of dto.inssBenefitNumber) {
        const inssBenefit = new DisabilityRetirementPlanningInssBenefitEntity({
          id: new DisabilityRetirementPlanningInssBenefitId(),
          disabilityRetirementPlanning: updatedPlanning,
          benefitNumber,
        });

        transactionOperations.push(
          this.disabilityRetirementPlanningInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (dto.legalProceedingNumber && dto.legalProceedingNumber.length > 0) {
      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        const legalProceeding =
          new DisabilityRetirementPlanningLegalProceedingEntity({
            id: new DisabilityRetirementPlanningLegalProceedingId(),
            disabilityRetirementPlanning: updatedPlanning,
            legalProceedingNumber,
          });

        transactionOperations.push(
          this.disabilityRetirementPlanningLegalProceedingCommandRepositoryGateway.createDisabilityRetirementPlanningLegalProceeding(
            legalProceeding,
          ),
        );
      }
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningResponseDto.build({
      disabilityRetirementPlanningId,
    });
  }
}
