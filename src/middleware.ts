import { NextRequest, NextResponse } from "next/server";
import {analytics} from './utils/analytics'; 

export default async function middleware( request:NextRequest, response: NextResponse) {
    if(request.nextUrl.pathname === "/") {
        console.log('TRACKING: /');

        try {
            analytics.track('pageView', {
                page: '/',
                country: request.geo?.country,
            })
            
        } catch (error) {
            console.error('Error in middleware', error);
        }

        return NextResponse.next();
    }
}

export const matcher = {
    matcher: ['/']
}