import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAnalysisToolClientQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client.query.result';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-responsible-and-client-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { DeleteAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-record.response';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

const mockDeleteCnisFastAnalysisUseCase = {
  execute: jest.fn(),
};

describe(DeleteAnalysisToolRecordUseCase.name, () => {
  let useCase: DeleteAnalysisToolRecordUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const analysisToolRecordQueryRepositoryGateway: jest.Mocked<AnalysisToolRecordQueryRepositoryGateway> =
    {
      findOneByIdWithRelationsOrFail: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationAndAuthIdentityId: jest.fn(),
      countAnalysisByAnalysisToolClientId: jest.fn(),
    };

  const analysisToolRecordCommandRepositoryGateway: jest.Mocked<AnalysisToolRecordCommandRepositoryGateway> =
    {
      deleteAnalysisToolRecord: jest.fn(),
      createAnalysisToolRecord: jest.fn(),
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

  const buildAnalysisToolRecordQueryResult = (
    options: { withCnisAnalysis?: boolean } = {},
  ): GetAnalysisToolRecordWithRelationsQueryResult => {
    const cnisFastAnalysisMock =
      options.withCnisAnalysis === true
        ? GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult.build(
            {
              id: new CnisFastAnalysisId(),
              cnisDocument: null,
              status: AnalysisStatusEnum.COMPLETED,
              analysisToolClient: GetAnalysisToolClientQueryResult.build({
                id: new AnalysisToolClientId(),
                name: null,
                federalDocument: null,
                email: null,
                phoneNumber: null,
                birthDate: null,
                gender: null,
                clientType: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
              }),
              createdBy: {
                customer: {},
              } as GetOrganizationMemberWithCustomerRelationQueryResult,
              updatedBy: {
                customer: {},
              } as GetOrganizationMemberWithCustomerRelationQueryResult,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            },
          )
        : null;

    return GetAnalysisToolRecordWithRelationsQueryResult.build({
      id: new AnalysisToolRecordId(),
      code: new AnalysisToolRecordCode(1),
      type: AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS,
      cnisFastAnalysis: cnisFastAnalysisMock,
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
        DeleteAnalysisToolRecordUseCase,
        {
          provide: DeleteCnisFastAnalysisUseCase,
          useValue: mockDeleteCnisFastAnalysisUseCase,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolRecordQueryRepositoryGateway,
          useValue: analysisToolRecordQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolRecordCommandRepositoryGateway,
          useValue: analysisToolRecordCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(DeleteAnalysisToolRecordUseCase);
    jest.clearAllMocks();
  });

  it('deve deletar um registro e a análise CNIS associada', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolRecordId = new AnalysisToolRecordId();
    const organizationMember = buildOrganizationMember();
    const recordQueryResult = buildAnalysisToolRecordQueryResult({
      withCnisAnalysis: true,
    });
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolRecordQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      recordQueryResult,
    );
    mockDeleteCnisFastAnalysisUseCase.execute.mockResolvedValueOnce(undefined);
    analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      analysisToolRecordId,
    );

    expect(result).toBeInstanceOf(DeleteAnalysisToolRecordResponseDto);
    expect(result.analysisToolRecordId).toBe(recordQueryResult.id);

    expect(
      analysisToolRecordQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(
      analysisToolRecordId,
      orgSessionData.organizationId,
      AnalysisToolRecordNotFoundError,
    );
    expect(mockDeleteCnisFastAnalysisUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockDeleteCnisFastAnalysisUseCase.execute).toHaveBeenCalledWith(
      sessionData,
      orgSessionData,
      recordQueryResult.cnisFastAnalysis?.id,
    );
    expect(
      analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord,
    ).toHaveBeenCalledWith(recordQueryResult.id);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve deletar um registro sem chamar a deleção de CNIS se não houver associação', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolRecordId = new AnalysisToolRecordId();
    const organizationMember = buildOrganizationMember();
    const recordQueryResult = buildAnalysisToolRecordQueryResult({
      withCnisAnalysis: false,
    });
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolRecordQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      recordQueryResult,
    );
    analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await useCase.execute(sessionData, orgSessionData, analysisToolRecordId);

    expect(mockDeleteCnisFastAnalysisUseCase.execute).not.toHaveBeenCalled();
    expect(
      analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolRecordId = new AnalysisToolRecordId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolRecordId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar AnalysisToolRecordNotFoundError se o registro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolRecordId = new AnalysisToolRecordId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolRecordQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      new AnalysisToolRecordNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolRecordId),
    ).rejects.toBeInstanceOf(AnalysisToolRecordNotFoundError);
  });
});
