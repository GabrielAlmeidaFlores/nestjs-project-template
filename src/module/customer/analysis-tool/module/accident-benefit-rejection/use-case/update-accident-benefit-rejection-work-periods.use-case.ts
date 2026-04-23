import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period/command/accident-benefit-rejection-work-period.command.repository.gateway';
import { AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period-document/command/accident-benefit-rejection-work-period-document.command.repository.gateway';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period-earnings-history/command/accident-benefit-rejection-work-period-earnings-history.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/value-object/accident-benefit-rejection-work-period-document-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/value-object/accident-benefit-rejection-work-period-earnings-history-id.value-object';
import { UpdateAccidentBenefitRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/update-accident-benefit-rejection-work-periods.request.dto';
import { UpdateAccidentBenefitRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/update-accident-benefit-rejection-work-periods.response.dto';
import { AccidentBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateAccidentBenefitRejectionWorkPeriodsUseCase {
  protected readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionQueryRepositoryGateway)
    private readonly accidentBenefitRejectionQueryRepositoryGateway: AccidentBenefitRejectionQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway)
    private readonly accidentBenefitRejectionWorkPeriodCommandRepositoryGateway: AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway)
    private readonly accidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway: AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly accidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    dto: UpdateAccidentBenefitRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateAccidentBenefitRejectionWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
      accidentBenefitRejectionId,
      AccidentBenefitRejectionNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.accidentBenefitRejectionWorkPeriodCommandRepositoryGateway.deleteAllAccidentBenefitRejectionWorkPeriodByAccidentBenefitRejectionId(
        accidentBenefitRejectionId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodId = new AccidentBenefitRejectionWorkPeriodId();

      transactions.push(
        this.accidentBenefitRejectionWorkPeriodCommandRepositoryGateway.createAccidentBenefitRejectionWorkPeriod(
          new AccidentBenefitRejectionWorkPeriodEntity({
            id: workPeriodId,
            bondOrigin: workPeriodDto.bondOrigin,
            startDate: workPeriodDto.startDate,
            endDate: workPeriodDto.endDate ?? null,
            category: workPeriodDto.category,
            competenceBelowTheMinimum: workPeriodDto.competenceBelowTheMinimum,
            pendencyReason: workPeriodDto.pendencyReason ?? null,
            periodConsideration: workPeriodDto.periodConsideration ?? null,
            contributionAverage:
              workPeriodDto.contributionAverage?.toString() ?? null,
            status: String(workPeriodDto.status),
            gracePeriod: String(workPeriodDto.gracePeriod),
            jobType: workPeriodDto.jobType ?? null,
            activityDescription: workPeriodDto.activityDescription ?? null,
            accidentBenefitRejectionId,
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

            const entity = new AccidentBenefitRejectionWorkPeriodDocumentEntity(
              {
                id: new AccidentBenefitRejectionWorkPeriodDocumentId(),
                document: fileName,
                type: docDto.type,
                accidentBenefitRejectionWorkPeriodId: workPeriodId,
              },
            );

            return { entity };
          }),
        );

        transactions.push(
          ...documentsToPersist.map(({ entity }) =>
            this.accidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway.createAccidentBenefitRejectionWorkPeriodDocument(
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
            this.accidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.createAccidentBenefitRejectionWorkPeriodEarningsHistory(
              new AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity({
                id: new AccidentBenefitRejectionWorkPeriodEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                accidentBenefitRejectionWorkPeriodId: workPeriodId,
              }),
            ),
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateAccidentBenefitRejectionWorkPeriodsResponseDto.build({
      accidentBenefitRejectionId,
    });
  }
}
