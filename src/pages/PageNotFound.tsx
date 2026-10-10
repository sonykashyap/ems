
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative flex min-h-screen items-center justify-center
        overflow-hidden
        bg-gradient-to-br
        from-[#f7f5ff] via-white to-[#fff2fc]
        px-4 py-12
      "
    >
      {/* Background Blur */}
      <div
        className="
          pointer-events-none absolute -right-20 -top-20
          h-[350px] w-[350px] rounded-full
          bg-violet-300/20 blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-20 -left-20
          h-[300px] w-[300px] rounded-full
          bg-fuchsia-300/20 blur-3xl
        "
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xl text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <h1
            className="
              select-none text-[120px] font-black
              leading-none tracking-tight
              bg-gradient-to-r
              from-violet-200 via-purple-200 to-fuchsia-200
              bg-clip-text text-transparent
              sm:text-[180px]
            "
          >
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="
                flex h-20 w-20 items-center justify-center
                rounded-[28px]
                bg-gradient-to-r from-violet-600 to-fuchsia-500
                text-white
                shadow-[0_12px_35px_rgba(139,92,246,0.3)]
                sm:h-24 sm:w-24
              "
            >
              <SearchX size={44} strokeWidth={1.7} />
            </div>
          </div>
        </div>

        {/* Glass Card */}
        <div
          className="
            relative overflow-hidden
            rounded-[32px]
            border border-violet-100
            bg-white/85
            p-7 sm:p-10
            shadow-[0_20px_60px_rgba(139,92,246,0.12)]
            backdrop-blur-2xl
          "
        >
          {/* Top Gradient */}
          <div
            className="
              absolute left-0 right-0 top-0 h-2
              bg-gradient-to-r
              from-violet-600 via-purple-500 to-fuchsia-500
            "
          />

          {/* Heading */}
          <h2
            className="
              mt-2 text-2xl font-black tracking-tight
              bg-gradient-to-r from-violet-700 to-fuchsia-500
              bg-clip-text text-transparent
              sm:text-3xl
            "
          >
            Oops! Page Not Found
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-md
              text-sm leading-relaxed text-slate-500
              sm:text-base
            "
          >
            The page you're looking for doesn't exist, may have
            been moved, or the URL might be incorrect.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="
                inline-flex h-12 items-center justify-center gap-2
                rounded-2xl px-6
                bg-gradient-to-r
                from-violet-600 via-purple-500 to-fuchsia-500
                text-sm font-semibold text-white
                shadow-[0_12px_30px_rgba(139,92,246,0.25)]
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-[0_18px_40px_rgba(139,92,246,0.35)]
                focus-visible:outline-none
                focus-visible:ring-4 focus-visible:ring-violet-200
              "
            >
              <Home size={18} />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                inline-flex h-12 items-center justify-center gap-2
                rounded-2xl border border-violet-100
                bg-violet-50/50 px-6
                text-sm font-semibold text-violet-700
                shadow-sm
                transition-all duration-300
                hover:border-violet-200 hover:bg-violet-100/70
                focus-visible:outline-none
                focus-visible:ring-4 focus-visible:ring-violet-100
              "
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-violet-100 pt-5">
            <p className="text-xs font-medium text-slate-400">
              Error Code: 404
              <span className="mx-2 text-violet-300">•</span>
              Page Not Found
            </p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          className="
            mx-auto mt-6 h-1 w-20 rounded-full
            bg-gradient-to-r from-violet-500 to-fuchsia-500
            opacity-70
          "
        />
      </div>
    </div>
  );
};

export default NotFound;
