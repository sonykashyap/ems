import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { LockKeyhole, Eye, EyeOff, CheckCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearToast, resetPassword } from "@/reducers/userReducer";
import { RootState } from "@/store";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const dispatch = useAppDispatch();

  const toastState = useAppSelector(
    (state: RootState) => state.userReducer.toast
  );

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing password reset token");
      return;
    }

    try {
      await dispatch(
        resetPassword({
          token,
          password: data.password,
        })
      ).unwrap();

      setIsResetSuccessful(true);
    } catch (error) {
      // Your Redux thunk should set the error toast message.
      console.error("Password reset failed:", error);
    }
  };

  useEffect(() => {
    if (!toastState.message) return;

    toast(toastState.message, {
      classNames: {
        toast:
          toastState.type === "success"
            ? "!bg-green-200"
            : "!bg-red-200",
        title:
          toastState.type === "success"
            ? "!text-green-600 font-bold"
            : "!text-red-600 font-bold",
      },
    });

    dispatch(clearToast());
  }, [toastState, dispatch]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f5ff] via-white to-[#fff2fc] px-4 py-10">
      {/* Background blur */}
      <div className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-violet-300/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-fuchsia-300/20 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-violet-100 bg-white/85 p-8 shadow-[0_20px_60px_rgba(139,92,246,0.12)] backdrop-blur-2xl">
        {/* Top gradient */}
        <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500" />

        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-[0_12px_35px_rgba(139,92,246,0.3)]">
          {isResetSuccessful ? (
            <CheckCircle className="text-white" size={34} />
          ) : (
            <LockKeyhole className="text-white" size={34} />
          )}
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="bg-gradient-to-r from-violet-700 to-fuchsia-500 bg-clip-text text-3xl font-black tracking-tight text-transparent">
            {isResetSuccessful
              ? "Password Updated!"
              : "Reset Password"}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {isResetSuccessful
              ? "Your password has been changed successfully. You can now sign in with your new password."
              : "Create a strong new password for your account."}
          </p>
        </div>

        {!token && !isResetSuccessful ? (
          <div className="mt-8 space-y-4 text-center">
            <p className="text-sm font-medium text-red-500">
              This reset link is invalid or missing its token.
              Please request a new password reset link.
            </p>

            <Link
              to="/forgot-password"
              className="inline-block font-semibold text-violet-600 hover:text-fuchsia-500"
            >
              Request a new link
            </Link>
          </div>
        ) : isResetSuccessful ? (
          <Link
            to="/login"
            className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-[1.02]"
          >
            Go to Login
          </Link>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            {/* New password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                New Password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  {...register("password")}
                  className={`h-12 rounded-2xl border bg-violet-50/40 px-4 pr-12 shadow-sm transition-all duration-300 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-100 ${
                    errors.password
                      ? "border-red-400 focus-visible:ring-red-100"
                      : "border-violet-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className={`h-12 rounded-2xl border bg-violet-50/40 px-4 pr-12 shadow-sm transition-all duration-300 focus-visible:border-violet-400 focus-visible:ring-4 focus-visible:ring-violet-100 ${
                    errors.confirmPassword
                      ? "border-red-400 focus-visible:ring-red-100"
                      : "border-violet-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(139,92,246,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}

        {/* Footer */}
        {!isResetSuccessful && (
          <div className="mt-6 text-center text-sm text-slate-500">
            Remember your password?
            <Link
              to="/login"
              className="ml-2 font-semibold text-violet-600 transition-colors duration-300 hover:text-fuchsia-500"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;