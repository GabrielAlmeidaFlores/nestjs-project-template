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
import { TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/command/temporary-disability-benefits-terminated.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-inss-benefit/command/temporary-disability-benefits-terminated-inss-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity';
import { CreateTemporaryDisabilityBenefitsTerminatedRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated.request.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTemporaryDisabilityBenefitsTerminatedRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedResponseDto> {
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

    const temporaryDisabilityBenefitsTerminated =
      new TemporaryDisabilityBenefitsTerminatedEntity({
        analysisName: dto.analysisName ?? null,
        requestEntryDate: dto.requestEntryDate ?? null,
        benefitCessationDate: dto.benefitCessationDate ?? null,
        category: dto.category ?? null,
        myInssPassword: dto.myInssPassword ?? null,
        benefitCessationReason: dto.benefitCessationReason ?? null,
      });

    const inssBenefitEntities = (dto.inssBenefitNumber ?? []).map(
      (inssBenefit) =>
        new TemporaryDisabilityBenefitsTerminatedInssBenefitEntity({
          inssBenefit,
          temporaryDisabilityBenefitsTerminatedId:
            temporaryDisabilityBenefitsTerminated.id,
        }),
    );

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
      type: AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED,
      cnisFastAnalysis: null,
      temporaryDisabilityBenefitsTerminated,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      temporaryDisabilityBenefitsTerminated,
      inssBenefitEntities,
      analysisToolRecord,
    );

    return CreateTemporaryDisabilityBenefitsTerminatedResponseDto.build({
      temporaryDisabilityBenefitsTerminatedId:
        temporaryDisabilityBenefitsTerminated.id,
    });
  }

  private async createOnDatabase(
    temporaryDisabilityBenefitsTerminated: TemporaryDisabilityBenefitsTerminatedEntity,
    inssBenefitEntities: TemporaryDisabilityBenefitsTerminatedInssBenefitEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const rejectionTransaction =
      this.temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminated(
        temporaryDisabilityBenefitsTerminated,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.temporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedInssBenefit(
        entity,
      ),
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      rejectionTransaction,
      ...inssBenefitTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
