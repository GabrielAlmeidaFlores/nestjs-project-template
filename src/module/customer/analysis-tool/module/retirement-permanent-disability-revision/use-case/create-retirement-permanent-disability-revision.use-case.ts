import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPermanentDisabilityRevisionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/command/retirement-permanent-disability-revision.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/command/retirement-permanent-disability-revision-inss-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/command/retirement-permanent-disability-revision-legal-proceeding.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-benefit.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding.entity';
import { CreateRetirementPermanentDisabilityRevisionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/create-retirement-permanent-disability-revision.request.dto';
import { CreateRetirementPermanentDisabilityRevisionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPermanentDisabilityRevisionUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRevisionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionCommandRepositoryGateway: RetirementPermanentDisabilityRevisionCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway: RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway: RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPermanentDisabilityRevisionRequestDto,
  ): Promise<CreateRetirementPermanentDisabilityRevisionResponseDto> {
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

    const retirementPermanentDisabilityRevision =
      new RetirementPermanentDisabilityRevisionEntity({
        analysisName: dto.analysisName ?? null,
        category: dto.category ?? null,
        myInssPassword: dto.myInssPassword ?? null,
      });

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new RetirementPermanentDisabilityRevisionInssBenefitEntity({
                inssBenefitNumber: value,
                retirementPermanentDisabilityRevision:
                  retirementPermanentDisabilityRevision.id,
              }),
          )
        : undefined;

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new RetirementPermanentDisabilityRevisionLegalProceedingEntity({
                legalProceedingNumber: value,
                retirementPermanentDisabilityRevisionId:
                  retirementPermanentDisabilityRevision.id,
              }),
          )
        : undefined;

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION,
      cnisFastAnalysis: null,
      retirementPermanentDisabilityRevision,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      retirementPermanentDisabilityRevision,
      analysisToolRecord,
      inssBenefitEntities,
      legalProceedingEntities,
    );

    return CreateRetirementPermanentDisabilityRevisionResponseDto.build({
      retirementPermanentDisabilityRevisionId:
        retirementPermanentDisabilityRevision.id,
    });
  }

  private async createOnDatabase(
    retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionEntity,
    analysisToolRecord: AnalysisToolRecordEntity,
    inssBenefitEntities?: RetirementPermanentDisabilityRevisionInssBenefitEntity[],
    legalProceedingEntities?: RetirementPermanentDisabilityRevisionLegalProceedingEntity[],
  ): Promise<void> {
    const retirementPermanentDisabilityTransacion =
      this.retirementPermanentDisabilityRevisionCommandRepositoryGateway.createRetirementPermanentDisabilityRevision(
        retirementPermanentDisabilityRevision,
      );

    const inssBenefitTransactions =
      inssBenefitEntities !== undefined
        ? inssBenefitEntities.map((entity) =>
            this.retirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionInssBenefit(
              entity,
            ),
          )
        : [];

    const legalProceedingTransactions =
      legalProceedingEntities !== undefined
        ? legalProceedingEntities.map((entity) =>
            this.retirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionLegalProceeding(
              entity,
            ),
          )
        : [];

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      retirementPermanentDisabilityTransacion,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
