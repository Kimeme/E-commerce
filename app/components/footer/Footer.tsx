import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16  pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href="#">Contact</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 lg:w-1/6 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About</h3>
            <p className="mb-2">
              We are a leading e-commerce platform dedicated to providing the
              best online shopping experience.With a wide selection of
              phones,TVs,laptops,watches and accessories. Our mission is to
              offer a wide range of high-quality products at competitive
              prices,ensuring customer satisfaction through exceptional service
              and support.
            </p>
            <p>&copy;{new Date().getFullYear()} E-Shop. All rights reserved </p>
                  </div>
                  <FooterList>
                      <h3 className="text-base font-bold mb-2">Follow Us</h3>
                <div className="flex gap-2">
                          <Link href="#"><MdFacebook size={24}/></Link>
                          <Link href="#"><AiFillTwitterCircle size={24}/></Link>
                          <Link href="#"><AiFillInstagram size={24}/></Link>
                          <Link href="#"><AiFillYoutube size={24}/></Link>
                 </div>
            </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
