import Http from "../server";

class Service {
  getData(data) {
    return Http.get("result/get/"+data.page+"/"+data.limit);
  }
}
export default new Service();