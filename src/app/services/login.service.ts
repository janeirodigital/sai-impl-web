import {Injectable} from '@angular/core';
import {ENV} from "../../environments/environment";
import {login} from "@inrupt/solid-client-authn-browser";
import {SolidClient} from "../utils/solid-client";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private solidClient: SolidClient,
  ) {}

  async login(oidcIssuer?: string) {

    // TODO reject if no oidcIssuer is provided
    if (!oidcIssuer) oidcIssuer = ENV.DEFAULT_IDP;


    await login({
      clientId: ENV.OIDC_CLIENT_ID,
      oidcIssuer,
      redirectUrl: `${ENV.BASE_URL}/redirect`,
    });
  }

  async checkServerSession(): Promise<boolean> {

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }

    return this.solidClient.fetch(`${ENV.SRV_BASE}/login`)
      .then(r => r.status === 204)
  }

  checkServerSession$(): Observable<boolean> {
    return from(this.checkServerSession());
  }
}

