import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-inss-benefit/command/retirement-planning-rpps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-legal-proceeding/command/retirement-planning-rpps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';
import { RetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.entity';
import { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import {
  UpdateRetirementPlanningRppsPeriodRequestDto,
  UpdateRetirementPlanningRppsRequestDto,
} from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/update-retirement-planning-rpps.request.dto';
import { UpdateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/update-retirement-planning-rpps.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRetirementPlanningRppsUseCase {
  protected readonly _type = UpdateRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodCommandRepositoryGateway: RetirementPlanningRppsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodDisabilityCommandRepositoryGateway: RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway: RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsInssBenefitCommandRepositoryGateway)
    private readonly retirementPlanningRppsInssBenefitCommandRepositoryGateway: RetirementPlanningRppsInssBenefitCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsLegalProceedingCommandRepositoryGateway)
    private readonly retirementPlanningRppsLegalProceedingCommandRepositoryGateway: RetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    dto: UpdateRetirementPlanningRppsRequestDto,
  ): Promise<UpdateRetirementPlanningRppsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRppsQueryResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRppsNotFoundError,
      );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const retirementPlanningRppsRemunerationCalculation =
      retirementPlanningRppsQueryResult.retirementPlanningRppsRemunerationCalculation
        ? new RetirementPlanningRppsRemunerationCalculationEntity({
            ...retirementPlanningRppsQueryResult.retirementPlanningRppsRemunerationCalculation,
          })
        : null;

    const retirementPlanningRpps = new RetirementPlanningRppsEntity({
      id: retirementPlanningRppsQueryResult.id,
      careerStartDate: dto.careerStartDate,
      publicServiceStartDate: dto.publicServiceStartDate,
      retirementPlanningRppsRemunerationCalculation,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      retirementPlanningRpps,
      analysisToolClient,
      cnisFastAnalysis: null,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const transactionOperations: TransactionType[] = [];

    if (retirementPlanningRppsQueryResult.ctcDocuments.length > 0) {
      for (const ctcDocument of retirementPlanningRppsQueryResult.ctcDocuments) {
        transactionOperations.push(
          this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.deleteRetirementPlanningRppsPeriodDocument(
            ctcDocument.id,
          ),
        );
      }
    }

    if (dto.ctcDocuments && dto.ctcDocuments.length > 0) {
      for (const documentDto of dto.ctcDocuments) {
        const periodDocumentId = new RetirementPlanningRppsPeriodDocumentId();

        const buffer = documentDto.document.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.document.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        const periodDocument = new RetirementPlanningRppsPeriodDocumentEntity({
          id: periodDocumentId,
          documentType:
            documentDto.type ?? RetirementPlanningDocumentTypeEnum.CTC_DOCUMENT,
          document: documentUrl,
          retirementPlanningRppsPeriodDisability: null,
          retirementPlanningRppsPeriodSpecialTime: null,
          retirementPlanningRpps,
        });

        transactionOperations.push(
          this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
            periodDocument,
          ),
        );
      }
    }

    if (
      retirementPlanningRppsQueryResult.retirementPlanningRppsInssBenefit
        .length > 0
    ) {
      for (const inssBenefit of retirementPlanningRppsQueryResult.retirementPlanningRppsInssBenefit) {
        transactionOperations.push(
          this.retirementPlanningRppsInssBenefitCommandRepositoryGateway.deleteRetirementPlanningRppsInssBenefit(
            inssBenefit.id,
          ),
        );
      }
    }

    if (dto.inssBenefitNumber && dto.inssBenefitNumber.length > 0) {
      for (const inssBenefitNumber of dto.inssBenefitNumber) {
        const inssBenefitId = new RetirementPlanningRppsInssBenefitId();

        const inssBenefit = new RetirementPlanningRppsInssBenefitEntity({
          id: inssBenefitId,
          inssBenefitNumber,
          retirementPlanningRpps,
        });

        transactionOperations.push(
          this.retirementPlanningRppsInssBenefitCommandRepositoryGateway.createRetirementPlanningRppsInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (
      retirementPlanningRppsQueryResult.retirementPlanningRppsLegalProceeding
        .length > 0
    ) {
      for (const legalProceeding of retirementPlanningRppsQueryResult.retirementPlanningRppsLegalProceeding) {
        transactionOperations.push(
          this.retirementPlanningRppsLegalProceedingCommandRepositoryGateway.deleteRetirementPlanningRppsLegalProceeding(
            legalProceeding.id,
          ),
        );
      }
    }

    if (dto.legalProceedingNumber && dto.legalProceedingNumber.length > 0) {
      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        const legalProceedingId = new RetirementPlanningRppsLegalProceedingId();

        const legalProceeding = new RetirementPlanningRppsLegalProceedingEntity(
          {
            id: legalProceedingId,
            legalProceeding: legalProceedingNumber,
            retirementPlanningRpps,
          },
        );

        transactionOperations.push(
          this.retirementPlanningRppsLegalProceedingCommandRepositoryGateway.createRetirementPlanningRppsLegalProceeding(
            legalProceeding,
          ),
        );
      }
    }

    const periodsTransactions = await this.updatePeriodsOnDatabase(
      retirementPlanningRpps,
      retirementPlanningRppsQueryResult.periods,
      dto.periods,
    );

    transactionOperations.push(...periodsTransactions);

    const retirementPlanningRppsTransaction =
      this.retirementPlanningRppsCommandRepositoryGateway.updateRetirementPlanningRpps(
        retirementPlanningRpps.id,
        retirementPlanningRpps,
      );
    transactionOperations.push(retirementPlanningRppsTransaction);

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );
    transactionOperations.push(analysisToolRecordTransaction);

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(
        transactionOperations,
      );
    await executeTransactions.commit();

    return UpdateRetirementPlanningRppsResponseDto.build({
      retirementPlanningRppsId,
    });
  }

  private async updatePeriodsOnDatabase(
    retirementPlanningRpps: RetirementPlanningRppsEntity,
    currentPeriods: GetRetirementPlanningRppsPeriodQueryResult[],
    newPeriods: UpdateRetirementPlanningRppsPeriodRequestDto[],
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    for (const currentPeriod of currentPeriods) {
      if (currentPeriod.specialTimePeriod) {
        transactions.push(
          this.retirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway.deleteRetirementPlanningRppsPeriodSpecialTime(
            currentPeriod.specialTimePeriod.id,
          ),
        );
      }

      if (currentPeriod.disabilityPeriod) {
        transactions.push(
          this.retirementPlanningRppsPeriodDisabilityCommandRepositoryGateway.deleteRetirementPlanningRppsPeriodDisability(
            currentPeriod.disabilityPeriod.id,
          ),
        );
      }

      transactions.push(
        this.retirementPlanningRppsPeriodCommandRepositoryGateway.deleteRetirementPlanningRppsPeriod(
          currentPeriod.id,
        ),
      );
    }

    for (const periodDto of newPeriods) {
      const periodId = new RetirementPlanningRppsPeriodId();
      const period = new RetirementPlanningRppsPeriodEntity({
        id: periodId,
        startDate: periodDto.startDate,
        endDate: periodDto.endDate,
        jobPosition: periodDto.jobPosition,
        career: periodDto.career,
        serviceType: periodDto.serviceType,
        department: periodDto.department,
        retirementPlanningRpps,
      });

      transactions.push(
        this.retirementPlanningRppsPeriodCommandRepositoryGateway.createRetirementPlanningRppsPeriod(
          period,
        ),
      );

      if (periodDto.disability) {
        const disabilityId = new RetirementPlanningRppsPeriodDisabilityId();

        const cidTen =
          await this.cidTenQueryRepositoryGateway.findOneByIdOrFail(
            periodDto.disability.cidTenId,
            CidTenNotFoundError,
          );

        const disability = new RetirementPlanningRppsPeriodDisabilityEntity({
          id: disabilityId,
          type: periodDto.disability.type,
          degree: periodDto.disability.degree,
          startDate: periodDto.disability.startDate,
          endDate: periodDto.disability.endDate,
          category: periodDto.disability.category,
          description: periodDto.disability.description,
          dailyImpact: periodDto.disability.dailyImpact,
          cidTen: new CidTenEntity({ ...cidTen }),
          retirementPlanningRppsPeriod: period,
        });

        transactions.push(
          this.retirementPlanningRppsPeriodDisabilityCommandRepositoryGateway.createRetirementPlanningRppsPeriodDisability(
            disability,
          ),
        );

        if (
          periodDto.disability.documents &&
          periodDto.disability.documents.length > 0
        ) {
          for (const documentDto of periodDto.disability.documents) {
            const periodDocumentId =
              new RetirementPlanningRppsPeriodDocumentId();

            const buffer = documentDto.document.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.document.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            const periodDocument =
              new RetirementPlanningRppsPeriodDocumentEntity({
                id: periodDocumentId,
                documentType: documentDto.type,
                document: documentUrl,
                retirementPlanningRppsPeriodDisability: disability,
                retirementPlanningRppsPeriodSpecialTime: null,
                retirementPlanningRpps: null,
              });

            transactions.push(
              this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
                periodDocument,
              ),
            );
          }
        }
      }

      if (periodDto.specialTime) {
        const specialTimeId = new RetirementPlanningRppsPeriodSpecialTimeId();

        const specialTime = new RetirementPlanningRppsPeriodSpecialTimeEntity({
          id: specialTimeId,
          type: periodDto.specialTime.type,
          startDate: periodDto.specialTime.startDate,
          endDate: periodDto.specialTime.endDate,
          retirementPlanningRppsPeriod: period,
        });

        transactions.push(
          this.retirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway.createRetirementPlanningRppsPeriodSpecialTime(
            specialTime,
          ),
        );

        if (
          periodDto.specialTime.documents &&
          periodDto.specialTime.documents.length > 0
        ) {
          for (const documentDto of periodDto.specialTime.documents) {
            const periodDocumentId =
              new RetirementPlanningRppsPeriodDocumentId();

            const buffer = documentDto.document.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.document.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            const periodDocument =
              new RetirementPlanningRppsPeriodDocumentEntity({
                id: periodDocumentId,
                documentType: documentDto.type,
                document: documentUrl,
                retirementPlanningRppsPeriodDisability: null,
                retirementPlanningRppsPeriodSpecialTime: specialTime,
                retirementPlanningRpps: null,
              });

            transactions.push(
              this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
                periodDocument,
              ),
            );
          }
        }
      }
    }

    return transactions;
  }
}
