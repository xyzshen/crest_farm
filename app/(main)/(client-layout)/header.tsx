'use cilent'
import Link from "next/link"
import Logo from "/public/static/icons/logo.svg";
import Shape from "/public/static/icons/shape.svg";
import { Menu, message } from "antd";
import { Items } from './item'
import React, { useEffect } from "react";
import LoginState from "@/utils/loginState";
import { useRouter } from 'next/navigation'
import { findNodeByKey } from "@/utils";

const Header = () => {
  const router = useRouter()
  const [user, setUser] = React.useState<string | null>(null)
  const [current, setCurrent] = React.useState('strategy');
  const [isShowQuit, setIsShowQuit] = React.useState(false);

  const onClick = (e: any) => {
    const obj = findNodeByKey(Items, e.key)
    const isLogin = obj?.isLogin
    if (isLogin && !user) {
      message.warning('Please login first')
      router.push('/login')
      return
    }
    setCurrent(e.key);
    router.push(e.key)
  }

  const onQuit = () => {
    LoginState.clearLoginState()
    setIsShowQuit(false)
    router.push('/login')
  }

  const goDetail = () => {
    router.push('/manage/overview')
  }

  useEffect(() => {
    setUser(LoginState?.getUserInfo()?.account || '')
  }, [])

  return (
    <header className="px-[50px] bg-white shadow-home_header_shadow h-16 static top-0 z-50">
      <div className="content-area mx-auto flex h-16 flex-row justify-between w-content">
        <div className={"flex h-16 items-center"}>
          <Link href="/#">
            <Logo />
          </Link>
        </div>
        <div className="flex ">
          <Menu className="w-[40rem] leading-[4rem] text-[18px]" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={Items} />
        </div>
        <div className="flex h-16 justify-center items-center">
          <div className="cursor-pointer ml-[88px] relative ">
            {!user && <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px]">
              <Link href={"/login"}>Sign In</Link>
            </span>}
            {user && <span className="px-[24px] py-[8px] bg-black hover:bg-[#3d3d3d] text-[#fff] cursor-pointer rounded-[14px] flex items-center justify-center"
              onClick={() => setIsShowQuit(!isShowQuit)}>
              <span>{user}</span>
              <span className="ml-[5px] cursor-default"  ><Shape /></span>

            </span>}
            {isShowQuit && <div className="absolute top-11 right-0 w-[120px] py-4 text-center bg-[#3c3c3c] rounded-md text-[#fff] cursor-pointer">
              {/* {user && <div className="leading-10" onClick={goDetail}>Management</div>} */}
              <div className="leading-10" onClick={onQuit}>Quit</div>
            </div>}
          </div>

        </div>
      </div>
    </header >
  )
}

export default Header