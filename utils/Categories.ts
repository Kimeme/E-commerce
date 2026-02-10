import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdStorefront, MdOutlineKeyboard, MdTv, MdWatch } from "react-icons/md";

export const categories = [
  {
    label: "All",
    icon: MdStorefront ,
  },
  {
    label: "Phone",
    icon: AiFillPhone, // ✅ FIXED
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
  },
  {
    label: "Desktop",
    icon: AiOutlineDesktop,
  },
  {
    label: "Watch",
    icon: MdWatch,
  },
  {
    label: "Tv",
    icon: MdTv,
  },
  {
    label: "Accessories",
    icon: MdOutlineKeyboard,
  },
];
