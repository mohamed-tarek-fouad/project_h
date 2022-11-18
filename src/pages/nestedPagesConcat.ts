/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
@Injectable()
export class Concat {
  async ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6) {
    if (ex6) {
      url =
        url +
        "/" +
        ex1 +
        "/" +
        ex2 +
        "/" +
        ex3 +
        "/" +
        ex4 +
        "/" +
        ex5 +
        "/" +
        ex6;
    } else if (ex5) {
      url = url + "/" + ex1 + "/" + ex2 + "/" + ex3 + "/" + ex4 + "/" + ex5;
    } else if (ex4) {
      url = url + "/" + ex1 + "/" + ex2 + "/" + ex3 + "/" + ex4;
    } else if (ex3) {
      url = url + "/" + ex1 + "/" + ex2 + "/" + ex3;
    } else if (ex2) {
      url = url + "/" + ex1 + "/" + ex2;
    } else if (ex1) {
      url = url + "/" + ex1;
    }
    return url;
  }
}
