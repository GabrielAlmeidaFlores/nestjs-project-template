import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { DeleteMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/delete-medical-question-generator.response.dto';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteMedicalQuestionGeneratorUseCase {
  protected readonly _type = DeleteMedicalQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorQueryRepositoryGateway)
    private readonly medicalQuestionGeneratorQueryRepositoryGateway: MedicalQuestionGeneratorQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorCommandRepositoryGateway: MedicalQuestionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
  ): Promise<DeleteMedicalQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalQuestionGeneratorResult =
      await this.medicalQuestionGeneratorQueryRepositoryGateway.findOneByMedicalQuestionGeneratorIdAndOrganizationIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const deleteTransaction =
      this.medicalQuestionGeneratorCommandRepositoryGateway.deleteMedicalQuestionGenerator(
        medicalQuestionGeneratorResult.id,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteMedicalQuestionGeneratorResponseDto.build({
      medicalQuestionGeneratorId: medicalQuestionGeneratorResult.id,
    });
  }
}
