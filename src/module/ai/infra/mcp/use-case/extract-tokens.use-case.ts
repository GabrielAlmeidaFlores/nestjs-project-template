import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

type HeadersLikeType = Headers | Record<string, string | string[] | undefined>;

type RequestLikeType = {
  headers: HeadersLikeType;
  cookies?: Record<string, string>;
};

export type McpAuthContextType = {
  authToken?: string;
  organizationToken?: string;
  cookie?: string;
};

@Injectable({ scope: Scope.REQUEST })
export class McpAuthContextUseCase {
  protected readonly _type = McpAuthContextUseCase.name;

  public constructor(@Inject(REQUEST) private readonly req: RequestLikeType) {}

  public getAuth(): McpAuthContextType {
    const cookie = this.getHeader('cookie');
    const authorization = this.getHeader('authorization');

    const cookies = this.req.cookies; // typed, sem any

    const authToken =
      cookies?.['auth_token'] ??
      this.tryExtractCookie(cookie, 'auth_token') ??
      this.tryExtractBearer(authorization);

    const organizationToken =
      cookies?.['organization_token'] ??
      cookies?.['organization'] ??
      this.tryExtractCookie(cookie, 'organization_token') ??
      this.tryExtractCookie(cookie, 'organization');

    // Com exactOptionalPropertyTypes: true,
    // não retorne { authToken: undefined }.
    // Retorne só as chaves que existem.
    const out: McpAuthContextType = {};
    if (typeof authToken === 'string' && authToken.length > 0) {
      out.authToken = authToken;
    }
    if (typeof organizationToken === 'string' && organizationToken.length > 0) {
      out.organizationToken = organizationToken;
    }
    if (typeof cookie === 'string' && cookie.length > 0) {
      out.cookie = cookie;
    }

    return out;
  }

  private getHeader(name: string): string | undefined {
    const h = this.req.headers;

    if (h instanceof Headers) {
      const v = h.get(name);
      return typeof v === 'string' && v.length > 0 ? v : undefined;
    }

    const raw = h[name];
    if (typeof raw === 'string') {
      return raw.length > 0 ? raw : undefined;
    }
    if (Array.isArray(raw)) {
      const joined = raw.join('; ');
      return joined.length > 0 ? joined : undefined;
    }

    return undefined;
  }

  private tryExtractBearer(
    authorization: string | undefined,
  ): string | undefined {
    // strict-boolean-expressions: trate nullish/empty explicitamente
    if (typeof authorization !== 'string' || authorization.length === 0) {
      return undefined;
    }

    const m = /^Bearer\s+(.+)$/i.exec(authorization);
    const token = m?.[1]?.trim();

    if (token === undefined) {
      throw new Error('Deu tudo errado');
    }

    return token && token.length > 0 ? token : undefined;
  }

  private tryExtractCookie(
    cookie: string | undefined,
    name: string,
  ): string | undefined {
    if (typeof cookie !== 'string' || cookie.length === 0) {
      return undefined;
    }

    // parse simples e determinístico
    const parts = cookie.split(';');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.length === 0) {
        continue;
      }

      const eq = trimmed.indexOf('=');
      if (eq <= 0) {
        continue;
      }

      const k = trimmed.slice(0, eq).trim();
      if (k !== name) {
        continue;
      }

      const v = trimmed.slice(eq + 1).trim();
      return v.length > 0 ? v : undefined;
    }

    return undefined;
  }
}
