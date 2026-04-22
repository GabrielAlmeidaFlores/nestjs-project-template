import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/command/death-benefit-rejection.command.repository.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-inss-benefit/command/death-benefit-rejection-inss-benefit.command.repository.gateway';
import { DeathBenefitRejectionInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-institutor/command/death-benefit-rejection-institutor.command.repository.gateway';
import { DeathBenefitRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-proceeding/command/death-benefit-rejection-legal-proceeding.command.repository.gateway';
import { DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-representative/command/death-benefit-rejection-legal-representative.command.repository.gateway';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';
import { DeathBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/value-object/death-benefit-rejection-inss-benefit-id.value-object';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';
import { DeathBenefitRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/value-object/death-benefit-rejection-legal-proceeding-id.value-object';
import { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import { UpdateDeathBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection.request.dto';
import { UpdateDeathBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDeathBenefitRejectionUseCase {
  protected readonly _type = UpdateDeathBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
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
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    dto: UpdateDeathBenefitRejectionRequestDto,
  ): Promise<UpdateDeathBenefitRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDeathBenefitRejection =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const updatedDeathBenefitRejection = new DeathBenefitRejectionEntity({
      id: deathBenefitRejectionId,
      analysisName:
        dto.analysisName ?? existingDeathBenefitRejection.analysisName,
      category: dto.category ?? existingDeathBenefitRejection.category,
      deathBenefitRejectionResultId:
        existingDeathBenefitRejection.deathBenefitRejectionResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.deathBenefitRejectionCommandRepositoryGateway.updateDeathBenefitRejection(
        deathBenefitRejectionId,
        updatedDeathBenefitRejection,
      ),
    ];

    if (dto.institutor !== undefined) {
      const existingInstitutor =
        existingDeathBenefitRejection.deathBenefitRejectionBenefitInstitutor;

      const institutorEntity = new DeathBenefitRejectionInstitorEntity({
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
        deathBenefitRejectionId,
      });

      if (existingInstitutor !== null) {
        transactions.push(
          this.deathBenefitRejectionInstitorCommandRepositoryGateway.deleteDeathBenefitRejectionBenefitInstitutor(
            existingInstitutor.id,
          ),
        );
      }

      transactions.push(
        this.deathBenefitRejectionInstitorCommandRepositoryGateway.createDeathBenefitRejectionBenefitInstitutor(
          institutorEntity,
        ),
      );
    }

    if (dto.legalRepresentative !== undefined) {
      const existingLegalRepresentative =
        existingDeathBenefitRejection.deathBenefitRejectionLegalRepresentative;

      const legalRepresentativeEntity =
        new DeathBenefitRejectionLegalRepresentativeEntity({
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
          deathBenefitRejectionId,
        });

      if (existingLegalRepresentative !== null) {
        transactions.push(
          this.deathBenefitRejectionLegalRepresentativeCommandRepositoryGateway.deleteDeathBenefitRejectionLegalRepresentative(
            existingLegalRepresentative.id,
          ),
        );
      }

      transactions.push(
        this.deathBenefitRejectionLegalRepresentativeCommandRepositoryGateway.createDeathBenefitRejectionLegalRepresentative(
          legalRepresentativeEntity,
        ),
      );
    }

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.deathBenefitRejectionInssBenefitCommandRepositoryGateway.deleteAllByDeathBenefitRejectionId(
          deathBenefitRejectionId,
        ),
      );

      dto.inssBenefitNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitRejectionInssBenefitCommandRepositoryGateway.createDeathBenefitRejectionInssBenefit(
            new DeathBenefitRejectionInssBenefitEntity({
              id: new DeathBenefitRejectionInssBenefitId(),
              inssBenefit: value,
              deathBenefitRejectionId,
            }),
          ),
        );
      });
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.deathBenefitRejectionLegalProceedingCommandRepositoryGateway.deleteAllByDeathBenefitRejectionId(
          deathBenefitRejectionId,
        ),
      );

      dto.legalProceedingNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitRejectionLegalProceedingCommandRepositoryGateway.createDeathBenefitRejectionLegalProceeding(
            new DeathBenefitRejectionLegalProceedingEntity({
              id: new DeathBenefitRejectionLegalProceedingId(),
              legalProceedingNumber: value,
              deathBenefitRejectionId,
            }),
          ),
        );
      });
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitRejectionResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
