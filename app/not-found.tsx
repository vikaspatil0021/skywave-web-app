export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="flex flex-col items-center justify-center h-screen bg-[#030712] text-[#f2f2f2] px-5">
        <div className="max-w-md w-full text-center">
          <h1 className="mb-7 mt-3 text-4xl font-semibold">404 : NOT FOUND</h1>
          <div className="box bg-[#333] border border-opacity-10 border-white rounded-lg p-5 text-center space-y-5">
            <p className="text-sm text-[#ddd]">
              Page Not Found!
            </p>
            <a
              id="btn"
              href="https://www.skywaveapp.site/dashboard"
              className="flex items-center justify-center py-2 px-4 bg-[#6d28d9] text-[#f2f2f2] rounded-md text-sm font-medium opacity-95 hover:opacity-100"
            >
              Go back to Dashboard
            </a>
          </div>
          <div className="footer-text mt-6 text-sm opacity-80 text-center">
            Built by{" "}
            <a
              href="https://github.com/vikaspatil0021"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center underline text-white font-medium"
            >
              vikaspatil0021
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
