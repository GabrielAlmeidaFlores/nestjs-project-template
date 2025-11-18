import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import { LegalPleadingCode } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-code/legal-pleading-code.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { DeleteLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/delete-legal-pleading.response';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(DeleteLegalPleadingUseCase.name, () => {
  let useCase: DeleteLegalPleadingUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail:
        jest.fn(),
      findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
      countByOrganizationIdAndAuthIdentityId: jest.fn(),
      listByOrganizationIdAndAuthIdentityId: jest.fn(),
      countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
    };

  const legalPleadingCommandRepositoryGateway: jest.Mocked<LegalPleadingCommandRepositoryGateway> =
    {
      deleteLegalPleading: jest.fn(),
      createLegalPleading: jest.fn(),
      updateLegalPleading: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildLegalPleadingQueryResult =
    (): GetLegalPleadingWithRelationsQueryResult => {
      const responsible =
        GetOrganizationMemberWithCustomerRelationQueryResult.build({
          id: new OrganizationMemberId(),
          owner: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          customer: GetCustomerQueryResult.build({
            id: new CustomerId(),
            name: 'Test Customer',
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          }),
        });

      const client = GetAnalysisToolClientWithRelationsQueryResult.build({
        id: new AnalysisToolClientId(),
        name: 'Test Client',
        federalDocument: null,
        email: null,
        inssPassword: null,
        phoneNumber: null,
        birthDate: null,
        gender: null,
        clientType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        analysisToolClientInssBenefit: [],
        analysisToolClientLegalProceeding: [],
        createdBy: responsible,
        updatedBy: responsible,
      });

      return GetLegalPleadingWithRelationsQueryResult.build({
        id: new LegalPleadingId(),
        code: new LegalPleadingCode(1),
        status: AnalysisStatusEnum.IN_PROGRESS,
        statementOfFacts: null,
        additionalComments: null,
        securitySystem: LegalPleadingSocialSecuritySystemEnum.RGPS,
        benefitType: LegalPleadingBenefitTypeEnum.ACCIDENT_BENEFIT,
        petitionType: LegalPleadingPetitionTypeEnum.INITIAL_COMPLAINT,
        benefitNumber: null,
        applicationSubmissionDate: null,
        benefitTerminationDate: null,
        benefitInitialMonthlyIncome: null,
        benefitCurrentMonthlyIncome: null,
        socialSecurityObjective: null,
        legalPleadingWritOfMandamusObjective: null,
        analysisToolClient: client,
        legalPleadingDocument: [],
        legalPleadingAddress: null,
        legalPleadingResult: null,
        createdBy: responsible,
        updatedBy: responsible,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteLegalPleadingUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingCommandRepositoryGateway,
          useValue: legalPleadingCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(DeleteLegalPleadingUseCase);
    jest.clearAllMocks();
  });

  it('deve deletar uma petição legal com sucesso', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const organizationMember = buildOrganizationMember();
    const legalPleadingResult = buildLegalPleadingQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleadingResult,
    );
    legalPleadingCommandRepositoryGateway.deleteLegalPleading.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      legalPleadingId,
    );

    expect(result).toBeInstanceOf(DeleteLegalPleadingResponseDto);
    expect(result.legalPleadingId).toBe(legalPleadingResult.id);

    expect(
      legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail,
    ).toHaveBeenCalledWith(
      legalPleadingId,
      orgSessionData.organizationId,
      sessionData.authIdentityId,
      OrganizationMemberNotFoundError,
    );

    expect(
      legalPleadingCommandRepositoryGateway.deleteLegalPleading,
    ).toHaveBeenCalledTimes(1);
    expect(
      legalPleadingCommandRepositoryGateway.deleteLegalPleading,
    ).toHaveBeenCalledWith(legalPleadingResult.id, organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(1);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar OrganizationMemberNotFoundError se a petição não for encontrada (erro configurado)', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockRejectedValueOnce(
      new OrganizationMemberNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });
});
