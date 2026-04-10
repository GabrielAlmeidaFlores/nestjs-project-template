import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-institutor/command/death-benefit-grant-institutor.command.repository.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-representative/command/death-benefit-grant-legal-representative.command.repository.gateway';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';
import { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import { UpdateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant.request.dto';
import { UpdateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDeathBenefitGrantUseCase {
  protected readonly _type = UpdateDeathBenefitGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
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
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: UpdateDeathBenefitGrantRequestDto,
  ): Promise<UpdateDeathBenefitGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDeathBenefitGrant =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const updatedDeathBenefitGrant = new DeathBenefitGrantEntity({
      id: deathBenefitGrantId,
      analysisName: dto.analysisName ?? existingDeathBenefitGrant.analysisName,
      deathBenefitGrantResultId:
        existingDeathBenefitGrant.deathBenefitGrantResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.deathBenefitGrantCommandRepositoryGateway.updateDeathBenefitGrant(
        deathBenefitGrantId,
        updatedDeathBenefitGrant,
      ),
    ];

    if (dto.institutor !== undefined) {
      const existingInstitutor =
        existingDeathBenefitGrant.deathBenefitGrantBenefitInstitutor;

      const institutorEntity = new DeathBenefitGrantInstitorEntity({
        name: dto.institutor.name ?? existingInstitutor?.name ?? null,
        cpf:
          dto.institutor.cpf !== undefined
            ? new PersonalDocument(dto.institutor.cpf)
            : (existingInstitutor?.cpf ?? null),
        birthDate:
          dto.institutor.birthDate ?? existingInstitutor?.birthDate ?? null,
        gender: dto.institutor.gender ?? existingInstitutor?.gender ?? null,
        deathDate:
          dto.institutor.deathDate ?? existingInstitutor?.deathDate ?? null,
        wasRetired:
          dto.institutor.wasRetired ?? existingInstitutor?.wasRetired ?? null,
        deathBenefitGrantId,
      });

      if (existingInstitutor !== null) {
        transactions.push(
          this.deathBenefitGrantInstitorCommandRepositoryGateway.deleteDeathBenefitGrantBenefitInstitutor(
            existingInstitutor.id,
          ),
        );
      }

      transactions.push(
        this.deathBenefitGrantInstitorCommandRepositoryGateway.createDeathBenefitGrantBenefitInstitutor(
          institutorEntity,
        ),
      );
    }

    if (dto.legalRepresentative !== undefined) {
      const existingLegalRepresentative =
        existingDeathBenefitGrant.deathBenefitGrantLegalRepresentative;

      const legalRepresentativeEntity =
        new DeathBenefitGrantLegalRepresentativeEntity({
          name:
            dto.legalRepresentative.name ??
            existingLegalRepresentative?.name ??
            null,
          cpf:
            dto.legalRepresentative.cpf !== undefined
              ? new PersonalDocument(dto.legalRepresentative.cpf)
              : (existingLegalRepresentative?.cpf ?? null),
          birthDate:
            dto.legalRepresentative.birthDate ??
            existingLegalRepresentative?.birthDate ??
            null,
          isMinorUnderGuardianship:
            dto.legalRepresentative.isMinorUnderGuardianship ??
            existingLegalRepresentative?.isMinorUnderGuardianship ??
            null,
          legalRepresentativeRelationship:
            dto.legalRepresentative.legalRepresentativeRelationship ??
            existingLegalRepresentative?.legalRepresentativeRelationship ??
            null,
          deathBenefitGrantId,
        });

      if (existingLegalRepresentative !== null) {
        transactions.push(
          this.deathBenefitGrantLegalRepresentativeCommandRepositoryGateway.deleteDeathBenefitGrantLegalRepresentative(
            existingLegalRepresentative.id,
          ),
        );
      }

      transactions.push(
        this.deathBenefitGrantLegalRepresentativeCommandRepositoryGateway.createDeathBenefitGrantLegalRepresentative(
          legalRepresentativeEntity,
        ),
      );
    }

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.deathBenefitGrantInssBenefitCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
          deathBenefitGrantId,
        ),
      );

      dto.inssBenefitNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitGrantInssBenefitCommandRepositoryGateway.createDeathBenefitGrantInssBenefit(
            new DeathBenefitGrantInssBenefitEntity({
              id: new DeathBenefitGrantInssBenefitId(),
              inssBenefit: value,
              deathBenefitGrantId,
            }),
          ),
        );
      });
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
          deathBenefitGrantId,
        ),
      );

      dto.legalProceedingNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.createDeathBenefitGrantLegalProceeding(
            new DeathBenefitGrantLegalProceedingEntity({
              id: new DeathBenefitGrantLegalProceedingId(),
              legalProceedingNumber: value,
              deathBenefitGrantId,
            }),
          ),
        );
      });
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitGrantResponseDto.build({ deathBenefitGrantId });
  }
}
