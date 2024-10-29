import Link from "next/link";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <Link href={"/"} className="navbar__logo">nextmap</Link>

      <div className="navbar__list">
        <Link href="/stores" className="navbar__list--item">
          맛집 목록
        </Link>
        <Link href="/stores/new" className="navbar__list--item">
          맛집 등록
        </Link>
        <Link href="/stores/likes" className="navbar__list--item">
          찜한 가게
        </Link>
        <Link href="/stores/login" className="navbar__list--item">
          로그인
        </Link>
      </div>

      {/* mobile button */}
      <div
        className="navbar__button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <AiOutlineClose /> : <BiMenu />}
      </div>

      {/* mobile button */}

      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href="/stores/new" className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href="/stores/likes" className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            <Link href="/stores/login" className="navbar__list--item--mobile">
              로그인
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
