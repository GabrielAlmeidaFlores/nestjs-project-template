import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/command/special-retirement-grant-earnings-history.command.repository.gateway';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-document/command/special-retirement-grant-period-document.command.repository.gateway';
import { SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-document/query/special-retirement-grant-period-document.query.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/special-retirement-grant-period-document.entity';
import { CreateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period.request.dto';
import { UpdateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant-period.request.dto';
import { UpdateSpecialRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant-period.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpecialRetirementGrantPeriodUseCase {
  protected readonly _type = UpdateSpecialRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodCommandRepositoryGateway: SpecialRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway)
    private readonly specialRetirementGrantEarningsHistoryCommandRepositoryGateway: SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodDocumentCommandRepositoryGateway: SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodDocumentQueryRepositoryGateway: SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    dto: UpdateSpecialRetirementGrantPeriodRequestDto,
  ): Promise<UpdateSpecialRetirementGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const record =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (record.specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const grant = new SpecialRetirementGrantEntity({
      ...record.specialRetirementGrant,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: record.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const existingPeriodIds =
      await this.specialRetirementGrantPeriodQueryRepositoryGateway.listIdsBySpecialRetirementGrantId(
        specialRetirementGrantId,
      );

    const existingDocumentIds = (
      await Promise.all(
        existingPeriodIds.map((periodId) =>
          this.specialRetirementGrantPeriodDocumentQueryRepositoryGateway.listIdsBySpecialRetirementGrantPeriodId(
            periodId,
          ),
        ),
      )
    ).flat();

    const periodsData = await Promise.all(
      dto.periods.map(async (p) => {
        const period = this.buildPeriodEntity(p, grant);
        const documents = await this.uploadAndBuildDocuments(period, p.documents);
        const earningsTx = this.buildEarningsTransactions(period, grant, p.earningsHistory);
        return { period, documents, earningsTx };
      }),
    );

    const deleteDocumentTransactions = existingDocumentIds.map((id) =>
      this.specialRetirementGrantPeriodDocumentCommandRepositoryGateway.deleteSpecialRetirementGrantPeriodDocument(
        id,
      ),
    );

    const deletePeriodTransactions = existingPeriodIds.map((id) =>
      this.specialRetirementGrantPeriodCommandRepositoryGateway.deleteSpecialRetirementGrantPeriod(
        id,
      ),
    );

    const createTransactions = periodsData.flatMap(({ period, documents, earningsTx }) => [
      this.specialRetirementGrantPeriodCommandRepositoryGateway.createSpecialRetirementGrantPeriod(
        period,
      ),
      ...earningsTx,
      ...documents.map((doc) =>
        this.specialRetirementGrantPeriodDocumentCommandRepositoryGateway.createSpecialRetirementGrantPeriodDocument(
          doc,
        ),
      ),
    ]);

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...deleteDocumentTransactions,
      ...deletePeriodTransactions,
      ...createTransactions,
    ]);
    await transaction.commit();

    return UpdateSpecialRetirementGrantPeriodResponseDto.build({
      success: true,
    });
  }

  private buildPeriodEntity(
    p: CreateSpecialRetirementGrantPeriodRequestDto,
    grant: SpecialRetirementGrantEntity,
  ): SpecialRetirementGrantPeriodEntity {
    return new SpecialRetirementGrantPeriodEntity({
      employmentRelationshipSource: p.employmentRelationshipSource ?? null,
      startDate: p.startDate ?? null,
      endDate: p.endDate ?? null,
      category: p.category ?? null,
      status: p.status ?? null,
      averageContributionAmount: p.averageContributionAmount ?? null,
      shouldConsiderPeriod: p.shouldConsiderPeriod ?? true,
      shouldConsiderLastRemunerationAsExitDate:
        p.shouldConsiderLastRemunerationAsExitDate ?? false,
      belowTheMinimum: p.belowTheMinimum ?? null,
      leaveDate: p.leaveDate ?? null,
      cnisDocument: grant.cnisDocument,
      specialRetirementGrant: grant,
    });
  }

  private buildEarningsTransactions(
    period: SpecialRetirementGrantPeriodEntity,
    grant: SpecialRetirementGrantEntity,
    earningsHistory: CreateSpecialRetirementGrantPeriodRequestDto['earningsHistory'],
  ): ReturnType<SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway['createSpecialRetirementGrantEarningsHistory']>[] {
    return (earningsHistory ?? []).map((eh) =>
      this.specialRetirementGrantEarningsHistoryCommandRepositoryGateway.createSpecialRetirementGrantEarningsHistory(
        new SpecialRetirementGrantEarningsHistoryEntity({
          competence: eh.competence ?? null,
          remuneration: eh.remuneration ?? null,
          indicators: eh.indicators ?? null,
          paymentDate: eh.paymentDate ?? null,
          competenceBelowTheMinimum: eh.competenceBelowTheMinimum ?? null,
          specialRetirementGrant: grant,
          specialRetirementGrantPeriod: period,
        }),
      ),
    );
  }

  private async uploadAndBuildDocuments(
    period: SpecialRetirementGrantPeriodEntity,
    documents: CreateSpecialRetirementGrantPeriodRequestDto['documents'],
  ): Promise<SpecialRetirementGrantPeriodDocumentEntity[]> {
    if (!documents || documents.length === 0) {
      return [];
    }

    return Promise.all(
      documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();
        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const documentUrl = await this.fileProcessorGateway.uploadFile(fileModel);
        return new SpecialRetirementGrantPeriodDocumentEntity({
          type: docDto.type,
          document: documentUrl,
          specialRetirementGrantPeriodId: period.id.toString(),
        });
      }),
    );
  }
}
