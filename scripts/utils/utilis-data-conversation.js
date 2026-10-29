import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { moneyConvert } from "./utilis-money.js";


export function data_conversation(id, day, price) {
    const for_less = dayjs().add(day, 'day').format("dddd, MMMM D");
    const function_price = id === 1 ? "FREE Shipping" : `${moneyConvert(price)} - Shipping`;

    return { for_less, function_price };
}
