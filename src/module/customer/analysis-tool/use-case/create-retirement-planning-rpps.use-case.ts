import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rpps.request.dto';
import { CreateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

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
      for (const documentDto of dto.ctcDocuments) {
        const periodDocumentId = new RetirementPlanningRppsPeriodDocumentId();

        const periodDocument = new RetirementPlanningRppsPeriodDocumentEntity({
          id: periodDocumentId,
          documentType:
            documentDto.type ?? RetirementPlanningDocumentTypeEnum.CTC_DOCUMENT,
          document: documentDto.document.toString(),
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
          cidTen,
          retirementPlanningRppsPeriod: period,
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
          for (const documentDto of periodDto.disability.documents) {
            const periodDocumentId =
              new RetirementPlanningRppsPeriodDocumentId();

            const periodDocument =
              new RetirementPlanningRppsPeriodDocumentEntity({
                id: periodDocumentId,
                documentType: documentDto.type,
                document: documentDto.document.toString(),
                retirementPlanningRppsPeriodDisability: disability,
                retirementPlanningRppsPeriodSpecialTime: null,
                retirementPlanningRpps: null,
              });

            transactionOperations.push(
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

        transactionOperations.push(
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

            const periodDocument =
              new RetirementPlanningRppsPeriodDocumentEntity({
                id: periodDocumentId,
                documentType: documentDto.type,
                document: documentDto.document.toString(),
                retirementPlanningRppsPeriodDisability: null,
                retirementPlanningRppsPeriodSpecialTime: specialTime,
                retirementPlanningRpps: null,
              });

            transactionOperations.push(
              this.retirementPlanningRppsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRppsPeriodDocument(
                periodDocument,
              ),
            );
          }
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
