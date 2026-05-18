import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
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
import { DeathBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/command/death-benefit-rejection.command.repository.gateway';
import { DeathBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-inss-benefit/command/death-benefit-rejection-inss-benefit.command.repository.gateway';
import { DeathBenefitRejectionInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-institutor/command/death-benefit-rejection-institutor.command.repository.gateway';
import { DeathBenefitRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-proceeding/command/death-benefit-rejection-legal-proceeding.command.repository.gateway';
import { DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-representative/command/death-benefit-rejection-legal-representative.command.repository.gateway';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';
import { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import { CreateDeathBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/create-death-benefit-rejection.request.dto';
import { CreateDeathBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDeathBenefitRejectionUseCase {
  protected readonly _type = CreateDeathBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DeathBenefitRejectionCommandRepositoryGateway)
    private readonly deathBenefitRejectionCommandRepositoryGateway: DeathBenefitRejectionCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionInstitorCommandRepositoryGateway)
    private readonly deathBenefitRejectionInstitorCommandRepositoryGateway: DeathBenefitRejectionInstitorCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway)
    private readonly deathBenefitRejectionLegalRepresentativeCommandRepositoryGateway: DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionInssBenefitCommandRepositoryGateway)
    private readonly deathBenefitRejectionInssBenefitCommandRepositoryGateway: DeathBenefitRejectionInssBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionLegalProceedingCommandRepositoryGateway)
    private readonly deathBenefitRejectionLegalProceedingCommandRepositoryGateway: DeathBenefitRejectionLegalProceedingCommandRepositoryGateway,
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
    dto: CreateDeathBenefitRejectionRequestDto,
  ): Promise<CreateDeathBenefitRejectionResponseDto> {
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

    const deathBenefitRejection = new DeathBenefitRejectionEntity({
      analysisName: dto.analysisName ?? null,
      category: dto.category ?? null,
    });

    const institutorEntity = new DeathBenefitRejectionInstitorEntity({
      name: dto.institutor.name ?? null,
      cpf:
        dto.institutor.cpf !== undefined
          ? new PersonalDocument(dto.institutor.cpf)
          : null,
      birthDate: dto.institutor.birthDate ?? null,
      gender: dto.institutor.gender ?? null,
      deathDate: dto.institutor.deathDate ?? null,
      wasRetired: dto.institutor.wasRetired ?? null,
      deathBenefitRejectionId: deathBenefitRejection.id,
    });

    const legalRepresentativeEntity =
      dto.legalRepresentative !== undefined
        ? new DeathBenefitRejectionLegalRepresentativeEntity({
            name: dto.legalRepresentative.name ?? null,
            cpf:
              dto.legalRepresentative.cpf !== undefined
                ? new PersonalDocument(dto.legalRepresentative.cpf)
                : null,
            birthDate: dto.legalRepresentative.birthDate ?? null,
            isMinorUnderGuardianship:
              dto.legalRepresentative.isMinorUnderGuardianship ?? null,
            legalRepresentativeRelationship:
              dto.legalRepresentative.legalRepresentativeRelationship ?? null,
            deathBenefitRejectionId: deathBenefitRejection.id,
          })
        : null;

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new DeathBenefitRejectionInssBenefitEntity({
                inssBenefit: value,
                deathBenefitRejectionId: deathBenefitRejection.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new DeathBenefitRejectionLegalProceedingEntity({
                legalProceedingNumber: value,
                deathBenefitRejectionId: deathBenefitRejection.id,
              }),
          )
        : [];

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
      type: AnalysisToolRecordTypeEnum.DEATH_BENEFIT_REJECTION,
      cnisFastAnalysis: null,
      deathBenefitRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      deathBenefitRejection,
      institutorEntity,
      legalRepresentativeEntity,
      inssBenefitEntities,
      legalProceedingEntities,
      analysisToolRecord,
    );

    return CreateDeathBenefitRejectionResponseDto.build({
      deathBenefitRejectionId: deathBenefitRejection.id,
    });
  }

  private async createOnDatabase(
    deathBenefitRejection: DeathBenefitRejectionEntity,
    institorEntity: DeathBenefitRejectionInstitorEntity,
    legalRepresentativeEntity: DeathBenefitRejectionLegalRepresentativeEntity | null,
    inssBenefitEntities: DeathBenefitRejectionInssBenefitEntity[],
    legalProceedingEntities: DeathBenefitRejectionLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const deathBenefitRejectionTransaction =
      this.deathBenefitRejectionCommandRepositoryGateway.createDeathBenefitRejection(
        deathBenefitRejection,
      );

    const institorTransaction =
      this.deathBenefitRejectionInstitorCommandRepositoryGateway.createDeathBenefitRejectionBenefitInstitutor(
        institorEntity,
      );

    const legalRepresentativeTransactions =
      legalRepresentativeEntity !== null
        ? [
            this.deathBenefitRejectionLegalRepresentativeCommandRepositoryGateway.createDeathBenefitRejectionLegalRepresentative(
              legalRepresentativeEntity,
            ),
          ]
        : [];

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.deathBenefitRejectionInssBenefitCommandRepositoryGateway.createDeathBenefitRejectionInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.deathBenefitRejectionLegalProceedingCommandRepositoryGateway.createDeathBenefitRejectionLegalProceeding(
        value,
      ),
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deathBenefitRejectionTransaction,
      institorTransaction,
      ...legalRepresentativeTransactions,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
