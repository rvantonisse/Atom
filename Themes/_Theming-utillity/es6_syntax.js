import React, { Component, PropTypes, Children } from 'react';
import classNames from 'classnames';

import Slide from './../Slide';
import Slides from './../Slides';
import SlideShowCtrl from './../SlideShowCtrl';

import styles from  './styles.css';

class SlideShow extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Slide),
    closeOnEnd: PropTypes.boolean,
  };

  static defaultProps = {
    children: [],
    closeOnEnd: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
      currentSlide: 0,
    };

    this.showNextSlide = this.showNextSlide.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
    this.getSlides = this.getSlides.bind(this);
    this.getButtonValue = this.getButtonValue.bind(this);
  }

  render() {
    const { isActive } = this.state;
    const FOO = 'bar'; //Constant
    const slides = this.renderSlides();
    const currentSlideProps = this.getSlide(this.getCurrentSlide()).props;
    const slideShowCtrlProps = {
      nextSlide: this.showNextSlide,
      label: currentSlideProps.buttonValue,
      grantGadget: currentSlideProps.grantGadget,
    };

    return (
      <div className={ classNames(styles.slideshowBackground, {'no-display': !isActive}) }>
        <div className={ classNames(styles.SlideShow, {active: isActive}) }>
          <Slides contents={ slides } />
          <SlideShowCtrl { ...slideShowCtrlProps } />
        </div>
      </div>
    );
  }

  renderSlides() {
    return this.getSlides().map((child, index) => {
      return React.cloneElement(child, {
        current: this.isCurrentSlide(index),
        next: this.isNextSlide(index),
      });
    });
  }

  getSlides() {
    return Children.toArray(this.props.children).filter((child) => {
      return (typeof child === 'object');
    });
  }

  getSlide(slideIndex) {
    return this.renderSlides()[slideIndex] || false;
  }

  countSlides() {
    return this.getSlides().length;
  }

  showNextSlide() {
    // Show next Slide
    const nextSlide = this.getNextSlide();

    if (this.hasNextSlide(nextSlide)) {
      this.setState({currentSlide: nextSlide});
    } else {
      if (this.props.closeOnEnd) {
        this.setSlideShowStateInactive();
      }
    }
  }

  setSlideShowStateInactive() {
    // Set the slideshow inactive
    this.setState({isActive: false});
  }

  getCurrentSlide() {
    return this.state.currentSlide;
  }

  isCurrentSlide(slideNumber) {
    return this.getCurrentSlide() === slideNumber;
  }

  getNextSlide() {
    return this.getCurrentSlide() + 1;
  }

  isNextSlide(slideNumber) {
    return this.getNextSlide() === slideNumber;
  }

  hasNextSlide(nextSlide) {
    return nextSlide <= (this.countSlides() - 1);
  }

  getButtonValue() {
    const currentSlide = this.getCurrentSlide();

    if (typeof this.getSlide(currentSlide) === 'object') {
      return this.getSlide(currentSlide).props.buttonValue;
    }

    return false;
  }
}

export default SlideShow;
