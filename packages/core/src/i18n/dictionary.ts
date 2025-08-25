/*
 *   Copyright (c) 2025 @wxiwxi
 *   All rights reserved.
 *   个人练习项目，作者@wxiwxi，供学习参考。
 */
// function scramble(dict: any) {
//   const newDict: any = {} as any;

import type { en } from './locales'

//   for (const key in dict) {
//     if (typeof dict[key] === "object") {
//       newDict[key] = scramble(dict[key]);
//     } else {
//       newDict[key] = dict[key].split("").reverse().join("");
//     }
//   }

//   return newDict;
// }

export type Dictionary = typeof en
