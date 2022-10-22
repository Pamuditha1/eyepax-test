import React, { useState, useEffect } from "react";
import axios from "axios";

import Title from "./Title";
import SubTitle from "./SubTitle";

import { API } from "./../api";
import "../carousel.css";

const Carousel = ({ Slides, Infinite }) => {
  const slides = +Slides;
  const infinite = Infinite === "true" ? true : false;
  const [slidesList, setSlidesList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getSlides = async () => {
    const res = await axios.get(`${API}?slides=${slides}`);
    setSlidesList(res.data.data);
  };

  useEffect(() => {
    getSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => {
    let index;
    if (infinite) {
      index = currentSlide > 0 ? currentSlide - 1 : slidesList.length - 1;
      setCurrentSlide(index);
    } else {
      index = currentSlide > 0 ? currentSlide - 1 : 0;
      setCurrentSlide(index);
    }
  };

  const next = () => {
    let index;
    if (infinite) {
      index = currentSlide < slidesList.length - 1 ? currentSlide + 1 : 0;
      setCurrentSlide(index);
    } else {
      index =
        currentSlide < slidesList.length - 1
          ? currentSlide + 1
          : slidesList.length - 1;
      setCurrentSlide(index);
    }
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(${-currentSlide * 100}%)` }}
      >
        {slidesList?.map((slide, index) => {
          return (
            <div className="carousel-item" key={index}>
              <img src={slide.image} alt={slide.title} />
              <div className="carousel-item-title">
                <Title text={slide.title} />
                <SubTitle text={slide.subTitle} />
              </div>
            </div>
          );
        })}
      </div>
      {slides !== 1 && (
        <div>
          <button className="carousel-control left" onClick={prev}>
            <b>{"<"}</b>
          </button>
          <button className="carousel-control right" onClick={next}>
            <b>{">"}</b>
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
