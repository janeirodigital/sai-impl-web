import { createAction, props } from '@ngrx/store';
import { Application, DataRegistry, SocialAgent } from '@janeirodigital/sai-api-messages';

const applicationsPanelLoaded = createAction(
  '[APPLICATION PROFILES] Application Profiles Requested'
);

const applicationProfilesReceived = createAction(
  '[APPLICATION PROFILES] Application Profiles Received',
  props<{profiles: Application[]}>(),
)

const applicationProfileReceived = createAction(
  '[APPLICATION PROFILES] Adding Single Application Profile',
  props<{profile: Application}>(),
)

const socialAgentsPanelLoaded = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Requested'
);

const socialAgentProfilesReceived = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Received',
  props<{profiles: SocialAgent[]}>(),
)

const dataRegistriesNeeded = createAction(
  '[DATA REGISTRIES] Data Registries Requested'
);

const dataRegistriesProvided = createAction(
  '[DATA REGISTRIES] Data Registries Received',
  props<{registries: DataRegistry[]}>(),
)


export const DataActions = {
  applicationsPanelLoaded,
  applicationProfilesReceived,
  applicationProfileReceived,
  socialAgentsPanelLoaded,
  socialAgentProfilesReceived,
  dataRegistriesNeeded,
  dataRegistriesProvided
}
