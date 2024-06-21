import { BASIC_TABLE, FREE_TABLE, PRO_TABLE } from "@/constants/pricing";
import React from "react";

const PricingTables = () => {
  return (
    <section className="bg-transparent">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          {/* <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2> */}
          {/* <p className="mb-1 font-semibold text-gray-200 sm:text-3xl">
            Our pricing plans
          </p> */}
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/** Free  */}
          <div className=" relative flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg shadow-md shadow-slate-800   xl:p-8 border border-slate-800 text-white">
            <h3 className="mb-4 text-3xl font-bold">Free Forever</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Essential tools to get you started with AbdelAI
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$0</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul role="list" className="mb-10 space-y-4 text-left ">
              {FREE_TABLE.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <GreenTick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="absolute bottom-5 w-full mx-auto max-w-[85%] text-white bg-violet-800 hover:bg-violet-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-violet-900"
            >
              Get started
            </a>
          </div>
          {/** Basic Plan */}
          <div className="relative flex flex-col p-6 mx-auto max-w-lg text-center  rounded-lg shadow-md  shadow-slate-800 border border-slate-800  text-white">
            <h3 className="mb-4 text-2xl font-semibold">Basic Plan</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Everything you need to grow your brand
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$20</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left">
              {BASIC_TABLE.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <GreenTick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="text-white absolute bottom-5 w-full mx-auto max-w-[85%] bg-violet-800 hover:bg-violet-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-violet-900"
            >
              Upgrade
            </a>
          </div>

          {/** Pro Plan */}
          <div className="relative flex flex-col p-6 mx-auto max-w-lg text-center  rounded-lg shadow-md shadow-slate-800 border border-slate-800  text-white xl:p-8 ">
            <h3 className="mb-4 text-2xl font-semibold">Pro Plan</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Best for large scale uses and extended redistribution rights.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$50</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left">
              {PRO_TABLE.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <GreenTick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="text-white absolute bottom-5 w-full mx-auto max-w-[85%] bg-violet-800 hover:bg-violet-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-violet-900"
            >
              Upgrade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTables;

const GreenTick = () => (
  <svg
    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clip-rule="evenodd"
    ></path>
  </svg>
);
