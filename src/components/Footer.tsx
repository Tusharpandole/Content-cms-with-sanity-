import Link from "next/link";
import React from "react";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-16"> {/* Increased margin-top from mt-12 to mt-16 */}
      <section className="px-6 xs:px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-10 flex flex-col lg:flex-row justify-between gap-8"> {/* Increased padding-y from py-8 to py-10 */}
        {/* Download Now Section */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Download Now</h3>
          <p className="text-sm mb-6">
            Never pay full price for subscriptions again. And save more by
            tracking & managing subscriptions in the same place. Think
            subscriptions, think Fleek!
          </p>
          <button className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-teal-600 transition">
            Download Now
          </button>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 flex-1">
          {/* Fleek Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Fleek</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-400 transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-teal-400 transition">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-teal-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-teal-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow us on Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow us on</h4>
            <SocialMedia />
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <section className="px-6 xs:px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-6 border-t border-gray-800"> {/* Increased padding-y from py-4 to py-6 */}
        <p className="text-xs text-center">
          © 2021-2023 FLEEK TECHNOLOGIES PRIVATE LIMITED. ALL RIGHTS RESERVED.
        </p>
      </section>
    </footer>
  );
}