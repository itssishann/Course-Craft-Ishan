import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...data,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(data.email, navigate));
    reset();
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div className="space-y-6">
      {/* Account Type Tabs */}
      <div className="flex gap-4 bg-richblack-700 p-1 rounded-md w-fit">
        <button
          type="button"
          onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            accountType === ACCOUNT_TYPE.STUDENT
              ? "bg-yellow-50 text-richblack-900 font-semibold"
              : "text-richblack-200"
          }`}
        >
          <FiUser size={18} />
          Student
        </button>
        <button
          type="button"
          onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            accountType === ACCOUNT_TYPE.INSTRUCTOR
              ? "bg-yellow-50 text-richblack-900 font-semibold"
              : "text-richblack-200"
          }`}
        >
          <FiBriefcase size={18} />
          Instructor
        </button>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="text-sm text-richblack-5">First Name <sup className="text-pink-200">*</sup></label>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="Enter first name"
              className="w-full rounded-md bg-richblack-800 px-3 py-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
            />
            {errors.firstName && (
              <p className="text-pink-200 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="text-sm text-richblack-5">Last Name <sup className="text-pink-200">*</sup></label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Enter last name"
              className="w-full rounded-md bg-richblack-800 px-3 py-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
            />
            {errors.lastName && (
              <p className="text-pink-200 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="text-sm text-richblack-5">Email Address <sup className="text-pink-200">*</sup></label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter email address"
            className="w-full rounded-md bg-richblack-800 px-3 py-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
          />
          {errors.email && (
            <p className="text-pink-200 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <label className="text-sm text-richblack-5">Create Password <sup className="text-pink-200">*</sup></label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full rounded-md bg-richblack-800 px-3 py-2 pr-10 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={20} fill="#AFB2BF" />
              )}
            </span>
            {errors.password && (
              <p className="text-pink-200 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="relative w-full">
            <label className="text-sm text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full rounded-md bg-richblack-800 px-3 py-2 pr-10 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-200"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={20} fill="#AFB2BF" />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="text-pink-200 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-yellow-50 py-2 text-center font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
