import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-result/command/maternity-pay-rejection-result.command.repository.gateway';
import { MaternityPayRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period/command/maternity-pay-rejection-work-period.command.repository.gateway';
import { MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period-document/command/maternity-pay-rejection-work-period-document.command.repository.gateway';
import { MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period-earnings-history/command/maternity-pay-rejection-work-period-earnings-history.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';
import { MaternityPayRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/value-object/maternity-pay-rejection-work-period-document-id.value-object';
import { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';
import { MaternityPayRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/value-object/maternity-pay-rejection-work-period-earnings-history-id.value-object';
import { UpdateMaternityPayRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/update-maternity-pay-rejection-work-periods.request.dto';
import { UpdateMaternityPayRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/update-maternity-pay-rejection-work-periods.response.dto';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateMaternityPayRejectionWorkPeriodsUseCase {
  protected readonly _type = UpdateMaternityPayRejectionWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(MaternityPayRejectionQueryRepositoryGateway)
    private readonly maternityPayRejectionQueryRepositoryGateway: MaternityPayRejectionQueryRepositoryGateway,
    @Inject(MaternityPayRejectionResultCommandRepositoryGateway)
    private readonly maternityPayRejectionResultCommandRepositoryGateway: MaternityPayRejectionResultCommandRepositoryGateway,
    @Inject(MaternityPayRejectionWorkPeriodCommandRepositoryGateway)
    private readonly maternityPayRejectionWorkPeriodCommandRepositoryGateway: MaternityPayRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway)
    private readonly maternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway: MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly maternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
    dto: UpdateMaternityPayRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateMaternityPayRejectionWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.maternityPayRejectionQueryRepositoryGateway.findOneByMaternityPayRejectionIdOrFailWithRelations(
        maternityPayRejectionId,
        MaternityPayRejectionNotFoundError,
      );

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MaternityPayRejectionNotFoundError,
      );

    const transactions: TransactionType[] = [
      this.maternityPayRejectionWorkPeriodCommandRepositoryGateway.deleteAllMaternityPayRejectionWorkPeriodByMaternityPayRejectionId(
        maternityPayRejectionId,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisToolRecord.id,
        AnalysisStatusEnum.IN_PROGRESS,
        organizationMember.id,
      ),
    ];

    if (rejection.maternityPayRejectionResult !== null) {
      transactions.push(
        this.maternityPayRejectionResultCommandRepositoryGateway.updateMaternityPayRejectionResult(
          new MaternityPayRejectionResultEntity({
            id: rejection.maternityPayRejectionResult.id,
            firstAnalysis: rejection.maternityPayRejectionResult.firstAnalysis,
            secondAnalysis:
              rejection.maternityPayRejectionResult.secondAnalysis,
            completeAnalysis: null,
            simplifiedAnalysis: null,
          }),
        ),
      );
    }

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodId = new MaternityPayRejectionWorkPeriodId();

      transactions.push(
        this.maternityPayRejectionWorkPeriodCommandRepositoryGateway.createMaternityPayRejectionWorkPeriod(
          new MaternityPayRejectionWorkPeriodEntity({
            id: workPeriodId,
            bondOrigin: workPeriodDto.bondOrigin ?? null,
            startDate: workPeriodDto.startDate ?? null,
            endDate: workPeriodDto.endDate ?? null,
            category: workPeriodDto.category ?? null,
            competenceBelowTheMinimum:
              workPeriodDto.competenceBelowTheMinimum ?? null,
            pendencyReason: workPeriodDto.pendencyReason ?? null,
            periodConsideration: workPeriodDto.periodConsideration ?? null,
            contributionAverage: workPeriodDto.contributionAverage ?? null,
            status: workPeriodDto.status ?? null,
            gracePeriod: workPeriodDto.gracePeriod ?? null,
            jobType: workPeriodDto.jobType ?? null,
            activityDescription: workPeriodDto.activityDescription ?? null,
            maternityPayRejectionId,
          }),
        ),
      );

      if (workPeriodDto.documents && workPeriodDto.documents.length > 0) {
        const documentsToPersist = await Promise.all(
          workPeriodDto.documents.map(async (docDto) => {
            const buffer = docDto.file.base64.decodeToBuffer();
            const file = FileModel.build({
              buffer,
              originalName: docDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });
            const fileName = await this.fileProcessorGateway.uploadFile(file);

            const entity = new MaternityPayRejectionWorkPeriodDocumentEntity({
              id: new MaternityPayRejectionWorkPeriodDocumentId(),
              document: fileName,
              type: docDto.type,
              maternityPayRejectionWorkPeriodId: workPeriodId,
            });

            return { entity };
          }),
        );

        transactions.push(
          ...documentsToPersist.map(({ entity }) =>
            this.maternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway.createMaternityPayRejectionWorkPeriodDocument(
              entity,
            ),
          ),
        );
      }

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        transactions.push(
          ...workPeriodDto.earningsHistory.map((item) =>
            this.maternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.createMaternityPayRejectionWorkPeriodEarningsHistory(
              new MaternityPayRejectionWorkPeriodEarningsHistoryEntity({
                id: new MaternityPayRejectionWorkPeriodEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                maternityPayRejectionWorkPeriodId: workPeriodId,
              }),
            ),
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateMaternityPayRejectionWorkPeriodsResponseDto.build({
      maternityPayRejectionId,
    });
  }
}
