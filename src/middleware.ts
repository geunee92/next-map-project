export { default } from "next-auth/middleware";
// matcher로 설정한 URL은 로그인 하지 않으면 제한해준다.
export const config = {
  matcher: ["/users/mypage", "/stores/new", "/stores/:id/edit", "/users/likes"],
};