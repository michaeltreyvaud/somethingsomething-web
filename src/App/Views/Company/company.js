import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import PermIdentity from '@material-ui/icons/PermIdentity';

import Button from '../../Components/CustomButtons';
import Clearfix from '../../Components/Clearfix';
import CardBody from '../../Components/Card/CardBody';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import CustomInput from '../../Components/CustomInput';
import Card from '../../Components/Card/Card';
import CardHeader from '../../Components/Card/CardHeader';
import CardIcon from '../../Components/Card/CardIcon';
import ImageUpload from '../../Components/CustomUpload/ImageUpload';
import LoadingTable from '../../Components/Loading/LoadingTable';

import style from './style';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      mobile: '',
      country: '',
      city: '',
      address1: '',
      address2: '',
      address3: '',
      logo: '',
    };
  }

  componentDidMount() {
    const { getCompanyInfo } = this.props;
    getCompanyInfo();
  }

  componentWillReceiveProps(nextProps) {
    const {
      name, email, firstName, lastName, phone,
      mobile, country, city, address1, address2,
      address3, logo,
    } = nextProps;
    this.setState({
      name,
      email,
      firstName,
      lastName,
      phone,
      mobile,
      country,
      city,
      address1,
      address2,
      address3,
      logo,
    });
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  updateInfo() {
    const { updateCompanyInfo, saving } = this.props;
    if (saving) return false;
    return updateCompanyInfo(this.state);
  }

  render() {
    const {
      name, email, firstName, lastName,
      phone, mobile, country, city, address1,
      address2, address3, logo,
    } = this.state;
    const { classes, saving, loading } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                    Edit Profile
                </h4>
              </CardHeader>
              {!loading
              && (
              <CardBody>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ImageUpload
                      avatar
                      addButtonProps={{
                        color: 'rose',
                        round: true,
                      }}
                      changeButtonProps={{
                        color: 'rose',
                        round: true,
                      }}
                      removeButtonProps={{
                        color: 'danger',
                        round: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={name}
                      labelText="Company Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={email}
                      labelText="Contact Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={firstName}
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={lastName}
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={phone}
                      labelText="Contact Phone No."
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={mobile}
                      labelText="Contact Mobile"
                      id="mobile"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={address1}
                      labelText="Address Line 1"
                      id="address1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={address2}
                      labelText="Address Line 2"
                      id="address2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={address3}
                      labelText="Address Line 3"
                      id="address3"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={city}
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      onChange={event => this.onChange(event)}
                      value={country}
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button loading={saving} onClick={() => this.updateInfo()} color="rose" className={classes.updateProfileButton}>
                    Save
                </Button>
                <Clearfix />
              </CardBody>
              )
            }
              <LoadingTable visible={loading} color="red" />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Company.propTypes = {
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  address3: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  getCompanyInfo: PropTypes.func.isRequired,
  updateCompanyInfo: PropTypes.func.isRequired,
};

export default withStyles(style)(Company);
