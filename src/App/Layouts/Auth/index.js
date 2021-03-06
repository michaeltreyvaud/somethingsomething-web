import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import pagesStyle from './style';
import pagesRoutes from '../../Routing/Routes/auth';
import PagesHeader from '../../Components/Header/PagesHeader';
import Views from '../../Views';

const noMatch = () => (<h1>Another no match</h1>);
class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'unset';
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              {pagesRoutes.map((prop, key) => (
                <Route exact path={prop.path} component={Views[prop.component]} key={key} />))}
              <Route component={noMatch} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pagesStyle)(Pages);
