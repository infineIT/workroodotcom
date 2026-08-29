import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white font-body">
      <div className="max-w-md w-full text-center">
        <p className="font-display font-semibold text-brand-blue text-7xl leading-none">
          404
        </p>
        <div className="h-1 w-16 bg-brand-lime mx-auto mt-4" />
        <h1 className="mt-8 font-display text-2xl text-brand-ink">
          Page not found
        </h1>
        <p className="mt-3 text-brand-ink/70 leading-relaxed">
          {pageName ? (
            <>
              The page <span className="font-medium text-brand-ink">"{pageName}"</span>{" "}
              doesn't exist.
            </>
          ) : (
            <>That page doesn't exist.</>
          )}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-pill bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
