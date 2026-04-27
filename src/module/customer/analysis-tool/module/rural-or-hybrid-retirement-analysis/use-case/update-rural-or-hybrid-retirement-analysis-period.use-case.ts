import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period/command/rural-or-hybrid-retirement-analysis-period.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-document/command/rural-or-hybrid-retirement-analysis-period-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-member/command/rural-or-hybrid-retirement-analysis-period-member.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-member-document/command/rural-or-hybrid-retirement-analysis-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.entity';
import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/value-object/rural-or-hybrid-retirement-analysis-period-document-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/value-object/rural-or-hybrid-retirement-analysis-period-member-document-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period-member.request.dto';
import { RuralOrHybridRetirementAnalysisPeriodItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-period.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementAnalysisPeriodUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementAnalysisPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway: RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway: RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    dto: UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingAnalysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const existingPeriods =
      existingAnalysis.ruralOrHybridRetirementAnalysisPeriod ?? [];
    const existingPeriodDocuments =
      existingAnalysis.ruralOrHybridRetirementAnalysisPeriodDocument ?? [];
    const existingPeriodMembers =
      existingAnalysis.ruralOrHybridRetirementAnalysisPeriodMember ?? [];
    const existingPeriodMemberDocuments =
      existingAnalysis.ruralOrHybridRetirementAnalysisPeriodMemberDocument ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingPeriod of existingPeriods) {
      const periodMembers = existingPeriodMembers.filter(
        (member) =>
          member.ruralOrHybridRetirementAnalysisPeriodId.toString() ===
          existingPeriod.id.toString(),
      );

      for (const periodMember of periodMembers) {
        const periodMemberDocuments = existingPeriodMemberDocuments.filter(
          (document) =>
            document.ruralOrHybridRetirementAnalysisPeriodMemberId.toString() ===
            periodMember.id.toString(),
        );

        for (const periodMemberDocument of periodMemberDocuments) {
          transactions.push(
            this.ruralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisPeriodMemberDocument(
              periodMemberDocument.id,
            ),
          );
        }

        transactions.push(
          this.ruralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisPeriodMember(
            periodMember.id,
          ),
        );
      }

      const periodDocuments = existingPeriodDocuments.filter(
        (document) =>
          document.ruralOrHybridRetirementAnalysisPeriodId.toString() ===
          existingPeriod.id.toString(),
      );

      for (const periodDocument of periodDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisPeriodDocument(
            periodDocument.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisPeriod(
          existingPeriod.id,
          this.buildDeletedPeriodEntity(
            existingPeriod,
            ruralOrHybridRetirementAnalysisId,
          ),
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const periodId = new RuralOrHybridRetirementAnalysisPeriodId();

      transactions.push(
        this.ruralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisPeriod(
          this.buildPeriodEntity(
            periodId,
            ruralOrHybridRetirementAnalysisId,
            periodDto,
          ),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const document =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisPeriodDocument(
              new RuralOrHybridRetirementAnalysisPeriodDocumentEntity({
                id: new RuralOrHybridRetirementAnalysisPeriodDocumentId(),
                document,
                type: documentDto.type,
                ruralOrHybridRetirementAnalysisPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.members && periodDto.members.length > 0) {
        for (const memberDto of periodDto.members) {
          const memberId = new RuralOrHybridRetirementAnalysisPeriodMemberId();

          transactions.push(
            this.ruralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisPeriodMember(
              this.buildMemberEntity(memberId, periodId, memberDto),
            ),
          );

          if (memberDto.documents && memberDto.documents.length > 0) {
            const memberDocumentTransactions = await Promise.all(
              memberDto.documents.map(async (documentDto) => {
                const buffer = documentDto.file.base64.decodeToBuffer();

                const fileModel = FileModel.build({
                  buffer,
                  originalName: documentDto.file.originalFileName,
                  size: buffer.length,
                  encoding: '7bit',
                });

                const document =
                  await this.fileProcessorGateway.uploadFile(fileModel);

                return this.ruralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisPeriodMemberDocument(
                  new RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity(
                    {
                      id: new RuralOrHybridRetirementAnalysisPeriodMemberDocumentId(),
                      document,
                      type: documentDto.type,
                      ruralOrHybridRetirementAnalysisPeriodMemberId: memberId,
                    },
                  ),
                );
              }),
            );

            transactions.push(...memberDocumentTransactions);
          }
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto.build({
      ruralOrHybridRetirementAnalysisId,
    });
  }

  private buildDeletedPeriodEntity(
    existingPeriod: RuralOrHybridRetirementAnalysisPeriodEntity,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): RuralOrHybridRetirementAnalysisPeriodEntity {
    return new RuralOrHybridRetirementAnalysisPeriodEntity({
      id: existingPeriod.id,
      startDate: existingPeriod.startDate,
      endDate: existingPeriod.endDate,
      workerType: existingPeriod.workerType,
      workSchedule: existingPeriod.workSchedule,
      propertyName: existingPeriod.propertyName,
      propertyCategory: existingPeriod.propertyCategory,
      propertyOwner: existingPeriod.propertyOwner,
      propertyCep: existingPeriod.propertyCep,
      propertyState: existingPeriod.propertyState,
      propertyCity: existingPeriod.propertyCity,
      propertyNeighbourhood: existingPeriod.propertyNeighbourhood,
      propertyStreet: existingPeriod.propertyStreet,
      propertyNumber: existingPeriod.propertyNumber,
      productionDestination: existingPeriod.productionDestination,
      employee: existingPeriod.employee,
      employeeAmount: existingPeriod.employeeAmount,
      agriculturalMachinery: existingPeriod.agriculturalMachinery,
      agriculturalMachineryDescription:
        existingPeriod.agriculturalMachineryDescription,
      farmVehicles: existingPeriod.farmVehicles,
      farmVehiclesDescription: existingPeriod.farmVehiclesDescription,
      incomeBesidesRuralProduction: existingPeriod.incomeBesidesRuralProduction,
      incomeBesidesRuralProductionDescription:
        existingPeriod.incomeBesidesRuralProductionDescription,
      clientHasOrHadCnpj: existingPeriod.clientHasOrHadCnpj,
      clientHasOrHadCnpjDescription:
        existingPeriod.clientHasOrHadCnpjDescription,
      clientLivesInUrbanArea: existingPeriod.clientLivesInUrbanArea,
      clientMunicipality: existingPeriod.clientMunicipality,
      clientState: existingPeriod.clientState,
      distance: existingPeriod.distance,
      ruralOrHybridRetirementAnalysisId,
      deletedAt: new Date(),
    });
  }

  private buildPeriodEntity(
    periodId: RuralOrHybridRetirementAnalysisPeriodId,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    periodDto: RuralOrHybridRetirementAnalysisPeriodItemRequestDto,
  ): RuralOrHybridRetirementAnalysisPeriodEntity {
    return new RuralOrHybridRetirementAnalysisPeriodEntity({
      id: periodId,
      startDate: periodDto.startDate ?? null,
      endDate: periodDto.endDate ?? null,
      workerType: periodDto.workerType ?? null,
      workSchedule: periodDto.workSchedule ?? null,
      propertyName: periodDto.propertyName ?? null,
      propertyCategory: periodDto.propertyCategory ?? null,
      propertyOwner: periodDto.propertyOwner ?? null,
      propertyCep: periodDto.propertyCep ?? null,
      propertyState: periodDto.propertyState ?? null,
      propertyCity: periodDto.propertyCity ?? null,
      propertyNeighbourhood: periodDto.propertyNeighbourhood ?? null,
      propertyStreet: periodDto.propertyStreet ?? null,
      propertyNumber: periodDto.propertyNumber ?? null,
      productionDestination: periodDto.productionDestination ?? null,
      employee: periodDto.employee ?? null,
      employeeAmount: periodDto.employeeAmount ?? null,
      agriculturalMachinery: periodDto.agriculturalMachinery ?? null,
      agriculturalMachineryDescription:
        periodDto.agriculturalMachineryDescription ?? null,
      farmVehicles: periodDto.farmVehicles ?? null,
      farmVehiclesDescription: periodDto.farmVehiclesDescription ?? null,
      incomeBesidesRuralProduction:
        periodDto.incomeBesidesRuralProduction ?? null,
      incomeBesidesRuralProductionDescription:
        periodDto.incomeBesidesRuralProductionDescription ?? null,
      clientHasOrHadCnpj: periodDto.clientHasOrHadCnpj ?? null,
      clientHasOrHadCnpjDescription:
        periodDto.clientHasOrHadCnpjDescription ?? null,
      clientLivesInUrbanArea: periodDto.clientLivesInUrbanArea ?? null,
      clientMunicipality: periodDto.clientMunicipality ?? null,
      clientState: periodDto.clientState ?? null,
      distance: periodDto.distance ?? null,
      ruralOrHybridRetirementAnalysisId,
    });
  }

  private buildMemberEntity(
    memberId: RuralOrHybridRetirementAnalysisPeriodMemberId,
    ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId,
    memberDto: RuralOrHybridRetirementAnalysisPeriodMemberItemRequestDto,
  ): RuralOrHybridRetirementAnalysisPeriodMemberEntity {
    return new RuralOrHybridRetirementAnalysisPeriodMemberEntity({
      id: memberId,
      name: memberDto.name ?? null,
      federalDocument: memberDto.federalDocument ?? null,
      kinship: memberDto.kinship ?? null,
      hasReceivedRuralBenefit: memberDto.hasReceivedRuralBenefit ?? null,
      benefitNumber: memberDto.benefitNumber ?? null,
      ruralOrHybridRetirementAnalysisPeriodId,
    });
  }
}
