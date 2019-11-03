import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import adminComOverview from './modules/admin/adminComHomepage';
import adminHomepage from './modules/admin/adminHomepage';
import adminViewCaseDetail from './modules/admin/adminViewDetail';

import addCase from './modules/comManager/addCase';
import comOverview from './modules/comManager/comOverview';
import detailView from './modules/comManager/detailView';
import editCase from './modules/comManager/editCase';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <ul>
          <li>
            <Link to="/">AdminHomepage</Link>
          </li>
          <li>
            <Link to="/AdminCommunityOverview">AdminCommunityOverview</Link>
          </li>
          <li>
            <Link to="AdminViewCaseDetail">AdminViewCaseDetail</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/createTournament" component={CreateTournament} />
          <Route path="/tournaments/:id" component={TournamentView} />
          <Route
            path="/enterResults/:tournamentId/:roundId/:matchupId"
            component={BallotEnterResults}
          />
          <Route path="/login" component={SignIn} />
          <Route path="/" component={TournamentsList} />
        </Switch>
      </Router>
    );
  }
}
