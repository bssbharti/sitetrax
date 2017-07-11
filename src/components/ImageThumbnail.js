import React, { PropTypes as T } from 'react';
import '../styles/styles.scss';
import '../styles/dashboard.scss';
import '../styles/what-container.scss';


class ImageThumbnail extends React.Component {
  handleClickAndPassIdBack() {
    const { onClick, id } = this.props;
    onClick(id);
  }
  render() {
    const { image, selectedClass } = this.props;
    const index = this.props.index;
    const expanded = this.props.displayImage;
    let displayClass = "hide-img";//index > 5 && expanded ? "show-img" : "hide-img";
    if(index > 5 && expanded){
      displayClass = "show-img";
    }
    if( index <= 5){
      displayClass = "show-img";
    }
    return (
      <div className={`image-thumbnail-wrapper col-xs-4  pull-left ${selectedClass} ${displayClass}` } onClick={this.handleClickAndPassIdBack.bind(this)} >
        <div className="image-thumbnail col-xs-12" style={{
            backgroundImage: `url(${image})`
          }} />
      </div>
    );
  }
}

ImageThumbnail.propTypes = {
  id: T.string,
  image: T.string
}

export default ImageThumbnail;