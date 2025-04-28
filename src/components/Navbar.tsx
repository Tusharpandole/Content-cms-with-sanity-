import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-black text-white sticky top-0 z-10 flex items-center justify-between px-6 py-2">
      {/* Fleek Image */}
      <div className="flex items-center gap-2">
        <Image
          src="/fleeklogo.png" // Relative path to /public/fleeklogo.png
          alt="Fleek"
          width={48} // Adjust width to match the design
          height={24} // Adjust height to match the design
          className="object-contain"
        />
        <span className="text-sm font-medium">fleek</span>
      </div>

      {/* Currency Indicator */}
      <div className="flex items-center gap-1">
        <span className="text-yellow-400 text-sm font-semibold">$</span>
        <span className="text-white text-sm">0</span>
      </div>

      {/* Manage Subscriptions Image and Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* <Image
            src="" // Update to the correct image (e.g., /manage-subscriptions.png)
            alt="Manage Subscriptions"
            width={180} // Adjust width to match the design
            height={24} // Adjust height to match the design
            className="object-contain"
          /> */}
        </div>
        <Link href="/profile">
          <Image
            src="/fleeklogo.png" // Update to the correct profile image (e.g., /profile-placeholder.jpg)
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}