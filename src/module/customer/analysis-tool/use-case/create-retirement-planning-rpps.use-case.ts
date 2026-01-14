import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-inss-benefit/command/retirement-planning-rpps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-legal-proceeding/command/retirement-planning-rpps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';
import { RetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.entity';
import { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';
import { CreateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rpps.request.dto';
import { CreateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRetirementPlanningRppsUseCase {
  protected readonly _type = CreateRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodCommandRepositoryGateway: RetirementPlanningRppsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodDisabilityCommandRepositoryGateway: RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway: RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRppsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsInssBenefitCommandRepositoryGateway)
    private readonly retirementPlanningRppsInssBenefitCommandRepositoryGateway: RetirementPlanningRppsInssBenefitCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsLegalProceedingCommandRepositoryGateway)
    private readonly retirementPlanningRppsLegalProceedingCommandRepositoryGateway: RetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPlanningRppsRequestDto,
  ): Promise<CreateRetirementPlanningRppsResponseDto> {
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

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const retirementPlanningRppsId = new RetirementPlanningRppsId();

    const retirementPlanningRpps = new RetirementPlanningRppsEntity({
      id: retirementPlanningRppsId,
      careerStartDate: dto.careerStartDate,
      publicServiceStartDate: dto.publicServiceStartDate,
    });

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RPPS,
      retirementPlanningRpps,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactionOperations: TransactionType[] = [];

    transactionOperations.push(
      this.retirementPlanningRppsCommandRepositoryGateway.createRetirementPlanningRpps(
        retirementPlanningRpps,
      ),
    );

    if (dto.ctcDocuments && dto.ctcDocuments.length > 0) {
      const ctcDocumentTransactions = await Promise.all(
        dto.ctcDocuments.map(async (documentDto) => {
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

          const periodDocument = new RetirementPlanningRppsPeriodDocumentEntity(
            {
              id: periodDocumentId,
              documentType:
                documentDto.type ??
                RetirementPlanningDocumentTypeEnum.CTC_DOCUMENT,
              document: documentUrl,
              retirementPlanningRppsPeriodDisability: null,
              retirementPlanningRppsPeriodSpecialTime: null,
              retirementPlanningRpps,
            },
          );

          return this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
            periodDocument,
          );
        }),
      );

      transactionOperations.push(...ctcDocumentTransactions);
    }

    if (dto.inssBenefitNumbers && dto.inssBenefitNumbers.length > 0) {
      for (const inssBenefitNumber of dto.inssBenefitNumbers) {
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

    if (dto.legalProceedings && dto.legalProceedings.length > 0) {
      for (const legalProceedingNumber of dto.legalProceedings) {
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

    for (const periodDto of dto.periods) {
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

      transactionOperations.push(
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
          retirementPlanningRppsPeriod: period,
          cidTen: new CidTenEntity({ ...cidTen }),
        });

        transactionOperations.push(
          this.retirementPlanningRppsPeriodDisabilityCommandRepositoryGateway.createRetirementPlanningRppsPeriodDisability(
            disability,
          ),
        );

        if (
          periodDto.disability.documents &&
          periodDto.disability.documents.length > 0
        ) {
          const disabilityDocumentTransactions = await Promise.all(
            periodDto.disability.documents.map(async (documentDto) => {
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

              return this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
                periodDocument,
              );
            }),
          );

          transactionOperations.push(...disabilityDocumentTransactions);
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

        transactionOperations.push(
          this.retirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway.createRetirementPlanningRppsPeriodSpecialTime(
            specialTime,
          ),
        );

        if (
          periodDto.specialTime.documents &&
          periodDto.specialTime.documents.length > 0
        ) {
          const specialTimeDocumentTransactions = await Promise.all(
            periodDto.specialTime.documents.map(async (documentDto) => {
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

              return this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
                periodDocument,
              );
            }),
          );

          transactionOperations.push(...specialTimeDocumentTransactions);
        }
      }
    }

    transactionOperations.push(
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRetirementPlanningRppsResponseDto.build({
      retirementPlanningRppsId,
    });
  }
}
