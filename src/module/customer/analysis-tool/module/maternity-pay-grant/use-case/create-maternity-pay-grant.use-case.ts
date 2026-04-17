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
import { MaternityPayGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/command/maternity-pay-grant.command.repository.gateway';
import { MaternityPayGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-inss-benefit/command/maternity-pay-grant-inss-benefit.command.repository.gateway';
import { MaternityPayGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-legal-proceeding/command/maternity-pay-grant-legal-proceeding.command.repository.gateway';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';
import { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';
import { CreateMaternityPayGrantRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/create-maternity-pay-grant.request.dto';
import { CreateMaternityPayGrantResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMaternityPayGrantUseCase {
  protected readonly _type = CreateMaternityPayGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(MaternityPayGrantCommandRepositoryGateway)
    private readonly maternityPayGrantCommandRepositoryGateway: MaternityPayGrantCommandRepositoryGateway,
    @Inject(MaternityPayGrantInssBenefitCommandRepositoryGateway)
    private readonly maternityPayGrantInssBenefitCommandRepositoryGateway: MaternityPayGrantInssBenefitCommandRepositoryGateway,
    @Inject(MaternityPayGrantLegalProceedingCommandRepositoryGateway)
    private readonly maternityPayGrantLegalProceedingCommandRepositoryGateway: MaternityPayGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateMaternityPayGrantRequestDto,
  ): Promise<CreateMaternityPayGrantResponseDto> {
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

    const maternityPayGrant = new MaternityPayGrantEntity({
      analysisName: dto.analysisName ?? null,
      category: dto.category ?? null,
      triggeringEvent: dto.triggeringEvent ?? null,
      triggeringEventDate: dto.triggeringEventDate ?? null,
      isTriggeringEventDateValid:
        dto.triggeringEventDate !== undefined
          ? this.isTriggeringEventDateWithinFiveYears(dto.triggeringEventDate)
          : null,
      myInssPassword: dto.myInssPassword ?? null,
      isCurrentlyUnemployed: dto.isCurrentlyUnemployed ?? null,
    });

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new MaternityPayGrantInssBenefitEntity({
                inssBenefitNumber: value,
                maternityPayGrantId: maternityPayGrant.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new MaternityPayGrantLegalProceedingEntity({
                legalProceedingNumber: value,
                maternityPayGrantId: maternityPayGrant.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      maternityPayGrant,
      inssBenefitEntities,
      legalProceedingEntities,
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
      type: AnalysisToolRecordTypeEnum.MATERNITY_PAY_GRANT,
      cnisFastAnalysis: null,
      maternityPayGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateMaternityPayGrantResponseDto.build({
      maternityPayGrantId: maternityPayGrant.id,
    });
  }

  private async createOnDatabase(
    maternityPayGrant: MaternityPayGrantEntity,
    inssBenefitEntities: MaternityPayGrantInssBenefitEntity[],
    legalProceedingEntities: MaternityPayGrantLegalProceedingEntity[],
  ): Promise<void> {
    const maternityPayGrantTransaction =
      this.maternityPayGrantCommandRepositoryGateway.createMaternityPayGrant(
        maternityPayGrant,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.maternityPayGrantInssBenefitCommandRepositoryGateway.createMaternityPayGrantInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.maternityPayGrantLegalProceedingCommandRepositoryGateway.createMaternityPayGrantLegalProceeding(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      maternityPayGrantTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ]);

    await transaction.commit();
  }

  private async createAnalysisToolRecordOnDatabase(
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }

  private isTriggeringEventDateWithinFiveYears(date: Date): boolean {
    const maxYears = 5;
    const today = new Date();
    const limitDate = new Date(today);
    limitDate.setFullYear(today.getFullYear() - maxYears);

    return date >= limitDate && date <= today;
  }
}
