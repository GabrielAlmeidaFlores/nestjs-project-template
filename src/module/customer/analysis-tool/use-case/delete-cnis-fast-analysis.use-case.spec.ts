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
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { DeleteCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/delete-cnis-fast-analysis.response';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';

const mockDeleteLegalPleadingUseCase = {
  execute: jest.fn(),
};

describe(DeleteCnisFastAnalysisUseCase.name, () => {
  let useCase: DeleteCnisFastAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByCnisFastAnalysisIdAndOrganizationIdOrFail: jest.fn(),
      findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail: jest.fn(),
      countByOrganizationIdAndAuthIdentityId: jest.fn(),
      listByOrganizationIdAndAuthIdentityId: jest.fn(),
      countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
    };

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      deleteCnisFastAnalysis: jest.fn(),
      createCnisFastAnalysis: jest.fn(),
      updateCnisFastAnalysis: jest.fn(),
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

  // CORREÇÃO: Esta função agora constrói o tipo correto (GetCnisFastAnalysisWithRelationsQueryResult)
  const buildCnisFastAnalysisQueryResult =
    (): GetCnisFastAnalysisWithRelationsQueryResult => {
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

      return GetCnisFastAnalysisWithRelationsQueryResult.build({
        id: new CnisFastAnalysisId(),
        cnisDocument: 'path/doc.pdf',
        status: AnalysisStatusEnum.COMPLETED,
        analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult.build(
          {
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
          },
        ),
        createdBy: responsible,
        updatedBy: responsible,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        cnisFastAnalysisResult: null,
        cnisFastAnalysisInssBenefit: [],
        cnisFastAnalysisLegalProceeding: [],
      });
    };

  const buildLegalPleadingQueryResultList =
    (): GetLegalPleadingWithRelationsQueryResult[] => [
      { id: new LegalPleadingId() } as GetLegalPleadingWithRelationsQueryResult,
      { id: new LegalPleadingId() } as GetLegalPleadingWithRelationsQueryResult,
    ];

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteCnisFastAnalysisUseCase,
        {
          provide: DeleteLegalPleadingUseCase,
          useValue: mockDeleteLegalPleadingUseCase,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisCommandRepositoryGateway,
          useValue: cnisFastAnalysisCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(DeleteCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('deve deletar a análise CNIS e as petições legais associadas', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisResult = buildCnisFastAnalysisQueryResult();
    const legalPleadings = buildLegalPleadingQueryResultList();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      cnisResult,
    );
    legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      legalPleadings,
    );
    mockDeleteLegalPleadingUseCase.execute.mockResolvedValue(undefined);
    cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    // Assert
    expect(result).toBeInstanceOf(DeleteCnisFastAnalysisResponseDto);
    expect(result.cnisFastAnalysisId).toBe(cnisResult.id);

    expect(
      legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      cnisResult.analysisToolClient.id,
      orgSessionData.organizationId,
      sessionData.authIdentityId,
    );
    expect(mockDeleteLegalPleadingUseCase.execute).toHaveBeenCalledTimes(
      legalPleadings.length,
    );

    const firstPleading = legalPleadings[0];
    expect(firstPleading).toBeDefined();
    if (firstPleading) {
      expect(mockDeleteLegalPleadingUseCase.execute).toHaveBeenCalledWith(
        sessionData,
        orgSessionData,
        firstPleading.id,
      );
    }

    const secondPleading = legalPleadings[1];
    expect(secondPleading).toBeDefined(); // Garante que o elemento existe
    if (secondPleading) {
      expect(mockDeleteLegalPleadingUseCase.execute).toHaveBeenCalledWith(
        sessionData,
        orgSessionData,
        secondPleading.id,
      );
    }

    expect(
      cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis,
    ).toHaveBeenCalledWith(cnisResult.id, organizationMember.id);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve deletar a análise CNIS mesmo sem petições legais associadas', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisResult = buildCnisFastAnalysisQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      cnisResult,
    );
    legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      [],
    );
    cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId);

    expect(
      legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(mockDeleteLegalPleadingUseCase.execute).not.toHaveBeenCalled();
    expect(
      cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar CnisFastAnalysisNotFoundError se a análise CNIS não for encontrada', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });
});
