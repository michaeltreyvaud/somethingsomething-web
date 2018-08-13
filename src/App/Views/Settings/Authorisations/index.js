import React from 'react';

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity';
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Button from '../../../Components/CustomButtons';
import Table from '../../../Components/Table';
import GridContainer from '../../../Components/Grid/GridContainer';
import GridItem from '../../../Components/Grid/GridItem';
import Card from '../../../Components/Card/Card';
import CardHeader from '../../../Components/Card/CardHeader';
import CardBody from '../../../Components/Card/CardBody';
import CardIcon from '../../../Components/Card/CardIcon';

import extendedFormsStyle from '../../SafetyRecord/SafetyLog/style';

class Authorisations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    const simpleButtons = [
      { color: 'success', icon: Edit },
      { color: 'danger', icon: Close },
    ].map((prop, key) => (
      <Button
        color={prop.color}
        simple
        className={classes.actionButton}
        key={key}
      >
        <prop.icon className={classes.icon} />
      </Button>
    ));
    return (
      <div>
        <Button color="info" className={classes.marginRight}>
        New
        </Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Table
                  tableHead={[
                    'ID',
                    'Name',
                    'Description',
                    'User Count',
                    'Actions',
                  ]}
                  tableData={[
                    [
                      '1',
                      'Administrator',
                      'full access permission',
                      '1',
                      simpleButtons,
                    ],
                    [
                      '2',
                      'test',
                      'test',
                      '2',
                      simpleButtons,
                    ],
                  ]}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedFormsStyle)(Authorisations);
