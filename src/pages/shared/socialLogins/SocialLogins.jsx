import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa6";

const SocialLogins = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl text-center font-semibold mb-6">Login with</h2>
      <div className="flex justify-center items-center gap-4 text-2xl">
        <button className="text-white bg-red-light rounded-full p-2"><FaGoogle /></button>
        <button className="text-white bg-red-light rounded-full p-2" disabled><FaFacebook /></button>
        <button className="text-white bg-red-light rounded-full p-2" disabled><FaGithub /></button>
      </div>
    </div>
  );
};

export default SocialLogins;