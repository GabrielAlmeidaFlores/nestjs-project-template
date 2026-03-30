import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/command/disability-retirement-planning-grant-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-document/command/disability-retirement-planning-grant-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/value-object/disability-retirement-planning-grant-period-document-id.value-object';
import { CreateDisabilityRetirementPlanningGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant-period.request.dto';
import { CreateDisabilityRetirementPlanningGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-period.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDisabilityRetirementPlanningGrantPeriodUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantPeriodCommandRepositoryGateway: DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    dto: CreateDisabilityRetirementPlanningGrantPeriodRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
      disabilityRetirementPlanningGrantId,
      DisabilityRetirementPlanningGrantNotFoundError,
    );

    const transactions: TransactionType[] = [];

    for (const periodDto of dto.periods) {
      const periodId = new DisabilityRetirementPlanningGrantPeriodId();

      transactions.push(
        this.disabilityRetirementPlanningGrantPeriodCommandRepositoryGateway.createDisabilityRetirementPlanningGrantPeriod(
          new DisabilityRetirementPlanningGrantPeriodEntity({
            id: periodId,
            startDate: periodDto.startDate,
            endDate: periodDto.endDate ?? null,
            category: periodDto.category,
            isPendency: periodDto.isPendency,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            pendencyReason: periodDto.pendencyReason ?? null,
            typeOfContribution: periodDto.typeOfContribution ?? null,
            status: periodDto.status,
            disabilityStatus: periodDto.disabilityStatus ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            contributionAverage: periodDto.contributionAverage ?? null,
            bondOrigin: periodDto.bondOrigin ?? null,
            disabilityRetirementPlanningGrantId,
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

            return this.disabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningGrantPeriodDocument(
              new DisabilityRetirementPlanningGrantPeriodDocumentEntity({
                id: new DisabilityRetirementPlanningGrantPeriodDocumentId(),
                document: documentUrl,
                disabilityRetirementPlanningGrantPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateDisabilityRetirementPlanningGrantPeriodResponseDto.build({
      disabilityRetirementPlanningGrantId,
    });
  }
}
