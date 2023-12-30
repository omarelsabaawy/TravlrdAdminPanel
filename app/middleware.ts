import { NextResponse } from "next/dist/server/web/spec-extension/response";
import Cookies from 'js-cookie';

export default function middleware(req: any) {
    let verify = Cookies.get("userData");
    let url = req.url;

    if (verify && url.includes('/signin')) {
        return NextResponse.redirect("/");
    }

    if (!verify) {
        return NextResponse.redirect("/signin");
    }

};