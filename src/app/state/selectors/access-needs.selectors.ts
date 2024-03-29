import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  ACCESS_NEEDS_GROUPS_STATE_KEY,
  ACCESS_NEEDS_STATE_KEY,
  AccessNeedGroupState,
  AccessNeedsState,
  SHAPE_TREE_STATE_KEY,
  ShapetreesState,
} from "../reducers/access-needs.reducer";
import {selectApplicationsFeature, selectSelectedApplication} from "./application.selectors";
import {AccessNeed, AccessNeedGroup, ShapeTree} from "../models";
import {ApplicationsState} from "../reducers/application.reducer";

export const selectAccessNeedsFeature = createFeatureSelector<AccessNeedsState>(ACCESS_NEEDS_STATE_KEY);
export const selectShapetreeFeature = createFeatureSelector<ShapetreesState>(SHAPE_TREE_STATE_KEY);
export const selectAccessNeedGroupFeature = createFeatureSelector<AccessNeedGroupState>(ACCESS_NEEDS_GROUPS_STATE_KEY)

// For now, it is assumed that only one group per application is possible
export const selectCurrentGroup = createSelector(
  selectAccessNeedGroupFeature,
  selectSelectedApplication,
  (state, app) => app ? state.entities[app.accessNeedGroup] as AccessNeedGroup : null
)

export const selectGroupFromClientId = (id: string) =>
  createSelector(
    selectApplicationsFeature,
    selectAccessNeedGroupFeature,
    (applicationsState: ApplicationsState, groupsState: AccessNeedGroupState) => {
      const groupId = applicationsState.entities[id]?.accessNeedGroup;

      return groupId ? groupsState.entities[groupId] : undefined;
    },
  )

export const selectCurrentNeeds = createSelector(
  selectAccessNeedsFeature,
  selectCurrentGroup,
  (state, group) => group ? childrenOf(state, group.needs): null,
)

export const selectNeedsFromClientId = (clientId: string) =>
  createSelector(
    selectAccessNeedsFeature,
    selectGroupFromClientId(clientId),
    (state, group) => {
      if (!group) return;
      const needsIds = group.needs;

      return needsIds.map(needId => state.entities[needId]).filter(Boolean) as AccessNeed[]
    }
  )

export const selectAccessNeed = (id: string) =>
  createSelector(
    selectAccessNeedsFeature,
    state => state.entities[id],
  )

export const selectAccessNeeds = (ids: string[]) =>
  createSelector(
    selectAccessNeedsFeature,
    state => ids.map(id => state.entities[id]).filter(Boolean),
  )
export const selectCurrentShapeTrees = createSelector(
  selectShapetreeFeature,
  selectCurrentNeeds,
  // TODO ! is it possible to ensure that shapetree is always defined/work around the undefined?
  (state, needs) => needs ? needs.map(need => state.entities[need?.shapeTree]) as ShapeTree[] : null,
)

export const selectShapetreesFromClientId = (id: string) =>
  createSelector(
    selectShapetreeFeature,
    selectNeedsFromClientId(id),
    (state, needs) => needs ? needs.map(need => state.entities[need.shapeTree]) as ShapeTree[] : null,
  )

/**
 * Recursively traverses the needs and their children through their ids to find all the access needs related to
 * a group regardless of how deep it is.
 * TODO check for infinite loops, if a access need is already present then don add it again
 * @param state
 * @param ids IRIs of the access needs to check
 */
const childrenOf = (state: AccessNeedsState, ids: string[]): AccessNeed[] => {
  const needs = ids.map(id => state.entities[id] as AccessNeed);
  const children = needs.reduce((acc, current) => ([...acc, ...current.children]), [] as string[]);

  if (children.length > 0) {
    return [...needs, ...childrenOf(state, children)];
  }

  return needs;
}
