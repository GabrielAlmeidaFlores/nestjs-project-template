import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-institutor/command/death-benefit-grant-institutor.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';
import {
  UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto,
  UpdateDeathBenefitGrantInstitutorDataRequestDto,
} from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-institutor-data.request.dto';
import { UpdateDeathBenefitGrantInstitutorDataResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-institutor-data.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitGrantInstitutorDataUseCase {
  protected readonly _type = UpdateDeathBenefitGrantInstitutorDataUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantDocumentCommandRepositoryGateway: DeathBenefitGrantDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantInstitorCommandRepositoryGateway)
    private readonly deathBenefitGrantInstitorCommandRepositoryGateway: DeathBenefitGrantInstitorCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: UpdateDeathBenefitGrantInstitutorDataRequestDto,
  ): Promise<UpdateDeathBenefitGrantInstitutorDataResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const result =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const existingInstitutor = result.deathBenefitGrantBenefitInstitutor;

    const newInstitutorId = new DeathBenefitGrantInstitorId();

    const institutorEntity = new DeathBenefitGrantInstitorEntity({
      id: newInstitutorId,
      name: existingInstitutor?.name ?? null,
      cpf: existingInstitutor?.cpf ?? null,
      birthDate: existingInstitutor?.birthDate ?? null,
      gender: existingInstitutor?.gender ?? null,
      deathDate: existingInstitutor?.deathDate ?? null,
      wasRetired: dto.wasRetired ?? existingInstitutor?.wasRetired ?? null,
      retirementBenefitNumber:
        dto.retirementBenefitNumber ??
        existingInstitutor?.retirementBenefitNumber ??
        null,
      isDeathDeclarantChildOrSpouse:
        dto.isDeathDeclarantChildOrSpouse ??
        existingInstitutor?.isDeathDeclarantChildOrSpouse ??
        null,
      deathDeclarantRelationshipDescription:
        dto.deathDeclarantRelationshipDescription ??
        existingInstitutor?.deathDeclarantRelationshipDescription ??
        null,
      wantsToProveWorkPeriodNotInCnis:
        dto.wantsToProveWorkPeriodNotInCnis ??
        existingInstitutor?.wantsToProveWorkPeriodNotInCnis ??
        null,
      wasRuralInsured:
        dto.wasRuralInsured ?? existingInstitutor?.wasRuralInsured ?? null,
      ruralPeriodStartDate:
        dto.ruralPeriodStartDate ??
        existingInstitutor?.ruralPeriodStartDate ??
        null,
      ruralPeriodEndDate:
        dto.ruralPeriodEndDate ??
        existingInstitutor?.ruralPeriodEndDate ??
        null,
      ruralPeriodDocumentDescription:
        dto.ruralPeriodDocumentDescription ??
        existingInstitutor?.ruralPeriodDocumentDescription ??
        null,
      wasUnemployedAtDeath:
        dto.wasUnemployedAtDeath ??
        existingInstitutor?.wasUnemployedAtDeath ??
        null,
      wantsToProveDisabilityBeforeDeath:
        dto.wantsToProveDisabilityBeforeDeath ??
        existingInstitutor?.wantsToProveDisabilityBeforeDeath ??
        null,
      wantsToProveUnemploymentByWitness:
        dto.wantsToProveUnemploymentByWitness ??
        existingInstitutor?.wantsToProveUnemploymentByWitness ??
        null,
      deathBenefitGrantId,
    });

    const documentEntities = await this.buildDocumentEntities(
      newInstitutorId,
      dto.documents ?? [],
    );

    const transactions: TransactionType[] = [];

    if (existingInstitutor !== null) {
      transactions.push(
        this.deathBenefitGrantDocumentCommandRepositoryGateway.deleteAllByDeathBenefitGrantInstitorId(
          existingInstitutor.id,
        ),
      );

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

    documentEntities.forEach((entity) => {
      transactions.push(
        this.deathBenefitGrantDocumentCommandRepositoryGateway.createDeathBenefitGrantDocument(
          entity,
        ),
      );
    });

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitGrantInstitutorDataResponseDto.build({
      deathBenefitGrantId,
    });
  }

  private async buildDocumentEntities(
    deathBenefitGrantInstitorId: DeathBenefitGrantInstitorId,
    documents: UpdateDeathBenefitGrantInstitutorDataDocumentRequestDto[],
  ): Promise<DeathBenefitGrantDocumentEntity[]> {
    return Promise.all(
      documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new DeathBenefitGrantDocumentEntity({
          id: new DeathBenefitGrantDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitGrantInstitorId,
        });
      }),
    );
  }
}
