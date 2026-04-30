import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/command/maternity-pay-rejection.command.repository.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-document/command/maternity-pay-rejection-document.command.repository.gateway';
import { MaternityPayRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-inss-benefit/command/maternity-pay-rejection-inss-benefit.command.repository.gateway';
import { MaternityPayRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-legal-proceeding/command/maternity-pay-rejection-legal-proceeding.command.repository.gateway';
import { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';
import { MaternityPayRejectionDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/value-object/maternity-pay-rejection-document-id.value-object';
import { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';
import { MaternityPayRejectionInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/value-object/maternity-pay-rejection-inss-benefit-id.value-object';
import { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';
import { MaternityPayRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/value-object/maternity-pay-rejection-legal-proceeding-id.value-object';
import { UpdateMaternityPayRejectionRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/update-maternity-pay-rejection.request.dto';
import { UpdateMaternityPayRejectionResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/update-maternity-pay-rejection.response.dto';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

interface DocumentToPersistInterface {
  entity: MaternityPayRejectionDocumentEntity;
}

@Injectable()
export class UpdateMaternityPayRejectionUseCase {
  protected readonly _type = UpdateMaternityPayRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MaternityPayRejectionQueryRepositoryGateway)
    private readonly maternityPayRejectionQueryRepositoryGateway: MaternityPayRejectionQueryRepositoryGateway,
    @Inject(MaternityPayRejectionCommandRepositoryGateway)
    private readonly maternityPayRejectionCommandRepositoryGateway: MaternityPayRejectionCommandRepositoryGateway,
    @Inject(MaternityPayRejectionDocumentCommandRepositoryGateway)
    private readonly maternityPayRejectionDocumentCommandRepositoryGateway: MaternityPayRejectionDocumentCommandRepositoryGateway,
    @Inject(MaternityPayRejectionInssBenefitCommandRepositoryGateway)
    private readonly maternityPayRejectionInssBenefitCommandRepositoryGateway: MaternityPayRejectionInssBenefitCommandRepositoryGateway,
    @Inject(MaternityPayRejectionLegalProceedingCommandRepositoryGateway)
    private readonly maternityPayRejectionLegalProceedingCommandRepositoryGateway: MaternityPayRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
    dto: UpdateMaternityPayRejectionRequestDto,
  ): Promise<UpdateMaternityPayRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.maternityPayRejectionQueryRepositoryGateway.findOneByMaternityPayRejectionIdOrFailWithRelations(
        maternityPayRejectionId,
        MaternityPayRejectionNotFoundError,
      );

    const updatedRejection = new MaternityPayRejectionEntity({
      id: maternityPayRejectionId,
      analysisName: dto.analysisName ?? existingRejection.analysisName,
      triggeringEvent: dto.triggeringEvent ?? existingRejection.triggeringEvent,
      triggeringEventDate:
        dto.triggeringEventDate ?? existingRejection.triggeringEventDate,
      estimatedTriggeringEventDate:
        dto.estimatedTriggeringEventDate ??
        existingRejection.estimatedTriggeringEventDate,
      workAccidentOrSevereDesease:
        dto.workAccidentOrSevereDesease ??
        existingRejection.workAccidentOrSevereDesease,
      clientWasUnemployedOnBenefitOrDisabilityStartDate:
        dto.clientWasUnemployedOnBenefitOrDisabilityStartDate ??
        existingRejection.clientWasUnemployedOnBenefitOrDisabilityStartDate,
      clientWasRuralInsuredOnBenefitOrDisabilityStartDate:
        dto.clientWasRuralInsuredOnBenefitOrDisabilityStartDate ??
        existingRejection.clientWasRuralInsuredOnBenefitOrDisabilityStartDate,
      isCurrentlyUnemployed:
        dto.isCurrentlyUnemployed ?? existingRejection.isCurrentlyUnemployed,
      category: dto.category ?? existingRejection.category,
      thirdPartyDocumentRelationDescription:
        dto.thirdPartyDocumentRelationDescription ??
        existingRejection.thirdPartyDocumentRelationDescription,
      maternityPayRejectionResultId:
        existingRejection.maternityPayRejectionResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.maternityPayRejectionCommandRepositoryGateway.updateMaternityPayRejection(
        maternityPayRejectionId,
        updatedRejection,
      ),
    ];

    if (dto.documents !== undefined) {
      transactions.push(
        this.maternityPayRejectionDocumentCommandRepositoryGateway.deleteAllMaternityPayRejectionDocumentByMaternityPayRejectionId(
          maternityPayRejectionId,
        ),
      );

      if (dto.documents.length > 0) {
        const newDocs = await this.buildDocumentEntities(
          maternityPayRejectionId,
          dto.documents,
        );
        transactions.push(
          ...newDocs.map(({ entity }) =>
            this.maternityPayRejectionDocumentCommandRepositoryGateway.createMaternityPayRejectionDocument(
              entity,
            ),
          ),
        );
      }
    }

    if (dto.inssBenefits !== undefined) {
      transactions.push(
        this.maternityPayRejectionInssBenefitCommandRepositoryGateway.deleteAllMaternityPayRejectionInssBenefitByMaternityPayRejectionId(
          maternityPayRejectionId,
        ),
      );

      if (dto.inssBenefits.length > 0) {
        transactions.push(
          ...dto.inssBenefits.map((inssBenefit) =>
            this.maternityPayRejectionInssBenefitCommandRepositoryGateway.createMaternityPayRejectionInssBenefit(
              new MaternityPayRejectionInssBenefitEntity({
                id: new MaternityPayRejectionInssBenefitId(),
                inssBenefit,
                maternityPayRejectionId,
              }),
            ),
          ),
        );
      }
    }

    if (dto.legalProceedingNumbers !== undefined) {
      transactions.push(
        this.maternityPayRejectionLegalProceedingCommandRepositoryGateway.deleteAllMaternityPayRejectionLegalProceedingByMaternityPayRejectionId(
          maternityPayRejectionId,
        ),
      );

      if (dto.legalProceedingNumbers.length > 0) {
        transactions.push(
          ...dto.legalProceedingNumbers.map((legalProceedingNumber) =>
            this.maternityPayRejectionLegalProceedingCommandRepositoryGateway.createMaternityPayRejectionLegalProceeding(
              new MaternityPayRejectionLegalProceedingEntity({
                id: new MaternityPayRejectionLegalProceedingId(),
                legalProceedingNumber,
                maternityPayRejectionId,
              }),
            ),
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateMaternityPayRejectionResponseDto.build({
      maternityPayRejectionId,
    });
  }

  private async buildDocumentEntities(
    maternityPayRejectionId: MaternityPayRejectionId,
    documents: UpdateMaternityPayRejectionRequestDto['documents'] & object[],
  ): Promise<DocumentToPersistInterface[]> {
    return Promise.all(
      documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();
        const file = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const fileName = await this.fileProcessorGateway.uploadFile(file);

        const entity = new MaternityPayRejectionDocumentEntity({
          id: new MaternityPayRejectionDocumentId(),
          document: fileName,
          type: docDto.type,
          maternityPayRejectionId,
        });

        return { entity };
      }),
    );
  }
}
