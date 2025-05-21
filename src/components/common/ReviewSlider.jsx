import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"
// import { Autoplay } from "swiper/types/modules/autoplay"
// import { FreeMode } from "swiper/types/modules/free-mode"
// import { Pagination } from "swiper/types/modules/pagination"
// import {Swiper, default} from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            1024 : {
              slidesPerView : 4,
            },
          }}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
               <div className="flex flex-col gap-3 bg-richblack-800 p-4 sm:p-5 md:p-6 rounded-md text-sm sm:text-base text-richblack-25 h-full">
  {/* User Info */}
  <div className="flex items-center gap-3 sm:gap-4">
    <img
      src={
        review?.user?.image
          ? review?.user?.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
      }
      alt="User Profile"
      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <h1 className="font-semibold text-richblack-5 text-[14px] sm:text-[16px]">
        {`${review?.user?.firstName} ${review?.user?.lastName}`}
      </h1>
      <h2 className="text-[12px] sm:text-[13px] font-medium text-richblack-500">
        {review?.course?.courseName}
      </h2>
    </div>
  </div>

  {/* Review Text */}
  <p className="font-medium text-richblack-25 leading-relaxed text-[13px] sm:text-[14px]">
    {review?.review.split(" ").length > truncateWords
      ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
      : `${review?.review}`}
  </p>

  {/* Rating */}
  <div className="flex items-center gap-2 mt-auto">
    <h3 className="font-semibold text-yellow-100 text-[14px] sm:text-[15px]">
      {review.rating.toFixed(1)}
    </h3>
    <ReactStars
      count={5}
      value={review.rating}
      size={20}
      edit={false}
      activeColor="#ffd700"
      emptyIcon={<FaStar />}
      fullIcon={<FaStar />}
    />
  </div>
</div>

              </SwiperSlide>
            )
          })}
          
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider