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
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisSolicitationStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-solicitation-status.enum';
import { DeleteCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/delete-cnis-fast-analysis.response';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import DeleteCnisFastAnalysisUseCase from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(DeleteCnisFastAnalysisUseCase.name, () => {
  let useCase: DeleteCnisFastAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByCnisFastAnalysisAndOrganizationIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisQueryRepositoryGateway>;

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      updateCnisFastAnalysis: jest.fn(),
      deleteCnisFastAnalysis: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

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
    }) as GetOrganizationMemberQueryResult;

  const buildCnisFastAnalysisQueryResult =
    (): GetCnisFastAnalysisWithRelationsQueryResult => {
      const responsible =
        GetOrganizationMemberWithCustomerRelationQueryResult.build({
          id: new OrganizationMemberId(),
          customer: GetCustomerQueryResult.build({
            id: new CustomerId(),
            name: 'Creator User',
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          }),
          owner: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });

      const client = GetAnalysisToolClientWithRelationsQueryResult.build({
        id: new AnalysisToolClientId(),
        name: 'Client to Delete',
        createdBy: responsible,
        updatedBy: responsible,
        federalDocument: null,
        email: null,
        phoneNumber: null,
        birthDate: null,
        gender: null,
        clientType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

      return GetCnisFastAnalysisWithRelationsQueryResult.build({
        id: new CnisFastAnalysisId(),
        cnisDocument: 'path/to/doc.pdf',
        analysisToolClient: client,
        cnisFastAnalysisResult: null,
        cnisFastAnalysisInssBenefit: [],
        cnisFastAnalysisLegalProceeding: [],
        createdBy: responsible,
        updatedBy: responsible,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        status: AnalysisSolicitationStatusEnum.COMPLETED,
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
        DeleteCnisFastAnalysisUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
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

  it('should successfully delete a cnis fast analysis', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisFastAnalysisResult = buildCnisFastAnalysisQueryResult();
    const transaction = buildTransaction();
    const MOCK_DATE = new Date();

    jest.spyOn(global, 'Date').mockImplementation(() => MOCK_DATE);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisAndOrganizationIdOrFail.mockResolvedValueOnce(
      cnisFastAnalysisResult,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(DeleteCnisFastAnalysisResponseDto);
    expect(result.cnisFastAnalysisId).toBe(cnisFastAnalysisResult.id);

    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisAndOrganizationIdOrFail,
    ).toHaveBeenCalledWith(
      cnisFastAnalysisId,
      orgSessionData.organizationId,
      OrganizationMemberNotFoundError,
    );

    expect(
      cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    const [[, capturedAnalysis]] = cnisFastAnalysisCommandRepositoryGateway
      .updateCnisFastAnalysis.mock.calls as [
      [CnisFastAnalysisId, CnisFastAnalysisEntity],
    ];

    expect(capturedAnalysis).toBeInstanceOf(CnisFastAnalysisEntity);
    expect(capturedAnalysis.updatedBy).toBe(organizationMember.id);
    expect(capturedAnalysis.deletedAt).toEqual(MOCK_DATE);
    expect(capturedAnalysis.analysisToolClient).toBeInstanceOf(
      AnalysisToolClientEntity,
    );
    expect(capturedAnalysis.analysisToolClient.updatedBy).toBe(
      organizationMember.id,
    );

    expect(
      cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(2);
    expect(transaction.commit).toHaveBeenCalledTimes(1);

    jest.spyOn(global, 'Date').mockRestore();
  });

  it('throws OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('throws OrganizationMemberNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisAndOrganizationIdOrFail.mockRejectedValueOnce(
      new OrganizationMemberNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });
});
