/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex justify-center flex-col items-center h-full m-2">
      <div className="card w-full md:w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between w-full">
            <div className="flex justify-start w-full">
              <h1 className="card-title w-full">Countries of the World</h1>
            </div>
          </div>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
