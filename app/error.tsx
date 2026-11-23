"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page" role="alert">
      <span className="eyebrow">SOMETHING INTERRUPTED THE PROCESS</span>
      <h1>Let’s try that again.</h1>
      <p>
        We could not load this page. Please retry or return to the home page.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
