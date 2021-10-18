
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"

import './Slide.css'
import Card from './Card'

import SwiperCore, {
  EffectCoverflow,Pagination
} from 'swiper/core';


SwiperCore.use([EffectCoverflow,Pagination]);


export default function Slide() {
  return (
    <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
  "rotate": 50,
  "stretch": 0,
  "depth": 100,
  "modifier": 1,
  "slideShadows": true
}} pagination={true} className="mySwiper">
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  <SwiperSlide><Card/></SwiperSlide>
  </Swiper>
  )
}
