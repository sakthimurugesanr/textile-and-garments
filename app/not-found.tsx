import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="error-page">
      <span className="eyebrow">404 / A THREAD OUT OF PLACE</span>
      <h1>
        Let’s find your
        <br />
        way back.
      </h1>
      <p>
        This page may have moved, or the address may be incomplete. There are
        still plenty of possibilities to explore.
      </p>
      <div className="error-actions">
        <Link className="button" href="/">
          Back to home <ArrowUpRight size={17} />
        </Link>
        <Link className="button outline" href="/products">
          Explore products
        </Link>
      </div>
    </div>
  );
}
