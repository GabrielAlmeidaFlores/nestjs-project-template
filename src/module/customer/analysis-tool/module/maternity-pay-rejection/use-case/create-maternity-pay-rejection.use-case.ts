import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
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
import { MaternityPayRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/command/maternity-pay-rejection.command.repository.gateway';
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
import { CreateMaternityPayRejectionRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/create-maternity-pay-rejection.request.dto';
import { CreateMaternityPayRejectionResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

interface DocumentToPersistInterface {
  entity: MaternityPayRejectionDocumentEntity;
}

@Injectable()
export class CreateMaternityPayRejectionUseCase {
  protected readonly _type = CreateMaternityPayRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(MaternityPayRejectionCommandRepositoryGateway)
    private readonly maternityPayRejectionCommandRepositoryGateway: MaternityPayRejectionCommandRepositoryGateway,
    @Inject(MaternityPayRejectionDocumentCommandRepositoryGateway)
    private readonly maternityPayRejectionDocumentCommandRepositoryGateway: MaternityPayRejectionDocumentCommandRepositoryGateway,
    @Inject(MaternityPayRejectionInssBenefitCommandRepositoryGateway)
    private readonly maternityPayRejectionInssBenefitCommandRepositoryGateway: MaternityPayRejectionInssBenefitCommandRepositoryGateway,
    @Inject(MaternityPayRejectionLegalProceedingCommandRepositoryGateway)
    private readonly maternityPayRejectionLegalProceedingCommandRepositoryGateway: MaternityPayRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateMaternityPayRejectionRequestDto,
  ): Promise<CreateMaternityPayRejectionResponseDto> {
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

    const maternityPayRejectionId = new MaternityPayRejectionId();

    const maternityPayRejection = new MaternityPayRejectionEntity({
      id: maternityPayRejectionId,
      analysisName: dto.analysisName ?? null,
      triggeringEvent: dto.triggeringEvent ?? null,
      triggeringEventDate: dto.triggeringEventDate ?? null,
      isCurrentlyUnemployed: dto.isCurrentlyUnemployed ?? null,
      category: dto.category ?? null,
      maternityPayRejectionResultId: null,
    });

    const documentsToPersist = await this.buildDocumentEntities(
      maternityPayRejectionId,
      dto,
    );

    const inssBenefitEntities = this.buildInssBenefitEntities(
      maternityPayRejectionId,
      dto,
    );

    const legalProceedingEntities = this.buildLegalProceedingEntities(
      maternityPayRejectionId,
      dto,
    );

    const transactions: TransactionType[] = [
      this.maternityPayRejectionCommandRepositoryGateway.createMaternityPayRejection(
        maternityPayRejection,
      ),
      ...documentsToPersist.map(({ entity }) =>
        this.maternityPayRejectionDocumentCommandRepositoryGateway.createMaternityPayRejectionDocument(
          entity,
        ),
      ),
      ...inssBenefitEntities.map((entity) =>
        this.maternityPayRejectionInssBenefitCommandRepositoryGateway.createMaternityPayRejectionInssBenefit(
          entity,
        ),
      ),
      ...legalProceedingEntities.map((entity) =>
        this.maternityPayRejectionLegalProceedingCommandRepositoryGateway.createMaternityPayRejectionLegalProceeding(
          entity,
        ),
      ),
    ];

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.MATERNITY_PAY_REJECTION,
      status: AnalysisStatusEnum.IN_PROGRESS,
      analysisToolClient,
      maternityPayRejection,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateMaternityPayRejectionResponseDto.build({
      maternityPayRejectionId,
    });
  }

  private async buildDocumentEntities(
    maternityPayRejectionId: MaternityPayRejectionId,
    dto: CreateMaternityPayRejectionRequestDto,
  ): Promise<DocumentToPersistInterface[]> {
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

  private buildInssBenefitEntities(
    maternityPayRejectionId: MaternityPayRejectionId,
    dto: CreateMaternityPayRejectionRequestDto,
  ): MaternityPayRejectionInssBenefitEntity[] {
    if (!dto.inssBenefits || dto.inssBenefits.length === 0) {
      return [];
    }

    return dto.inssBenefits.map(
      (inssBenefit) =>
        new MaternityPayRejectionInssBenefitEntity({
          id: new MaternityPayRejectionInssBenefitId(),
          inssBenefit,
          maternityPayRejectionId,
        }),
    );
  }

  private buildLegalProceedingEntities(
    maternityPayRejectionId: MaternityPayRejectionId,
    dto: CreateMaternityPayRejectionRequestDto,
  ): MaternityPayRejectionLegalProceedingEntity[] {
    if (
      !dto.legalProceedingNumbers ||
      dto.legalProceedingNumbers.length === 0
    ) {
      return [];
    }

    return dto.legalProceedingNumbers.map(
      (legalProceedingNumber) =>
        new MaternityPayRejectionLegalProceedingEntity({
          id: new MaternityPayRejectionLegalProceedingId(),
          legalProceedingNumber,
          maternityPayRejectionId,
        }),
    );
  }
}
