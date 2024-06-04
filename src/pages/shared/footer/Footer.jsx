import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="max-w-screen-2xl mx-auto bg-red-light p-10">
      <div className='md:flex p-3 gap-2 text-white'>
        <figure className='h-12 flex-1'>
          <img src={logo} alt="logo" className='h-full bg-white rounded' />
        </figure>
        <div className='flex-1'>
          <h2 className='my-2 font-medium'>Important Links </h2>
          <ul className='space-y-2'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='/about_us'>About Us</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
          </ul>
        </div>
        <div className='flex-1'>
          <h2 className='my-2 font-medium'>Social Links </h2>
          <ul className='space-y-2 text-2xl'>
            <li><a><FaFacebookSquare /></a></li>
            <li><a><FaTwitterSquare /></a></li>
            <li><a><FaInstagramSquare /></a></li>
          </ul>
        </div>
      </div>
      <div className="border-t relative my-3">
      </div>
      <div className="text-white text-center py-3">
        <p>Copyright &copy; 2024 - All right reserved by Parcel Bondor</p>
      </div>
    </footer>
  );
};

export default Footer;