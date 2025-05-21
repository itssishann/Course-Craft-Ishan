import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [accountType, setAccountType] = useState("Student");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Invalid email format");
      return;
    }
    console.log(data);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-6 px-4">
      <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center">
        <div
          className="hidden lg:block lg:w-2/5 h-[300px] lg:h-auto bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80')",
          }}
        />
        <div className="w-full max-w-xl p-4 sm:p-6 lg:px-8 lg:py-10">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Setup your personal account to get started.
          </p>

          {/* Account Type Toggle */}
          <div className="mt-4">
            <h2 className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              Select account type
            </h2>
            <div className="flex space-x-2">
              {["Student", "Instructor"].map((type) => (
                <button
                  key={type}
                  onClick={() => setAccountType(type)}
                  className={`px-4 py-2 text-xs sm:text-sm rounded-md font-medium transition ${
                    accountType === type
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 border border-blue-500 dark:border-blue-400 dark:text-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* SignUp Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2"
          >
            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">First Name</label>
              <input
                type="text"
                placeholder="John"
                {...register("firstName", { required: true })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.firstName && <span className="text-red-500 text-xs">First name is required</span>}
            </div>

            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastName", { required: true })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.lastName && <span className="text-red-500 text-xs">Last name is required</span>}
            </div>

            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">Phone</label>
              <input
                type="text"
                placeholder="123-456-7890"
                {...register("phone", { required: true })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.phone && <span className="text-red-500 text-xs">Phone number is required</span>}
            </div>

            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>

            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">Password</label>
              <input
                type="password"
                placeholder="********"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">Password must be at least 6 characters</span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-xs text-gray-600 dark:text-gray-200">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-400"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">Passwords do not match</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:col-span-2 mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
