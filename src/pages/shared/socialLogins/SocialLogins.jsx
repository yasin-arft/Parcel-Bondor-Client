import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SocialLogins = () => {
  const { googleSignIn, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        // store data to database
        const user = {
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          email: res.user.email,
          role: 'user',
          image: res.user.photoURL
        }
        axiosPublic.post('/users', user)
          .then((res) => {
            if (res.data.insertedId) {
              toast.success('Registered successfully!');
            } else {
              toast.success('Logged in successfully!');
            }
            navigate('/');
            setLoading(false);
          })
      })
      .catch(() => {
        setLoading(false);
        toast.error('An unexpected error happened!');
      })
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl text-center font-semibold mb-6">Login with</h2>
      <div className="flex justify-center items-center gap-4 text-2xl">
        <button onClick={handleGoogleSignIn} className="text-white bg-red-light rounded-full p-2"><FaGoogle /></button>
        <button className="text-white bg-red-light rounded-full p-2" disabled><FaFacebook /></button>
        <button className="text-white bg-red-light rounded-full p-2" disabled><FaGithub /></button>
      </div>
    </div>
  );
};

export default SocialLogins;