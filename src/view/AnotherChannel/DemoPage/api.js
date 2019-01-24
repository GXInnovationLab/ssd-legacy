
import Request from '@/util/request';

export default {
  getXXXList(param) {
    const uri = '/xx/city/v1';
    return Request.get(uri, param);
  },
  getSummryData() {
    const uri = '/yy/v1';
    return Request.get(uri);
  },
};
