import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router';

import Open from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import GridContainer from '../../../Components/Grid/GridContainer';
import GridItem from '../../../Components/Grid/GridItem';
import Card from '../../../Components/Card/Card';
import CardBody from '../../../Components/Card/CardBody';
import CardHeader from '../../../Components/Card/CardHeader';
import CardIcon from '../../../Components/Card/CardIcon';
import Button from '../../../Components/CustomButtons';
import Table from '../../../Components/Table';
import LoadingTable from '../../../Components/Loading/LoadingTable';

import TeamDelete from './Delete/delete.container';

import style from '../../../Assets/Jss/extendedTablesStyle';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDeleteModal: false,
      selectedDeleteItem: {},
    };
  }

  componentDidMount() {
    const { listTeams } = this.props;
    listTeams();
  }

  showDeleteModal(itemName, index) {
    this.setState({
      displayDeleteModal: true,
      selectedDeleteItem: {
        itemName,
        index,
      },
    });
  }

  hideDeleteModal() {
    this.setState({
      displayDeleteModal: false,
      selectedDeleteItem: {},
    });
  }

  render() {
    const {
      classes, items, loading, history,
    } = this.props;
    const {
      displayDeleteModal, selectedDeleteItem,
    } = this.state;
    const simpleButtons = (item, index) => [
      { color: 'success', icon: Open, tooltip: 'Edit' },
      { color: 'danger', icon: Delete, tooltip: 'Delete' },
    ].map((prop, key) => {
      let onClick;
      switch (key) {
        case 0: {
          onClick = () => history.push(`/dashboard/management/teams/${item.name}`);
          break;
        }
        case 1: {
          onClick = () => this.showDeleteModal(item.name, index);
          break;
        }
        default: {
          onClick = () => {};
        }
      }
      return (
        <Tooltip
          id="tooltip-top"
          title={prop.tooltip}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={prop.color}
            className={classes.actionButton}
            key={key}
            onClick={onClick}
          >
            <prop.icon className={classes.icon} />
          </Button>
        </Tooltip>
      );
    });
    const tableData = items.map((_item, index) => {
      const item = [_item.name, _item.description, simpleButtons(_item, index)];
      return item;
    });
    return (
      <div>
        <TeamDelete
          item={selectedDeleteItem}
          visible={displayDeleteModal}
          classes={classes}
          close={() => this.hideDeleteModal()}
        />
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
                <Button
                  color="info"
                  className={classes.marginRight}
                  onClick={() => history.push('/dashboard/management/teams/create')}
                >
                  Create
                </Button>
              </CardHeader>
              <CardBody>
                {!loading && items && items.length > 0 && (
                <Table
                  hover
                  tableHead={[
                    'Name',
                    'Description',
                  ]}
                  tableData={tableData}
                  customCellClasses={[
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 1, 2]}
                  customHeadCellClasses={[
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 1, 2]}
                />
                )}
                {!loading && items && items.length === 0 && (
                  <div style={{
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    <h2><small>No Teams to display</small></h2>
                  </div>
                )}
                <LoadingTable visible={loading} color="red" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Team.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  listTeams: PropTypes.func.isRequired,
};

export default withRouter(withStyles(style)(Team));
