import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisClientCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/command/cnis-fast-analysis-client.command.repository.gateway';
import { CnisFastAnalysisClientInssBenefitCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-inss-benefit/command/cnis-fast-analysis-client-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-legal-proceeding/command/cnis-fast-analysis-client-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCnisFastAnalysisUseCase {
  protected readonly _type = CreateCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(CnisFastAnalysisClientCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientCommandRepositoryGateway: CnisFastAnalysisClientCommandRepositoryGateway,
    @Inject(CnisFastAnalysisClientInssBenefitCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientInssBenefitCommandRepositoryGateway: CnisFastAnalysisClientInssBenefitCommandRepositoryGateway,
    @Inject(CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway: CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisDocument =
      dto.cnisDocument !== undefined
        ? await this.fileProcessorGateway.processAndUploadCnisDocument(
            dto.cnisDocument.buffer,
          )
        : null;

    const cnisFastAnalysisClient = new CnisFastAnalysisClientEntity({
      birthDate: dto.json.cnisFastAnalysisClient.birthDate ?? null,
      clientType: dto.json.cnisFastAnalysisClient.clientType ?? null,
      email: dto.json.cnisFastAnalysisClient.email ?? null,
      gender: dto.json.cnisFastAnalysisClient.gender ?? null,
      phoneNumber: dto.json.cnisFastAnalysisClient.phoneNumber ?? null,
      name: dto.json.cnisFastAnalysisClient.name ?? null,
      federalDocument: dto.json.cnisFastAnalysisClient.federalDocument ?? null,
    });

    const cnisFastAnalysisClientInssBenefit =
      dto.json.cnisFastAnalysisClient.inssBenefitNumber !== undefined
        ? dto.json.cnisFastAnalysisClient.inssBenefitNumber.map((value) => {
            return new CnisFastAnalysisClientInssBenefitEntity({
              inssBenefitNumber: value,
              cnisFastAnalysisClient,
            });
          })
        : [];

    const cnisFastAnalysisClientLegalProceeding =
      dto.json.cnisFastAnalysisClient.legalProceedingNumber !== undefined
        ? dto.json.cnisFastAnalysisClient.legalProceedingNumber.map((value) => {
            return new CnisFastAnalysisClientLegalProceedingEntity({
              legalProceedingNumber: value,
              cnisFastAnalysisClient,
            });
          })
        : [];

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      cnisDocument,
      cnisFastAnalysisClient,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      cnisFastAnalysis,
      cnisFastAnalysisClient,
      cnisFastAnalysisClientInssBenefit,
      cnisFastAnalysisClientLegalProceeding,
    );

    return CreateCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId: cnisFastAnalysis.id,
    });
  }

  private async createOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    cnisFastAnalysisClient: CnisFastAnalysisClientEntity,
    cnisFastAnalysisClientInssBenefit: CnisFastAnalysisClientInssBenefitEntity[],
    cnisFastAnalysisClientLegalProceeding: CnisFastAnalysisClientLegalProceedingEntity[],
  ): Promise<void> {
    const cnisFastAnalysisClientTransaction =
      this.cnisFastAnalysisClientCommandRepositoryGateway.createCnisFastAnalysisClient(
        cnisFastAnalysisClient,
      );

    const cnisFastAnalysisClientInssBenefitTransaction =
      cnisFastAnalysisClientInssBenefit.map((value) => {
        return this.cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.createCnisFastAnalysisClientInssBenefit(
          value,
        );
      });

    const cnisFastAnalysisClientLegalProceedingTransaction =
      cnisFastAnalysisClientLegalProceeding.map((value) => {
        return this.cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisClientLegalProceeding(
          value,
        );
      });

    const cnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.createCnisFastAnalysis(
        cnisFastAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      cnisFastAnalysisClientTransaction,
      ...cnisFastAnalysisClientInssBenefitTransaction,
      ...cnisFastAnalysisClientLegalProceedingTransaction,
      cnisFastAnalysisTransaction,
    ]);

    await transaction.commit();
  }
}
