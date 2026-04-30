import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period/command/special-retirement-rejection-work-period.command.repository.gateway';
import { SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period-document/command/special-retirement-rejection-work-period-document.command.repository.gateway';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period-earnings-history/command/special-retirement-rejection-work-period-earnings-history.command.repository.gateway';
import { SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-special-period/command/special-retirement-rejection-work-special-period.command.repository.gateway';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-special-period-legal-framework/command/special-retirement-rejection-work-special-period-legal-framework.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity';
import { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import { SpecialRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity';
import { UpdateSpecialRetirementRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/update-special-retirement-rejection-work-periods.request.dto';
import { UpdateSpecialRetirementRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/update-special-retirement-rejection-work-periods.response.dto';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpecialRetirementRejectionWorkPeriodsUseCase {
  protected readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway)
    private readonly specialRetirementRejectionWorkPeriodCommandRepositoryGateway: SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(
      SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly specialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway: SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly specialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway)
    private readonly specialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway: SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway,
    @Inject(
      SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway,
    )
    private readonly specialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway: SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    dto: UpdateSpecialRetirementRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateSpecialRetirementRejectionWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      specialRetirementRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SpecialRetirementRejectionNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.specialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway.deleteAllSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkBySpecialRetirementRejectionId(
        specialRetirementRejectionId,
      ),
      this.specialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway.deleteAllSpecialRetirementRejectionWorkSpecialPeriodBySpecialRetirementRejectionId(
        specialRetirementRejectionId,
      ),
      this.specialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.deleteAllSpecialRetirementRejectionWorkPeriodEarningsHistoryBySpecialRetirementRejectionId(
        specialRetirementRejectionId,
      ),
      this.specialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway.deleteAllSpecialRetirementRejectionWorkPeriodDocumentBySpecialRetirementRejectionId(
        specialRetirementRejectionId,
      ),
      this.specialRetirementRejectionWorkPeriodCommandRepositoryGateway.deleteAllSpecialRetirementRejectionWorkPeriodBySpecialRetirementRejectionId(
        specialRetirementRejectionId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods ?? []) {
      const workPeriodId = new SpecialRetirementRejectionWorkPeriodId();

      transactions.push(
        this.specialRetirementRejectionWorkPeriodCommandRepositoryGateway.createSpecialRetirementRejectionWorkPeriod(
          new SpecialRetirementRejectionWorkPeriodEntity({
            id: workPeriodId,
            bondOrigin: workPeriodDto.bondOrigin ?? null,
            startDate: workPeriodDto.startDate ?? null,
            endDate: workPeriodDto.endDate ?? null,
            category: workPeriodDto.category ?? null,
            pendencyReason: workPeriodDto.pendencyReason ?? null,
            periodConsideration: workPeriodDto.periodConsideration ?? null,
            contributionAverage: workPeriodDto.contributionAverage ?? null,
            status: workPeriodDto.status ?? null,
            gracePeriod: workPeriodDto.gracePeriod ?? null,
            activityType: workPeriodDto.activityType ?? null,
            specialRetirementRejectionId,
          }),
        ),
      );

      if (workPeriodDto.documents !== undefined) {
        const workPeriodDocuments = await Promise.all(
          workPeriodDto.documents.map(async (documentDto) => {
            const fileName = await this.uploadFile(documentDto.file);

            return new SpecialRetirementRejectionWorkPeriodDocumentEntity({
              fileName,
              type: documentDto.type,
              specialRetirementRejectionWorkPeriodId: workPeriodId,
            });
          }),
        );

        transactions.push(
          ...workPeriodDocuments.map((document) =>
            this.specialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway.createSpecialRetirementRejectionWorkPeriodDocument(
              document,
            ),
          ),
        );
      }

      if (workPeriodDto.earningsHistory !== undefined) {
        transactions.push(
          ...workPeriodDto.earningsHistory.map((earningsHistory) =>
            this.specialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.createSpecialRetirementRejectionWorkPeriodEarningsHistory(
              new SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity({
                competence: earningsHistory.competence ?? null,
                remuneration: earningsHistory.remuneration ?? null,
                indicators: earningsHistory.indicators ?? null,
                paymentDate: earningsHistory.paymentDate ?? null,
                contribution: earningsHistory.contribution ?? null,
                contributionSalary: earningsHistory.contributionSalary ?? null,
                competenceBelowTheMinimum:
                  earningsHistory.competenceBelowTheMinimum ?? null,
                specialRetirementRejectionWorkPeriodId: workPeriodId,
              }),
            ),
          ),
        );
      }

      if (workPeriodDto.specialPeriods !== undefined) {
        const specialPeriods = workPeriodDto.specialPeriods.map(
          (specialPeriodDto) => {
            const specialPeriodId =
              new SpecialRetirementRejectionWorkSpecialPeriodId();

            const specialPeriodEntity =
              new SpecialRetirementRejectionWorkSpecialPeriodEntity({
                id: specialPeriodId,
                startDate: specialPeriodDto.startDate ?? null,
                endDate: specialPeriodDto.endDate ?? null,
                harmfulAgents: specialPeriodDto.harmfulAgents ?? null,
                otherAgents: specialPeriodDto.otherAgents ?? null,
                companyName: specialPeriodDto.companyName ?? null,
                companyDocument: specialPeriodDto.companyDocument ?? null,
                specialRetirementRejectionWorkPeriodId: workPeriodId,
              });

            const legalFrameworkEntities = (
              specialPeriodDto.legalFrameworks ?? []
            ).map(
              (legalFramework) =>
                new SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity(
                  {
                    code: legalFramework.code ?? null,
                    description: legalFramework.description ?? null,
                    specialRetirementRejectionWorkSpecialPeriodId:
                      specialPeriodId,
                  },
                ),
            );

            return {
              specialPeriodEntity,
              legalFrameworkEntities,
            };
          },
        );

        transactions.push(
          ...specialPeriods.flatMap(({ specialPeriodEntity }) =>
            this.specialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway.createSpecialRetirementRejectionWorkSpecialPeriod(
              specialPeriodEntity,
            ),
          ),
          ...specialPeriods.flatMap(({ legalFrameworkEntities }) =>
            legalFrameworkEntities.map((legalFrameworkEntity) =>
              this.specialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway.createSpecialRetirementRejectionWorkSpecialPeriodLegalFramework(
                legalFrameworkEntity,
              ),
            ),
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateSpecialRetirementRejectionWorkPeriodsResponseDto.build({
      specialRetirementRejectionId,
    });
  }

  private async uploadFile(file: {
    base64: { decodeToBuffer(): Buffer };
    originalFileName: string;
  }): Promise<string> {
    const buffer = file.base64.decodeToBuffer();
    const fileModel = FileModel.build({
      buffer,
      originalName: file.originalFileName,
      size: buffer.length,
      encoding: 'base64',
    });

    return await this.fileProcessorGateway.uploadFile(fileModel);
  }
}
