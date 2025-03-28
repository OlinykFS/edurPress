import Image from 'next/image';
import notfound from "/public/img/404.png";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl mt-28">
      <p className="mb-8">404 - Not Found</p>
      <Image
        src={notfound}
        className='mt-10 mb-24 mr-24'
        alt="404 Image"
        width={600}
        height={500}
      />

    </div>
  );
}
