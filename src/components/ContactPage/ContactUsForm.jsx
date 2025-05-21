import React, { useEffect, useState } from "react"
import "../../App.css"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"
import { toast } from "react-hot-toast"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      console.log("Email Res - ", res)
      if(res.data.success){
        toast.success(res.data.message);
      }
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      toast.error(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-richblack-800 rounded-lg shadow-md">
    <form onSubmit={handleSubmit(submitContactForm)} className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <label htmlFor="firstname" className="text-sm font-medium text-richblack-5 mb-1 block">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <p className="text-yellow-100 text-xs mt-1">Please enter your name.</p>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <label htmlFor="lastname" className="text-sm font-medium text-richblack-5 mb-1 block">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("lastname")}
          />
        </div>
      </div>
  
      <div>
        <label htmlFor="email" className="text-sm font-medium text-richblack-5 mb-1 block">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="w-full px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-yellow-100 text-xs mt-1">Please enter your Email address.</p>
        )}
      </div>
  
      <div>
        <label htmlFor="phonenumber" className="text-sm font-medium text-richblack-5 mb-1 block">
          Phone Number
        </label>
        <div className="flex gap-4">
          <select
            id="countrycode"
            className="w-28 px-2 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="flex-1 px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("phoneNo", {
              required: "Please enter your Phone Number.",
              maxLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <p className="text-yellow-100 text-xs mt-1">{errors.phoneNo.message}</p>
        )}
      </div>
  
      <div>
        <label htmlFor="message" className="text-sm font-medium text-richblack-5 mb-1 block">
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          placeholder="Enter your message here"
          className="w-full px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="text-yellow-100 text-xs mt-1">Please enter your Message.</p>
        )}
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md text-sm font-semibold text-black bg-yellow-50 transition-transform duration-200 ${
          !loading ? "hover:scale-95" : "cursor-not-allowed opacity-50"
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
  
      {loading && <div className="mx-auto mt-4 spinner"></div>}
    </form>
  </div>
  
  )
}

export default ContactUsForm