import React, { Component, PropTypes, Children } from 'react';
import classNames from 'classnames';

import Slide from './../Slide';
import Slides from './../Slides';
import SlideShowCtrl from './../SlideShowCtrl';

import styles from  './styles.css';

class SlideShow extends Component {
  /*
  SlideShow is a presentational component containing Slides
  which are itterable with the SlideShowCtrl.
  *
  @param React.children => Slide Components
  @param closeOnEnd => boolean
  */

  static propTypes = {
    children: PropTypes.instanceOf(Slide),
    closeOnEnd: PropTypes.boolean,
  };

  static defaultProps = {
    children: [],
    closeOnEnd: true,
    someImportedProp: React.Component,
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
      <div className={ classNames(styles.slideshowBackground, { 'no-display': !isActive }) }>
        <div className={ classNames(styles.SlideShow, { 'active': isActive }) }>
          <Slides contents={ slides } />
          <SlideShowCtrl { ...slideShowCtrlProps } />
        </div>
      </div>
    );
  }

  renderSlides() {
    const slides = this.getSlides();

    for (slide in slides) {
      console.log(slide);
    }

    return this.getSlides().map((child, index) => {

      return React.cloneElement(child, {
        current: this.isCurrentSlide(index),
        next: this.isNextSlide(index),
      });
    });
  }

  getSlides() {
    const { children } = this.props;
    const filteredChildren = children.filter();

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
      this.setState({ currentSlide: nextSlide });
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

  someFunction(par1, par2, par3) {
    if (par1 >= par2 || par2 <= par3 || par1 === par3 || par1 !== par2) {
      // Do some really silly stuff
    }

    return Math.sum([par1, par2, par3]);
  }

  someDeciding(caseName) {
    switch(caseName) {
      case 'caseOne':
        console.log('Case one!');
        break;

      case 'caseTwo':
        console.log('Case two!');
        break;

      case 'caseEtc':
        console.log('Case etcetera!');
        break;

      default:
        console.log('Default case!');
        break;
    }
  }
}

export default SlideShow;
