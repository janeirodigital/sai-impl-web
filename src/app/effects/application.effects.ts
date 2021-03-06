import { Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataActions} from "../actions/application.actions";
import {map, mergeMap} from "rxjs";
import {DataService} from "../services/data.service";
import {CoreActions} from "../actions";
import {LoginService} from "../services/login.service";


@Injectable()
export class ApplicationProfileEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
    private login: LoginService,
  ) {}

  loadApplicationProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.applicationsPanelLoaded),
    mergeMap(() => this.data.getApplicationProfiles()),
    map(profiles => DataActions.applicationProfilesReceived({profiles})),
  ))

  loadConsents$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.applicationsPanelLoaded),
    map(() => ({type: 'none'})),

  ))

  receivedApplicationProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.applicationProfilesReceived),
    map(({profiles}) => profiles),
    mergeMap(profiles => profiles),
    map(profile => DataActions.applicationProfileReceived({profile})),
  ))

}
