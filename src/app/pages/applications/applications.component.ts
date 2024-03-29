import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectApplications} from 'src/app/state/selectors/application.selectors';
import * as DataActions from 'src/app/state/actions/application.actions';
import * as DescActions from "../../state/actions/description.actions";
import {
  selectCurrentGroup,
  selectCurrentNeeds,
  selectCurrentShapeTrees
} from "../../state/selectors/access-needs.selectors";

@Component({
  selector: 'sai-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  allApps$ = this.store.select(selectApplications);

  currentGroup$ = this.store.select(selectCurrentGroup);
  currentNeeds$ = this.store.select(selectCurrentNeeds);
  currentShapeTrees$ = this.store.select(selectCurrentShapeTrees);

  constructor(
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.applicationsPanelLoaded())
  }

  requestDescriptions(id: string): void {
    this.store.dispatch(DescActions.descriptionsNeeded({applicationId: id}));
  }
}
