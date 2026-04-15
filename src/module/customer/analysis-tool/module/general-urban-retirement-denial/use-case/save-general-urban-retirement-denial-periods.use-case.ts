import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period/command/general-urban-retirement-denial-period.command.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period-document/command/general-urban-retirement-denial-period-document.command.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period-earnings-history/command/general-urban-retirement-denial-period-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';
import { SaveGeneralUrbanRetirementDenialPeriodsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/save-general-urban-retirement-denial-periods.request.dto';
import { SaveGeneralUrbanRetirementDenialPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/save-general-urban-retirement-denial-periods.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveGeneralUrbanRetirementDenialPeriodsUseCase {
  protected readonly _type =
    SaveGeneralUrbanRetirementDenialPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialPeriodCommandRepositoryGateway: GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway: GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway: GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: SaveGeneralUrbanRetirementDenialPeriodsRequestDto,
  ): Promise<SaveGeneralUrbanRetirementDenialPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const existingPeriods =
      existingDenial.generalUrbanRetirementDenialPeriod ?? [];

    const transactions: TransactionType[] = [];

    for (const existingPeriod of existingPeriods) {
      transactions.push(
        this.generalUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway.deleteAllByGeneralUrbanRetirementDenialPeriodId(
          existingPeriod.id,
        ),
        this.generalUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway.deleteAllByGeneralUrbanRetirementDenialPeriodId(
          existingPeriod.id,
        ),
        this.generalUrbanRetirementDenialPeriodCommandRepositoryGateway.deleteGeneralUrbanRetirementDenialPeriod(
          existingPeriod.id,
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const periodId = new GeneralUrbanRetirementDenialPeriodId();

      transactions.push(
        this.generalUrbanRetirementDenialPeriodCommandRepositoryGateway.createGeneralUrbanRetirementDenialPeriod(
          new GeneralUrbanRetirementDenialPeriodEntity({
            id: periodId,
            bondOrigin: periodDto.bondOrigin ?? null,
            category: periodDto.category ?? null,
            activityDescription: periodDto.activityDescription ?? null,
            startDate: periodDto.startDate,
            endDate: periodDto.endDate ?? null,
            workType: periodDto.workType,
            impactMonths: periodDto.impactMonths ?? null,
            graceMonths: periodDto.graceMonths ?? null,
            isPendency: periodDto.isPendency,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            contributionAverage: periodDto.contributionAverage ?? null,
            pendencyReason: periodDto.pendencyReason ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            wantsToComplementViaMeuINSS:
              periodDto.wantsToComplementViaMeuINSS ?? null,
            status: periodDto.status,
            generalUrbanRetirementDenialId,
          }),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.generalUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway.createGeneralUrbanRetirementDenialPeriodDocument(
              new GeneralUrbanRetirementDenialPeriodDocumentEntity({
                id: new GeneralUrbanRetirementDenialPeriodDocumentId(),
                document: documentUrl,
                generalUrbanRetirementDenialPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.generalUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway.createGeneralUrbanRetirementDenialPeriodEarningsHistory(
              new GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity({
                id: new GeneralUrbanRetirementDenialPeriodEarningsHistoryId(),
                generalUrbanRetirementDenialPeriodId: periodId,
                ...(item.competence !== undefined && {
                  competence: item.competence,
                }),
                ...(item.value !== undefined && { value: item.value }),
              }),
            ),
          );
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveGeneralUrbanRetirementDenialPeriodsResponseDto.build({
      generalUrbanRetirementDenialId,
    });
  }
}
