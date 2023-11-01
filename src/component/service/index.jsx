import Http from "../server";

class Service {
  getData(data) {
    return Http.get("result/get");
  }
}
export default new Service();