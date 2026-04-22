import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-document/command/death-benefit-rejection-document.command.repository.gateway';
import { DeathBenefitRejectionInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-institutor/command/death-benefit-rejection-institutor.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import { DeathBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/value-object/death-benefit-rejection-document-id.value-object';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';
import {
  UpdateDeathBenefitRejectionInstitutorDataDocumentRequestDto,
  UpdateDeathBenefitRejectionInstitutorDataRequestDto,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-institutor-data.request.dto';
import { UpdateDeathBenefitRejectionInstitutorDataResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-institutor-data.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitRejectionInstitutorDataUseCase {
  protected readonly _type =
    UpdateDeathBenefitRejectionInstitutorDataUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionDocumentCommandRepositoryGateway)
    private readonly deathBenefitRejectionDocumentCommandRepositoryGateway: DeathBenefitRejectionDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionInstitorCommandRepositoryGateway)
    private readonly deathBenefitRejectionInstitorCommandRepositoryGateway: DeathBenefitRejectionInstitorCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    dto: UpdateDeathBenefitRejectionInstitutorDataRequestDto,
  ): Promise<UpdateDeathBenefitRejectionInstitutorDataResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const result =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const existingInstitutor = result.deathBenefitRejectionBenefitInstitutor;

    const newInstitutorId = new DeathBenefitRejectionInstitorId();

    const institutorEntity = new DeathBenefitRejectionInstitorEntity({
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
      deathBenefitRejectionId,
    });

    const documentEntities = await this.buildDocumentEntities(
      newInstitutorId,
      dto.documents ?? [],
    );

    const transactions: TransactionType[] = [];

    if (existingInstitutor !== null) {
      transactions.push(
        this.deathBenefitRejectionDocumentCommandRepositoryGateway.deleteAllByDeathBenefitRejectionInstitorId(
          existingInstitutor.id,
        ),
      );

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

    documentEntities.forEach((entity) => {
      transactions.push(
        this.deathBenefitRejectionDocumentCommandRepositoryGateway.createDeathBenefitRejectionDocument(
          entity,
        ),
      );
    });

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitRejectionInstitutorDataResponseDto.build({
      deathBenefitRejectionId,
    });
  }

  private async buildDocumentEntities(
    deathBenefitRejectionInstitorId: DeathBenefitRejectionInstitorId,
    documents: UpdateDeathBenefitRejectionInstitutorDataDocumentRequestDto[],
  ): Promise<DeathBenefitRejectionDocumentEntity[]> {
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

        return new DeathBenefitRejectionDocumentEntity({
          id: new DeathBenefitRejectionDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitRejectionInstitorId,
        });
      }),
    );
  }
}
