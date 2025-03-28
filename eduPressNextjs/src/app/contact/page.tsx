export default function Contact() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto px-4 py-4 max-w-[1290px]">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-8">
          <div>
            <h1 className="mb-4 font-bold text-3xl">Need a direct line?</h1>
            <p className="mb-8 text-gray-600">
              Cras massa et odio donec faucibus in. Vitae pretium massa dolor ullamcorper lectus elit quam. Nec eu pellentesque blandit urna. A lacus sagittis nec fermentum id sed in. Lacus feugiat eget nulla phasellus commodo.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-blue-600">📞</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">Phone</h3>
                  <p className="text-gray-700">(123) 456 7890</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-blue-600">✉️</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">Email</h3>
                  <p className="text-gray-700">Demo@domain.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=NEW%20YORK&t=m&z=15&output=embed&iwloc=near"
              title="Google Map"
              className="border-0 w-full h-96"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
        <div className="">
          <h2 className="mb-6 font-bold text-2xl">Contact Us</h2>
          <form className="space-y-6">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <input
                type="text"
                placeholder="Name *"
                className="border-gray-300 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email *"
                className="border-gray-300 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your comment here"
                className="border-gray-300 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}/>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"/>
              <label className="ml-2 text-gray-600 text-sm">
                Save my name, email in this browser for the next time I comment
              </label>
            </div>
            <div className="">
              <button
                className="bg-orange-500 hover:bg-orange-300 px-6 py-3 rounded-lg text-white transition-colors duration-300">
                Send Email
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}