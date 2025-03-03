import { memo } from "react";

function Footer() {
  console.log("footer running...");
  return (
    <div className="flex flex-col justify-between p-4 text-center bg-gray-500 md:flex-row md:text-left">
      <p className="mb-2 text-xs text-white md:pl-36 md:mb-0">
        Copyright © 2024 | Rohit Gupta
      </p>
      <h1>Welcome to My Awesome Store</h1>
      <p className="text-xs text-white md:pr-36">
        Powered by Rohit Gupta
      </p>
    </div>
  );
}

export default memo(Footer);
