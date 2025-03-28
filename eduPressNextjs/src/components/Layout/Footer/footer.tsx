import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#F5F5F5] mx-auto mt-20 w-full">
      <div className="mx-auto px-4 py-12 max-w-7xl text-gray-800">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 mb-36 container">
          <div>
            <a href="#" className="flex items-center">
              <Image 
                src={`/img/Logo.svg`}
                alt="footerLogo"
                width={40}
                height={30}
                className="mr-2"
              />
              <span className="font-bold text-2xl text-black">EduPress</span>
            </a>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">GET HELP</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Latest Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">PROGRAMS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Art & Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  IT & Software
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Languages
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm sm:text-base hover:text-orange-500">
                  Programming
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">CONTACT US</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA
            </p>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Tel: + (123) 2500-567-8988
            </p>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Mail: supportlms@gmail.com
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-orange-500">
                <Image
                  src={`/img/icons/socials/FacebookIcon.svg`}
                  alt="facebook"
                  width={16}
                  height={16}
                  className="hover:fill-orange-500"
                />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500">
                <Image
                  src={`/img/icons/socials/XIcon.svg`}
                  alt="X"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500">
                <Image
                  src={`/img/icons/socials/InstagramIcon.svg`}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500">
                <Image
                  src={`/img/icons/socials/YouTubeIcon.svg`}
                  alt="YouTube"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}