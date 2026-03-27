import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/command/disability-retirement-planning-grant-disability-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period-document/command/disability-retirement-planning-grant-disability-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/value-object/disability-retirement-planning-grant-disability-period-document-id.value-object';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant-disability-period.request.dto';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant-disability-period.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway: DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    dto: UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const existingDisabilityPeriods =
      existingGrant.disabilityRetirementPlanningGrantDisabilityPeriod ?? [];
    const disabilityPeriodIds: DisabilityRetirementPlanningGrantDisabilityPeriodId[] =
      [];
    const transactions: TransactionType[] = [];

    for (const existingDisabilityPeriod of existingDisabilityPeriods) {
      transactions.push(
        this.disabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantDisabilityPeriodId(
          existingDisabilityPeriod.id,
        ),
        this.disabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantDisabilityPeriod(
          existingDisabilityPeriod.id,
          new DisabilityRetirementPlanningGrantDisabilityPeriodEntity({
            id: existingDisabilityPeriod.id,
            disabilityDegree: existingDisabilityPeriod.disabilityDegree,
            disabilityCategory: existingDisabilityPeriod.disabilityCategory,
            disabilityDescription:
              existingDisabilityPeriod.disabilityDescription,
            dailyImpact: existingDisabilityPeriod.dailyImpact,
            startDate: existingDisabilityPeriod.startDate,
            endDate: existingDisabilityPeriod.endDate,
            cidTenId: existingDisabilityPeriod.cidTenId,
            disabilityRetirementPlanningGrantId,
            deletedAt: new Date(),
          }),
        ),
      );
    }

    for (const disabilityPeriodDto of dto.disabilityPeriods) {
      const disabilityPeriodId =
        new DisabilityRetirementPlanningGrantDisabilityPeriodId();

      disabilityPeriodIds.push(disabilityPeriodId);

      transactions.push(
        this.disabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway.createDisabilityRetirementPlanningGrantDisabilityPeriod(
          new DisabilityRetirementPlanningGrantDisabilityPeriodEntity({
            id: disabilityPeriodId,
            disabilityDegree: disabilityPeriodDto.disabilityDegree,
            disabilityCategory: disabilityPeriodDto.disabilityCategory,
            disabilityDescription: disabilityPeriodDto.disabilityDescription,
            dailyImpact: disabilityPeriodDto.dailyImpact,
            startDate: disabilityPeriodDto.startDate,
            endDate: disabilityPeriodDto.endDate ?? null,
            cidTenId: disabilityPeriodDto.cidTenId ?? null,
            disabilityRetirementPlanningGrantId,
          }),
        ),
      );

      if (
        disabilityPeriodDto.documents &&
        disabilityPeriodDto.documents.length > 0
      ) {
        const documentTransactions = await Promise.all(
          disabilityPeriodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.disabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningGrantDisabilityPeriodDocument(
              new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity(
                {
                  id: new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId(),
                  document: documentUrl,
                  type: documentDto.type,
                  disabilityRetirementPlanningGrantDisabilityPeriodId:
                    disabilityPeriodId,
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

    return UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto.build(
      {
        disabilityRetirementPlanningGrantId,
      },
    );
  }
}
