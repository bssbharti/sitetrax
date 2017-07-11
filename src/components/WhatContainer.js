import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
import '../styles/styles.scss';
import '../styles/dashboard.scss';
import '../styles/what-container.scss';
import * as apiActions from '../actions/apiActions';
import * as dashboardActions from '../actions/dashboardActions';
import ImageThumbnail from './ImageThumbnail';
import filestack from 'filestack-js';

class WhatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentWillMount() {
    const { apiActions } = this.props;
    apiActions.loadHoistCamDirectorImages();
  }

  toggle(id) {
    const { dashboardActions, selectedHoistCamDirectorImages } = this.props;
    dashboardActions.updateSelectedHoistCamDirectorImages(selectedHoistCamDirectorImages, id, !_.get(this.state, id, false));
    this.setState({
      [id]: !_.get(this.state, id, false),
    });
  }

  toggleExpand(){
    this.setState({
      expanded: !this.state.expanded
    });
  }

  uploadPopup(){
    const { hoistCamDirectorImages } = this.props;
    const { dashboardActions, saveHoistCamDirectorImages } = this.props;
    //TODO: add apikey to a config file.
    const apikey = 'A6V0ujlBHQgmxujN21qAuz';
    const client = filestack.init(apikey);
    client.pick({
        maxFiles: 20,
        fromSources: ['local_file_system'],
    }).then((res) => {
    let imagesUploaded = res.filesUploaded;
    let imagesUploadedUrls = imagesUploaded.map((img) => {
      return img.url;
    });
    //TODO: Call an action to save data to the database
    dashboardActions.saveHoistCamDirectorImages(imagesUploadedUrls);
    let images = this.props.hoistCamDirectorImages;
    if(images.length > 6){
      this.state = { expanded : false };
    }
  });
  }

  render() {
    const { hoistCamDirectorImages } = this.props;
    return (
      <div className="recipe-container-wrapper col-xs-12 col-md-4">
        <div className="recipe-container col-xs-12">
          <div className="recipe-container-header" style={{ backgroundColor: '#ff5722' }}>What</div>
          <p className="recipe-container-label">Choose Images from: HoistCam Director</p>
          {/*<div>
            <button style={ {margin: "0px auto",width: "100%",marginTop: "10px" }} className="btn btn-primary" onClick={this.uploadPopup.bind(this)}>Upload Images</button>
          </div>*/}
          <div className="outer-box">
          <div className="box">
	          <div className="my-computer"><a href="javascript:void(0);" style={{ textDecoration: "none"}} onClick={this.uploadPopup.bind(this)}>My Computer</a></div>
    	      <div className="computer-image"><img src={"../images/computer.png"} /></div>
    	      <div className="clr"></div>
            <div className="padding-remove">
            <div className="image-thumbnail-wrappers-container col-xs-12">
            { hoistCamDirectorImages && hoistCamDirectorImages.map((image, imageIndex) =>
              <ImageThumbnail displayImage={this.state.expanded} index={imageIndex} image={image} key={imageIndex} id={image} onClick={this.toggle.bind(this)} selectedClass={this.state && this.state[image] ? "selected" : ""} />
            )}
            </div>
            </div>
            <div className="cap col-xs-9">Images stored in your Computer</div>
            <div className="col-xs-3" style={{ display : hoistCamDirectorImages.length > 6 ? "block" : "none", fontSize: "x-small"}}>
              <div className="row">
                <a href="javascript:void(0);" onClick={this.toggleExpand.bind(this)}>{this.state.expanded ? "show less..." : "view more..."}</a>
              </div>
            </div>
            </div>
        </div>
          
          {/*<div className="image-thumbnail-wrappers-container col-xs-12">
            { hoistCamDirectorImages && hoistCamDirectorImages.map((image, imageIndex) =>
              <ImageThumbnail image={image} key={imageIndex} id={image} onClick={this.toggle.bind(this)} selectedClass={this.state && this.state[image] ? "selected" : ""} />
            )}
          </div>*/}
        </div>
      </div>
    );
  }
}

WhatContainer.propTypes = {
  apiActions: T.object,
  dashboardActions: T.object
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiActions: bindActionCreators(apiActions, dispatch),
    dashboardActions: bindActionCreators(dashboardActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatContainer);