// components/AddPlayerModal.js

import React from "react";
import Modal from "react-modal";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const InfoModal = ({ isOpen, onRequestClose }: any) => {
  const handleClose = (e: any) => {
    e.preventDefault();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm End Game"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  items-center justify-center w-3/4 border-none outline-none rounded-xl"
    >
      <div className="border border-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full text-center bg-gray-800 dark:bg-white text-white dark:text-black">
        <p className="text-xl m-3 text-white dark:text-black">
          How to use PokerStackPro ?
        </p>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/src/assets/1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/4.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/src/assets/5.png" />
          </SwiperSlide>
        </Swiper>
        <div className="flex justify-center items-center gap-4 w-full px-5">
          {/* <div
            className="border bg-transparent px-4 py-3 w-[100px] font-bold rounded-xl text-white dark:text-black"
            onClick={onRequestClose}
          >
            Close
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
