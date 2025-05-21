import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"  // Import toast for notifications

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("") // State to store error message
  const [loading, setLoading] = useState(false) // Local loading state
  const dispatch = useDispatch()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset any previous error messages
    setLoading(true);  // Set loading to true when the request starts
  
    try {
      // Dispatch the action and pass setEmailSent for updating the state in the thunk
      await dispatch(getPasswordResetToken(email, setEmailSent));
    } catch (err) {
      // Handle any errors from the API
      const errorMessage = err.response?.data?.message || err.message || "Failed to send reset email. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage); // Show error toast
    } finally {
      setLoading(false);  // Set loading to false once the request completes (whether successful or not)
    }
  };
  

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div> // You can style this as your loading spinner
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
