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
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-institutor/command/death-benefit-grant-institutor.command.repository.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-representative/command/death-benefit-grant-legal-representative.command.repository.gateway';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import { CreateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant.request.dto';
import { CreateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDeathBenefitGrantUseCase {
  protected readonly _type = CreateDeathBenefitGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DeathBenefitGrantCommandRepositoryGateway)
    private readonly deathBenefitGrantCommandRepositoryGateway: DeathBenefitGrantCommandRepositoryGateway,
    @Inject(DeathBenefitGrantInstitorCommandRepositoryGateway)
    private readonly deathBenefitGrantInstitorCommandRepositoryGateway: DeathBenefitGrantInstitorCommandRepositoryGateway,
    @Inject(DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway)
    private readonly deathBenefitGrantLegalRepresentativeCommandRepositoryGateway: DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway,
    @Inject(DeathBenefitGrantInssBenefitCommandRepositoryGateway)
    private readonly deathBenefitGrantInssBenefitCommandRepositoryGateway: DeathBenefitGrantInssBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitGrantLegalProceedingCommandRepositoryGateway)
    private readonly deathBenefitGrantLegalProceedingCommandRepositoryGateway: DeathBenefitGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateDeathBenefitGrantRequestDto,
  ): Promise<CreateDeathBenefitGrantResponseDto> {
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

    const deathBenefitGrant = new DeathBenefitGrantEntity({
      analysisName: dto.analysisName ?? null,
    });

    const institutorEntity = new DeathBenefitGrantInstitorEntity({
      name: dto.institutor.name ?? null,
      cpf:
        dto.institutor.cpf !== undefined
          ? new PersonalDocument(dto.institutor.cpf)
          : null,
      birthDate: dto.institutor.birthDate ?? null,
      gender: dto.institutor.gender ?? null,
      deathDate: dto.institutor.deathDate ?? null,
      wasRetired: dto.institutor.wasRetired ?? null,
      deathBenefitGrantId: deathBenefitGrant.id,
    });

    const legalRepresentativeEntity =
      dto.legalRepresentative !== undefined
        ? new DeathBenefitGrantLegalRepresentativeEntity({
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
            deathBenefitGrantId: deathBenefitGrant.id,
          })
        : null;

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new DeathBenefitGrantInssBenefitEntity({
                inssBenefit: value,
                deathBenefitGrantId: deathBenefitGrant.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new DeathBenefitGrantLegalProceedingEntity({
                legalProceedingNumber: value,
                deathBenefitGrantId: deathBenefitGrant.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      deathBenefitGrant,
      institutorEntity,
      legalRepresentativeEntity,
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
      type: AnalysisToolRecordTypeEnum.DEATH_BENEFIT_GRANT,
      cnisFastAnalysis: null,
      deathBenefitGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateDeathBenefitGrantResponseDto.build({
      deathBenefitGrantId: deathBenefitGrant.id,
    });
  }

  private async createOnDatabase(
    deathBenefitGrant: DeathBenefitGrantEntity,
    institorEntity: DeathBenefitGrantInstitorEntity,
    legalRepresentativeEntity: DeathBenefitGrantLegalRepresentativeEntity | null,
    inssBenefitEntities: DeathBenefitGrantInssBenefitEntity[],
    legalProceedingEntities: DeathBenefitGrantLegalProceedingEntity[],
  ): Promise<void> {
    const deathBenefitGrantTransaction =
      this.deathBenefitGrantCommandRepositoryGateway.createDeathBenefitGrant(
        deathBenefitGrant,
      );

    const institorTransaction =
      this.deathBenefitGrantInstitorCommandRepositoryGateway.createDeathBenefitGrantBenefitInstitutor(
        institorEntity,
      );

    const legalRepresentativeTransactions =
      legalRepresentativeEntity !== null
        ? [
            this.deathBenefitGrantLegalRepresentativeCommandRepositoryGateway.createDeathBenefitGrantLegalRepresentative(
              legalRepresentativeEntity,
            ),
          ]
        : [];

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.deathBenefitGrantInssBenefitCommandRepositoryGateway.createDeathBenefitGrantInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.createDeathBenefitGrantLegalProceeding(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deathBenefitGrantTransaction,
      institorTransaction,
      ...legalRepresentativeTransactions,
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
}
