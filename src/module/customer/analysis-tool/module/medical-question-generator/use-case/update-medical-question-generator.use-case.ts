import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { GetMedicalQuestionGeneratorInssBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-inss-benefit.query.result';
import { GetMedicalQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-legal-proceeding.query.result';
import { MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-inss-benefit/command/medical-question-generator-inss-benefit.command.repository.gateway';
import { MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-legal-proceeding/command/medical-question-generator-legal-proceeding.command.repository.gateway';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { UpdateMedicalQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/request/update-medical-question-generator.request.dto';
import { UpdateMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/update-medical-question-generator.response.dto';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateMedicalQuestionGeneratorUseCase {
  protected readonly _type = UpdateMedicalQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorCommandRepositoryGateway: MedicalQuestionGeneratorCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorQueryRepositoryGateway)
    private readonly medicalQuestionGeneratorQueryRepositoryGateway: MedicalQuestionGeneratorQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorInssBenefitCommandRepositoryGateway: MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway: MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    dto: UpdateMedicalQuestionGeneratorRequestDto,
  ): Promise<UpdateMedicalQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalQuestionGeneratorQueryResult =
      await this.medicalQuestionGeneratorQueryRepositoryGateway.getMedicalQuestionGeneratorById(
        medicalQuestionGeneratorId,
      );

    if (medicalQuestionGeneratorQueryResult === null) {
      throw new MedicalQuestionGeneratorNotFoundError();
    }

    const medicalQuestionGenerator = new MedicalQuestionGeneratorEntity({
      id: medicalQuestionGeneratorQueryResult.id,
      disabilityDate:
        dto?.disabilityDate ??
        medicalQuestionGeneratorQueryResult.disabilityDate,
      medicalQuestionGeneratorResult: null,
    });

    const transactions: TransactionType[] = [];

    if (dto?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorInssBenefit,
          dto.inssBenefitNumber,
          medicalQuestionGenerator,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorLegalProceeding,
          dto.legalProceedingNumber,
          medicalQuestionGenerator,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    const medicalQuestionGeneratorTransaction =
      this.medicalQuestionGeneratorCommandRepositoryGateway.updateMedicalQuestionGenerator(
        medicalQuestionGenerator.id,
        medicalQuestionGenerator,
      );
    transactions.push(medicalQuestionGeneratorTransaction);

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await executeTransactions.commit();

    return UpdateMedicalQuestionGeneratorResponseDto.build({
      medicalQuestionGeneratorId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    currentInssBenefitNumber: GetMedicalQuestionGeneratorInssBenefitQueryResult[],
    newInssBenefitNumber: string[],
    medicalQuestionGenerator: MedicalQuestionGeneratorEntity,
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.medicalQuestionGeneratorInssBenefitCommandRepositoryGateway.deleteMedicalQuestionGeneratorInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new MedicalQuestionGeneratorInssBenefitEntity({
        inssBenefitNumber: value,
        medicalQuestionGenerator,
      });

      return this.medicalQuestionGeneratorInssBenefitCommandRepositoryGateway.createMedicalQuestionGeneratorInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    currentLegalProceedingNumber: GetMedicalQuestionGeneratorLegalProceedingQueryResult[],
    newLegalProceeding: string[],
    medicalQuestionGenerator: MedicalQuestionGeneratorEntity,
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway.deleteMedicalQuestionGeneratorLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new MedicalQuestionGeneratorLegalProceedingEntity({
        legalProceedingNumber: value,
        medicalQuestionGenerator,
      });

      return this.medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway.createMedicalQuestionGeneratorLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
