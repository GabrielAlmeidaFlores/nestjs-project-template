import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { GetDisabilityRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';
import { DisabilityRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period/command/disability-retirement-planning-period.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability/command/disability-retirement-planning-period-disability.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability-document/command/disability-retirement-planning-period-disability-document.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time/command/disability-retirement-planning-period-special-time.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/command/disability-retirement-planning-period-special-time-document.command.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import { DisabilityRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/value-object/disability-retirement-planning-period-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';
import {
  CreateDisabilityRetirementPlanningPeriodsRequestDto,
  CreateDisabilityRetirementPlanningPeriodRequestDto,
  CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto,
  CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning-periods.request.dto';
import { UpdateDisabilityRetirementPlanningPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning-periods.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningPeriodUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningPeriodCommandRepositoryGateway)
    private readonly periodCommandRepositoryGateway: DisabilityRetirementPlanningPeriodCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway)
    private readonly periodDisabilityCommandRepositoryGateway: DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway)
    private readonly periodDisabilityDocumentCommandRepositoryGateway: DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway)
    private readonly periodSpecialTimeCommandRepositoryGateway: DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway)
    private readonly periodSpecialTimeDocumentCommandRepositoryGateway: DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    dto: CreateDisabilityRetirementPlanningPeriodsRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (queryResult === null) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const disabilityRetirementPlanning =
      this.buildDisabilityRetirementPlanningEntity(queryResult);

    const transactionOperations: TransactionType[] = [];

    this.buildDeleteExistingPeriodsTransactions(
      queryResult,
      transactionOperations,
    );

    for (const periodDto of dto.periods) {
      const periodTransactions = await this.buildPeriodTransactions(
        periodDto,
        disabilityRetirementPlanning,
      );

      transactionOperations.push(...periodTransactions);
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningPeriodsResponseDto.build({
      disabilityRetirementPlanningId,
    });
  }

  private buildDisabilityRetirementPlanningEntity(
    queryResult: GetDisabilityRetirementPlanningWithRelationsQueryResult,
  ): DisabilityRetirementPlanningEntity {
    return new DisabilityRetirementPlanningEntity({
      id: queryResult.id,
      currentPosition: queryResult.currentPosition,
      federativeEntity: queryResult.federativeEntity,
      state: queryResult.state,
      municipality: queryResult.municipality,
      longTimeDisability: queryResult.longTimeDisability,
      publicServiceStartDate: queryResult.publicServiceStartDate,
      careerStartDate: queryResult.careerStartDate,
      analysisName: queryResult.analysisName,
      createdAt: queryResult.createdAt,
      updatedAt: queryResult.updatedAt,
    });
  }

  private buildDeleteExistingPeriodsTransactions(
    queryResult: GetDisabilityRetirementPlanningWithRelationsQueryResult,
    operations: TransactionType[],
  ): void {
    for (const existingPeriod of queryResult.periods) {
      for (const disability of existingPeriod.disabilities) {
        for (const doc of disability.documents) {
          operations.push(
            this.periodDisabilityDocumentCommandRepositoryGateway.deleteDisabilityRetirementPlanningPeriodDisabilityDocument(
              new DisabilityRetirementPlanningPeriodDisabilityDocumentId(
                doc.id,
              ),
            ),
          );
        }
        operations.push(
          this.periodDisabilityCommandRepositoryGateway.deleteDisabilityRetirementPlanningPeriodDisability(
            new DisabilityRetirementPlanningPeriodDisabilityId(disability.id),
          ),
        );
      }
      for (const specialTime of existingPeriod.specialTimes) {
        for (const doc of specialTime.documents) {
          operations.push(
            this.periodSpecialTimeDocumentCommandRepositoryGateway.deleteDisabilityRetirementPlanningPeriodSpecialTimeDocument(
              new DisabilityRetirementPlanningPeriodSpecialTimeDocumentId(
                doc.id,
              ),
            ),
          );
        }
        operations.push(
          this.periodSpecialTimeCommandRepositoryGateway.deleteDisabilityRetirementPlanningPeriodSpecialTime(
            new DisabilityRetirementPlanningPeriodSpecialTimeId(specialTime.id),
          ),
        );
      }
      operations.push(
        this.periodCommandRepositoryGateway.deleteDisabilityRetirementPlanningPeriod(
          new DisabilityRetirementPlanningPeriodId(existingPeriod.id),
        ),
      );
    }
  }

  private async buildPeriodTransactions(
    periodDto: CreateDisabilityRetirementPlanningPeriodRequestDto,
    disabilityRetirementPlanning: DisabilityRetirementPlanningEntity,
  ): Promise<TransactionType[]> {
    const operations: TransactionType[] = [];

    const periodId = new DisabilityRetirementPlanningPeriodId();

    const period = new DisabilityRetirementPlanningPeriodEntity({
      id: periodId,
      disabilityRetirementPlanning,
      startDate: periodDto.startDate,
      endDate: periodDto.endDate ?? null,
      jobPosition: periodDto.jobPosition,
      careerName: periodDto.careerName,
      serviceType: periodDto.serviceType,
      department: periodDto.department,
    });

    operations.push(
      this.periodCommandRepositoryGateway.createDisabilityRetirementPlanningPeriod(
        period,
      ),
    );

    if (periodDto.disabilities && periodDto.disabilities.length > 0) {
      for (const disabilityDto of periodDto.disabilities) {
        const disabilityOperations = await this.buildDisabilityTransactions(
          disabilityDto,
          period,
        );

        operations.push(...disabilityOperations);
      }
    }

    if (periodDto.specialTimes && periodDto.specialTimes.length > 0) {
      for (const specialTimeDto of periodDto.specialTimes) {
        const specialTimeOperations = await this.buildSpecialTimeTransactions(
          specialTimeDto,
          period,
        );

        operations.push(...specialTimeOperations);
      }
    }

    return operations;
  }

  private async buildDisabilityTransactions(
    disabilityDto: CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto,
    period: DisabilityRetirementPlanningPeriodEntity,
  ): Promise<TransactionType[]> {
    const operations: TransactionType[] = [];

    const disabilityId = new DisabilityRetirementPlanningPeriodDisabilityId();

    const cidTenId = disabilityDto.cidTenId
      ? await this.cidTenQueryRepositoryGateway.findOneByIdOrFail(
          disabilityDto.cidTenId,
          CidTenNotFoundError,
        )
      : null;

    const disability = new DisabilityRetirementPlanningPeriodDisabilityEntity({
      id: disabilityId,
      disabilityRetirementPlanningPeriod: period,
      startDate: disabilityDto.startDate,
      endDate: disabilityDto.endDate ?? null,
      disabilityDegree: disabilityDto.disabilityDegree,
      disabilityCategory: disabilityDto.disabilityCategory,
      cidTenId: cidTenId ? cidTenId.id.toString() : null,
      disabilityType: disabilityDto.disabilityType,
      disabilityDescription: disabilityDto.disabilityDescription,
      activityImpact: disabilityDto.activityImpact,
    });

    operations.push(
      this.periodDisabilityCommandRepositoryGateway.createDisabilityRetirementPlanningPeriodDisability(
        disability,
      ),
    );

    if (disabilityDto.documents && disabilityDto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        disabilityDto.documents.map(async (documentDto) => {
          const buffer = documentDto.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const documentUrl =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity =
            new DisabilityRetirementPlanningPeriodDisabilityDocumentEntity({
              id: new DisabilityRetirementPlanningPeriodDisabilityDocumentId(),
              disabilityRetirementPlanningPeriodDisability: disability,
              document: documentUrl,
            });

          return this.periodDisabilityDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningPeriodDisabilityDocument(
            documentEntity,
          );
        }),
      );

      operations.push(...documentTransactions);
    }

    return operations;
  }

  private async buildSpecialTimeTransactions(
    specialTimeDto: CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto,
    period: DisabilityRetirementPlanningPeriodEntity,
  ): Promise<TransactionType[]> {
    const operations: TransactionType[] = [];

    const specialTimeId = new DisabilityRetirementPlanningPeriodSpecialTimeId();

    const specialTime =
      new DisabilityRetirementPlanningPeriodSpecialTimeEntity({
        id: specialTimeId,
        disabilityRetirementPlanningPeriod: period,
        startDate: specialTimeDto.startDate,
        endDate: specialTimeDto.endDate ?? null,
      });

    operations.push(
      this.periodSpecialTimeCommandRepositoryGateway.createDisabilityRetirementPlanningPeriodSpecialTime(
        specialTime,
      ),
    );

    if (specialTimeDto.documents && specialTimeDto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        specialTimeDto.documents.map(async (documentDto) => {
          const buffer = documentDto.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const documentUrl =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity =
            new DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity({
              id: new DisabilityRetirementPlanningPeriodSpecialTimeDocumentId(),
              disabilityRetirementPlanningPeriodSpecialTime: specialTime,
              document: documentUrl,
            });

          return this.periodSpecialTimeDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningPeriodSpecialTimeDocument(
            documentEntity,
          );
        }),
      );

      operations.push(...documentTransactions);
    }

    return operations;
  }
}
