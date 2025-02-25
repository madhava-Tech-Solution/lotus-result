import React from 'react';
import { FaAward, FaBook, FaQrcode, FaUser, FaUsers } from 'react-icons/fa';
import {
  FiArrowDown,
  FiCheckCircle,
  FiEdit3,
  FiList,
  FiSettings,
} from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import {
  BsCamera,
  BsCheckLg,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsDownload,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import {
  BiSearch,
  BiHomeAlt2,
  BiAddToQueue,
  BiStats,
  BiMoneyWithdraw,
} from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {
  MdClose,
  MdDashboard,
  MdDelete,
  MdEdit,
  MdLeaderboard,
} from 'react-icons/md';
import {
  IoIosArrowRoundBack,
  IoMdAddCircleOutline,
  IoMdNotificationsOutline,
} from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import { GoMail } from 'react-icons/go';
import { GiMoneyStack } from 'react-icons/gi';
import { MdGridView } from 'react-icons/md';
import { RiUpload2Line } from 'react-icons/ri';

export const reactIcons = {
  user: <FaUser />,
  arrowleft: <BsChevronLeft />,
  arrowright: <BsChevronRight />,
  arrowdown: <BsChevronDown />,
  dashboard: <MdDashboard />,
  edit: <MdEdit />,
  delete: <MdDelete />,
  search: <BiSearch />,
  notification: <IoMdNotificationsOutline />,
  home: <BiHomeAlt2 />,
  download: <BsDownload />,
  close: <MdClose />,
  add: <IoMdAddCircleOutline />,
  menu: <HiMenu />,
  threeDots: <BsThreeDotsVertical />,
  eyeslash: <AiFillEyeInvisible />,
  eyes: <AiFillEye />,
  goback: <IoIosArrowRoundBack />,
  successCheck: <FiCheckCircle />,
  check: <BsCheckLg />,
  mail: <GoMail />,
  setting: <FiSettings />,
  logout: <TbLogout />,
  award: <FaAward />,
  leader: <MdLeaderboard />,
  addtoqueue: <BiAddToQueue />,
  view: <FiList />,
  sortArrow: <FiArrowDown />,
  camera: <BsCamera />,
  editPencil: <FiEdit3 />,
  stats: <BiStats />,
  diary: <FaBook />,
  withdraw: <BiMoneyWithdraw />,
  users: <FaUsers />,
  back: <IoIosArrowRoundBack />,
  gridView: <MdGridView />,
  moneyView: <GiMoneyStack />,
  qrCode: <FaQrcode />,
  upload: <RiUpload2Line />,
};
