import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import imgHero from "../../../../src/assets/Images/coding_boy.png";

const Hero = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const emailInput = data.email.trim();
    if (emailInput) {
      navigate(`/login?email=${encodeURIComponent(emailInput)}`);
    }
  };

  // Show toast on form submission error
  const onError = (formErrors) => {
    if (formErrors.email) {
      toast.error(formErrors.email.message);
    }
  };

  return (
    <div>
      <div className="bg-blue-500 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto px-8 py-16">
          {/* Left Section */}
          <div className="flex flex-col items-start mt-14 md:mt-0 md:w-1/2 px-4">
            <h1 className="text-6xl font-bold mb-6 text-black">
              Start your learning journey today
            </h1>
            <p className="text-xl text-gray-900 mb-6">
              Unlock your potential with{' '}
              <span className="font-semibold text-black">online courses</span>
              <br /> designed by experts to help you succeed.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col lg:flex-row items-center w-full"
            >
              <input
                className={`p-4 border ${
                  errors.email ? 'border-red-500' : 'border-white'
                } rounded-t-lg lg:rounded-l-lg lg:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 lg:mb-0`}
                placeholder="Enter your email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />

              <button
                type="submit"
                className="bg-blue-500 text-white p-5 lg:p-4 rounded-b-lg lg:rounded-b-none lg:rounded-r-lg border border-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Start learning today <span className="text-yellow-400">⚡</span>
              </button>
            </form>

            <a className="mt-6" href="/signup">
              <div className="w-[180px] text-center text-[16px] sm:text-[20px] px-6 py-[18px] rounded-full font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 bg-richblack-800 text-white flex items-center justify-center">
                Sign up
                <FaArrowRight className="ml-2" />
              </div>
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden md:block md:w-1/2 mt-14 md:mt-0">
            <img
              className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%] mx-auto"
              src={imgHero}
              alt="student learning"
            />
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="relative w-[50vw] h-0 border-t-[100px] border-transparent border-l-[60vw] border-l-blue-500 transform -rotate-12 right-[30px] -mt-12 -mb-24"></div>
        <div className="relative w-[50vw] h-0 border-t-[100px] border-transparent border-r-[60vw] border-r-blue-500 transform rotate-12 left-[590px]"></div>
      </div>
    </div>
  );
};

export default Hero;
