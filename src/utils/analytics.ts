import { getDate } from '@/utils';
import {redis} from '../lib/redis';

type AnalyticsArgs = {
    retention?: number
}

type TrackOptions = {
    persist?: boolean
}

export class Analytics {
    private retention:number = 7 * 24 * 60 * 60;

    constructor(options?: AnalyticsArgs) {
        if(options?.retention) this.retention = options.retention;
    }

    async track(namespace:string, event: object = {}, options?: TrackOptions) {
        let key  = `analytics::${namespace}`;

        if(!options?.persist){
            key+= `::${getDate()}`;
        }

        await redis.hincrby(key, JSON.stringify(event), 1);
        if(!options?.persist){
            await redis.expire(key, this.retention);
        }
    }

    async retrieve(namespace:string, date: string) {
        const data = await redis.hgetall<Record<string, string>>(`analytics::${namespace}::${date}`);

        console.log(data);
        return {
            date,
            events: Object.entries(data ?? []).map(([key, value]) => ({
                [key]: value
            }))
        }
    }
}

export const analytics = new Analytics();